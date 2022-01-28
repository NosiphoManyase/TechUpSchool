const create = require('prompt-sync');

let bankAccount = {};
let bankAccounts = [];
let mapID = [];

prompt = require('prompt-sync')();
// main menu directs user to relevant action
function chooseOption() {
    const options = prompt('What action would you like to take?(enter 1,2,3 or 4) 1. Create an account 2.Close an account 3.Deposit to account 4.Withdraw from account: ');
    if(options == '1'){
        createAccount();
    } else if (options == '2'){
        closeAccount();
    } else if (options == '3'){
        depositFunds();
    } else if (options == '4') {
        withdrawFunds();
    } else if (options == ''){
        console.log('You have not chosen an option! Try again \n');
        chooseOption();
    } else {
        console.log('Incorrect input! Try again.\n');
        chooseOption();
    }
} 
chooseOption();

function createAccount(name, balance, maxWithdrawalLimit, minWithdrawalLimit, maxDepositLimit, minDepositiLimit){
    
    name = prompt('\nPlease enter your name: ');
    balance = Number(prompt('Please enter your initial deposit amount: R'));
    // withdrawal limit set to balance
    maxWithdrawalLimit = balance;
    minWithdrawalLimit = 20;
    maxDepositLimit = 10000;
    minDepositiLimit = 50;
    // id takes first letter of name, the rest is computed randomly
    const id = name.charAt(0) + Math.random().toString(36).substring(2,8);
    
    // create object
    bankAccount = {name: name,
        balance: balance,
        accountID: id,
        accountState: 'Open',
        maxDepositLimit: maxDepositLimit,
        maxWithdrawalLimit: maxWithdrawalLimit,
        minDepositiLimit: minDepositiLimit,
        minWithdrawalLimit: minWithdrawalLimit

    }
    // push object to array
    bankAccounts.push(bankAccount);
    //map id's for other functions to locate account being used
    mapID = bankAccounts.map(account => account.accountID);
    console.log(mapID);
    console.log(bankAccounts);
    chooseOption();
    
}

// function closes account and sets balance to zero
function closeAccount(id){
    id = prompt('\nEnter unique id: ');
    // check if id exists, if not, process starts over
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        closeAccount();
    }
    
    bankAccounts.forEach(account => {
        if (account.accountID == id) {
            account.accountState = 'Closed';
            account.balance = 0;
            console.log('Account successfuly closed');
        }
    }); 
    console.log(bankAccounts);  

    chooseOption();

}

function depositFunds(id){
    id = prompt('\nEnter unique id : ');
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        depositFunds();
    }
    const deposit = Number(prompt('Enter deposit amount: '));

    bankAccounts.forEach(account => {
        if (account.accountState = 'Closed'){
            // prevent transaction if account is closed
            console.log('Account has been closed, transaction can\'t be processed');
            chooseOption();
        } else if(account.accountID == id && deposit <= account.maxDepositLimit){
            account.balance = account.balance + deposit;
        } else if (account.accountID == id && deposit > account.maxDepositLimit){
            console.log('Deposit amount exceeds deposit limit! Try again');
            depositFunds();
        }
    })
    console.log(bankAccounts);
    chooseOption();

}
function withdrawFunds(id){
    id = prompt('\nEnter unique id: ');
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        withdrawFunds();
    }
    const withdrawal = Number(prompt('Enter withdrawal amount: '));

    bankAccounts.forEach(account => {
        if (account.accountState = 'Closed'){
            console.log('Account has been closed, transaction can\'t be processed');
            chooseOption();
        } else if(account.accountID == id && withdrawal <= account.maxWithdrawalLimit){
            console.log(`Current balance: R${account.balance}`);
            account.balance = account.balance - withdrawal;
            account.maxWithdrawalLimit = account.balance;
            console.log(`New balance: R${account.balance}`);
        } else if(account.accountID == id && withdrawal > account.maxWithdrawalLimit){
            console.log('Insufficient funds! Try again');
            withdrawFunds();
        }
    })
    console.log(bankAccounts);
    chooseOption();
}

