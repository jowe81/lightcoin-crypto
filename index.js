class Transaction {

  constructor(account, amount) {
    this.account = account;
    this.amount = amount;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }
    return false; //Declined!
  }

  isAllowed() {
    console.log("Checking: ",this.account.balance, this.amount);
    return (this.account.balance + this.amount > 0);
  }

}

class Withdrawal extends Transaction {

  constructor(account, amount) {
    super(account, -amount);
  }

}

class Deposit extends Transaction {

  constructor(account, amount) {
    super(account, amount);
  }

}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions
      .reduce((prev, curr) => ({ amount:prev.amount + curr.amount }), { amount: 0 }).amount;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

let transactionCounter = 0;
const commitAndLog = (transaction) => {
  transactionCounter++;
  const executed = transaction.commit() ? "approved" : "DECLINED";
  console.log(`Transaction: ${transactionCounter}`, transaction);
  console.log(`This transaction was ${executed}.\n`);
};

commitAndLog(new Deposit(myAccount, 100)); //Ok
commitAndLog(new Withdrawal(myAccount, 50.25)); //Ok
commitAndLog(new Withdrawal(myAccount, 9.99)); //Ok
commitAndLog(new Deposit(myAccount, 120)); //Ok
commitAndLog(new Withdrawal(myAccount, 500)); //Decline!
commitAndLog(new Withdrawal(myAccount, 159)); //Ok

console.log('Balance:', myAccount.balance.toFixed(2));
