const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false,}));

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


function createAccount(body){
    
    // withdrawal limit set to balance
    maxWithdrawalLimit = body.balance;
    minWithdrawalLimit = 20;
    maxDepositLimit = 10000;
    minDepositiLimit = 50;
    
    // create object
    bankAccount = {name: body.name,
        balance: body.balance,
        accountID: bankAccounts.length + 1,
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
    
}

// function closes account and sets balance to zero
function closeAccount(id){
    let result = {};
    //id = Number(prompt('Enter unique id: '));
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
            result = account;
        }
    });
    return result;

}

function depositFunds(id, deposit){
    let result = {};
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        result = 'ID incorrect';

    } else {
        const objIndex = bankAccounts.findIndex(obj => obj.accountID == id);
        if (bankAccounts[objIndex].accountState == 'Closed') {
            //prevent transaction if account is closed
            console.log('Account has been closed, transaction can\'t be processed');
            result = 'Account closed';
        } else if(deposit <= bankAccounts[objIndex].maxDepositLimit && deposit >= bankAccounts[objIndex].minDepositiLimit){
            console.log(`Old Balance: ${bankAccounts[objIndex].balance}`);
            bankAccounts[objIndex].balance = bankAccounts[objIndex].balance + deposit;
            const balanced = bankAccounts[objIndex].balance;
            result = bankAccounts[objIndex]; //
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update maxWithdrawalLimit to equal to balance
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance;

        } else if (deposit > bankAccounts[objIndex].maxDepositLimit){
            console.log('Deposit amount exceeds deposit limit! Try again');
            result = 'Deposit amount exceeded';
        } else {
            result = 'something went wrong';
        }     
    }
    return result;

}
function withdrawFunds(id, withdrawal){
    let result = []
    if (mapID.includes(id) == false){
        console.log('id not found, make sure your id is correct!');
        withdrawFunds();
    } else {    
        const objIndex = bankAccounts.findIndex(obj => obj.accountID == id);
        if (bankAccounts[objIndex].accountState == 'Closed') {
            //prevent transaction if account is closed
            console.log('Account has been closed, transaction can\'t be processed');
            chooseOption();
        } else if(withdrawal <= bankAccounts[objIndex].maxWithdrawalLimit && withdrawal >= bankAccounts[objIndex].minWithdrawalLimit){
            console.log(`Old Balance: ${bankAccounts[objIndex].balance}`);
            bankAccounts[objIndex].balance = bankAccounts[objIndex].balance - withdrawal;
            const balanced = bankAccounts[objIndex].balance ;
            result = bankAccounts[objIndex];
            console.log(`New Balance: ${bankAccounts[objIndex].balance}`);
            // update withdrawal limit to current balance of account
            bankAccounts[objIndex].maxWithdrawalLimit = bankAccounts[objIndex].balance

        } else if (withdrawal > bankAccounts[objIndex].maxWithdrawalLimit){
            console.log('Insufficient Funds! Try again');
            withdrawFunds();

        }
    }
    return result;
}
//********************** */
//createAccount() closeAccount();   depositFunds(); withdrawFunds();
app.get('/clients', (req,res) =>{
    res.json(bankAccounts);
});

app.post('/clients', (req,res) =>{
    const body = req.body;
    const newAccount = createAccount(body);

    res.json(bankAccounts);
})

app.put('/clients/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const account = closeAccount(id);

    res.json(account).send('Account has been closed');
})

//
app.put('/clients/transaction/deposit/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const body = req.body; 
    const account = depositFunds(id,body.deposit);
    res.json(account);

})

app.put('/clients/transaction/withrawal/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    const account = withdrawFunds(id, body.withdrawal);
    res.json(account);

})

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})
