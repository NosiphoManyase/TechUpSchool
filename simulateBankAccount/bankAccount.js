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
    
    name = prompt('Please enter your name: ');
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
    mapAccountState = bankAccounts.map(account => account.accountState);
    console.log(mapID);
    chooseOption();
    
}

// function closes account and sets balance to zero
function closeAccount(id){
    id = prompt('Enter unique id: ');
    // check if id exists, if not, process starts over
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        // recall function
        closeAccount();
    }
    
    bankAccounts.forEach(account => {
        if (account.accountID == id) {
            account.accountState = 'Closed';
            account.balance = 0;
            console.log('Account successfuly closed');
        }
    });
    // back to main menu
    chooseOption();

}

function depositFunds(id){
    id = prompt('Enter unique id : ');
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        depositFunds();

    } else {
        const deposit = Number(prompt('Enter deposit amount: '));
        const objIndex = bankAccounts.findIndex(obj => obj.accountID == id);
        if (bankAccounts[objIndex].accountState == 'Closed') {
            //prevent transaction if account is closed
            console.log('Account has been closed, transaction can\'t be processed');
            chooseOption();
        } else if(deposit <= bankAccounts[objIndex].maxDepositLimit && deposit >= bankAccounts[objIndex].minDepositiLimit){
            console.log(`Old Balance: ${bankAccounts[objIndex].balance}`);
            bankAccounts[objIndex].balance = bankAccounts[objIndex].balance + deposit;
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update maxWithdrawalLimit to equal to balance
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance;

        } else if (deposit > bankAccounts[objIndex].maxDepositLimit){
            console.log('Deposit amount exceeds deposit limit! Try again');
            depositFunds();

        }
    }
    chooseOption();

}
function withdrawFunds(id){
    id = prompt('Enter unique id: ');
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        withdrawFunds();
    } else {    
        const withdrawal = Number(prompt('Enter withdrawal amount: '));
        const objIndex = bankAccounts.findIndex(obj => obj.accountID == id);
        if (bankAccounts[objIndex].accountState == 'Closed') {
            //prevent transaction if account is closed
            console.log('Account has been closed, transaction can\'t be processed');
            chooseOption();
        } else if(withdrawal <= bankAccounts[objIndex].maxWithdrawalLimit && withdrawal >= bankAccounts[objIndex].minWithdrawalLimit){
            console.log(`Old Balance: ${bankAccounts[objIndex].balance}`);
            bankAccounts[objIndex].balance = bankAccounts[objIndex].balance - withdrawal;
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update withdrawal limit to current balance of account
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance

        } else if (withdrawal > bankAccounts[objIndex].maxWithdrawalLimit){
            console.log('Insufficient Funds! Try again');
            withdrawFunds();

        }
    }
    chooseOption();
}

