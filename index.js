let balance = 500.00;

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
    return 1 || (this.account.balance + this.amount > 0);
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
    return this.transactions.reduce((prev, curr) => ({ amount:prev.amount + curr.amount }), { amount: 0 });
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
  console.log(`This transaction ${transactionCounter} was ${executed}.\n`);
};

const t1 = new Withdrawal(myAccount, 50.25);
commitAndLog(t1);

const t2 = new Withdrawal(myAccount, 9.99);
commitAndLog(t2);

const t3 = new Deposit(myAccount, 120);
commitAndLog(t3);

const t4 = new Withdrawal(myAccount, 500);
commitAndLog(t4);

console.log('Balance:', myAccount.balance);
