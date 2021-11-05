let balance = 500.00;

class Transaction {

  constructor(account, amount) {
    this.account = account;
    this.amount = amount;
  }

  commit() {
    this.time = new Date();
    this.account.addTransaction(this);
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
    return this.transactions.reduce((prev, curr) => ({ amount:prev.amount + curr.amount }));
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

const t1 = new Withdrawal(myAccount, 50.25);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(myAccount, 9.99);
t2.commit();
console.log('Transaction 2:', t2);

const t3 = new Deposit(myAccount, 120);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
