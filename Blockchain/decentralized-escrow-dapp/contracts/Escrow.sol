// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Escrow {
    address public depositor;
    address public receiver;
    address public escrowAgent;

    enum State {
        AWAITING_PAYMENT,
        AWAITING_APPROVAL,
        COMPLETE,
        CANCELLED
    }
    State public currentState;

    event Deposited(address indexed from, uint amount);
    event Approved(address indexed receiver);
    event FundsReleased(address indexed to, uint amount);
    event Cancelled(address indexed by, uint refunded);

    modifier onlyDepositor() {
        require(msg.sender == depositor, "Not depositor");
        _;
    }

    modifier onlyReceiver() {
        require(msg.sender == receiver, "Not receiver");
        _;
    }

    modifier onlyEscrowAgent() {
        require(msg.sender == escrowAgent, "Not escrow agent");
        _;
    }

    constructor(address _receiver) {
        depositor = msg.sender;
        receiver = _receiver;
        escrowAgent = msg.sender;
        currentState = State.AWAITING_PAYMENT;
    }

    function deposit() external payable onlyDepositor {
        require(currentState == State.AWAITING_PAYMENT, "Already funded");
        require(msg.value > 0, "No ETH sent");
        currentState = State.AWAITING_APPROVAL;
        emit Deposited(msg.sender, msg.value);
    }

    function approve() external onlyReceiver {
        require(
            currentState == State.AWAITING_APPROVAL,
            "Not awaiting approval"
        );
        currentState = State.COMPLETE;
        emit Approved(msg.sender);
    }

    function releaseFunds() external onlyEscrowAgent {
        require(currentState == State.COMPLETE, "Approval not complete");
        uint balance = address(this).balance;
        payable(receiver).transfer(balance);
        emit FundsReleased(receiver, balance);
    }

    function cancel() external onlyEscrowAgent {
        require(currentState != State.COMPLETE, "Already complete");
        currentState = State.CANCELLED;
        uint balance = address(this).balance;
        payable(depositor).transfer(balance);
        emit Cancelled(msg.sender, balance);
    }
}
