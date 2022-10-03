# KingOfFools
A simple dapp built for the purposes of a technical test.

I will host this on Spheron, url to follow soon.

## Usage note
Wallet integration is very basic on the front end of this dapp:
- it only works for metamask
- it requires you to have the metamask browser extension already installed
- it will ask you to switch to the polygon network if you’re not already on it

## Design decisions detail
- I have allowed the sequence in the receive function to continue even if the transfer to the outgoing king fails (e.g. if it is a non eth receiving contract). This is a deliberate decision, so that the contract can’t be ‘jammed’ by someone sending in eth from a non-receiving contract
- I considered making the contract pausable, but decided not to on two grounds:
  - There's not really much we could change during the pause
  - Having pausability really compromises whoever is the current King, as they can't get paid as long as the contract is paused
- I built a submit and verify option to prevent front running of a payment to the contract, but then I decided it adds unneccessary complexity where users could just make sure they are paying exactly 1.5 x maximumPaid if they want to avoid being front run (moreover, front running doesn't actually disadvantage them, as they still get in at the same price)
- I hesitated over including emergencyWithdraw, but eventually included it, because I wasn’t comfortable having a contract with no way of withdrawing funds on it. In the case where a non-receiving contract makes a deposit, this becomes relevant, as their 'reward' will remain on the contract.
  - emergencyWithdraw could potentially be modified to pay out to the current king rather than the owner
- I have included a gas setting for the eth transfer to the outgoing king:
  - Currently, it doesn't seem to have any impact changing this variable - further research required here 
- I decided to keep this all in one contract, simpler that way (external contract calls are generally where issues come in)
- I don’t comment code excessively, I think the function names and the code itself is fairly easy to follow
- For the USDC payment I don’t really see any way that the eth transfer could not go ahead – this is a change on the usdc contract, so as long as we send it a legitimate eth address (EOA or contract), and it’s approved, it will make the transfer


