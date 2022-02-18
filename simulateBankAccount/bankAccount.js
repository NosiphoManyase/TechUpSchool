const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,}));

let bankAccount = {};
let bankAccounts = [];
let mapID = [];

const prompt = require('prompt-sync')();
// main menu directs user to relevant action
function chooseOption() {
    const options = prompt('What action would you like to take?(enter 1,2,3 or 4) 1. Create an account 2.Close an account 3.Deposit to account 4.Withdraw from account 5.Exit: ');
    if(options == '1'){
        createAccount();
    } else if (options == '2'){
        closeAccount();
    } else if (options == '3'){
        depositFunds();
    } else if (options == '4') {
        withdrawFunds();
    } else if (options == '5') {
        console.log('You have exited');
        return;
    } else if (options == ''){
        console.log('You have not chosen an option! Try again \n');
        chooseOption();
    } else {
        console.log('Incorrect input! Try again.\n');
        chooseOption();
    }
} 
chooseOption();

function createAccount(name, id, balance, maxWithdrawalLimit, minWithdrawalLimit, maxDepositLimit, minDepositiLimit){
    
    name = prompt('Please enter your name: ');
    balance = Number(prompt('Please enter your initial deposit amount: R'));
    // withdrawal limit set to balance
    maxWithdrawalLimit = balance;
    minWithdrawalLimit = 20;
    maxDepositLimit = 10000;
    minDepositiLimit = 50;
    // id starts at 1
    id = bankAccounts.length + 1
    
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
    //*************** 
    app.post('/clients', (req,res) =>{

    res.status(200).json(bankAccount);
    })
    // push object to array
    bankAccounts.push(bankAccount);
    //map id's for other functions to locate account being used
    mapID = bankAccounts.map(account => account.accountID);
    mapAccountState = bankAccounts.map(account => account.accountState);
    console.log(mapID);
    chooseOption();
    //return bankAccounts;
    
}

// function closes account and sets balance to zero
function closeAccount(id){
    id = Number(prompt('Enter unique id: '));
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
    //****************************
    app.delete('/clients/:id', (req,res) =>{
        const id = parseInt(req.params.id);
        res.send('Account deleted');
    })
    // back to main menu
    chooseOption();

}

function depositFunds(id){
    id = Number(prompt('Enter unique id : '));
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
            const balanced = bankAccounts[objIndex].balance;
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update maxWithdrawalLimit to equal to balance
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance;

        } else if (deposit > bankAccounts[objIndex].maxDepositLimit){
            console.log('Deposit amount exceeds deposit limit! Try again');
            depositFunds();

        }
    
        app.put('/clients/transaction/:id', (req,res) => {
            const id = parseInt(req.params.id);
            res.json(bankAccounts).end();
        
        })
    }
    chooseOption();

}
function withdrawFunds(id){
    id = Number(prompt('Enter unique id: '));
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
            const balanced = bankAccounts[objIndex].balance ;
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update withdrawal limit to current balance of account
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance

        } else if (withdrawal > bankAccounts[objIndex].maxWithdrawalLimit){
            console.log('Insufficient Funds! Try again');
            withdrawFunds();

        }
        app.put('/clients/transaction/:id', (req,res) => {
            const id = parseInt(req.params.id);
            res.json(bankAccounts).end();
        
        })
    }
    chooseOption();
}

//********************** */
app.get('/clients', (req,res) =>{
    res.send(bankAccounts);
} );

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})
