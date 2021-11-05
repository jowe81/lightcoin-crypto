/*
  Differs from code provided in exercise, ommitting the value property
*/
class Transaction {

  constructor(account, amount) {
    this.account = account;
    this.amount = amount;
  }

  commit() {
    this.account.balance += this.amount;
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
