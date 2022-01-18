const inputNumber = prompt("Enter any digit between one and 3000: ");

const seperateInputNumbers = [];

let zeros;

// loop through each value in input, round off each value to nearest 1000,100 or 10
function numberRoundOff() {   
    if (inputNumber.length == 4) {
        zeros = '000';
        for (let i = 0; i<inputNumber.length; i++) {
        const numberA = inputNumber[i] + zeros ;
        zeros = zeros.slice(0,-1);
        seperateInputNumbers.push(Number(numberA));
        }
    } else if (inputNumber.length == 3) {
        zeros = '00';
        for (let i = 0; i<inputNumber.length; i++) {
        const numberA = inputNumber[i] + zeros ;
        zeros = zeros.slice(0,-1);
        seperateInputNumbers.push(Number(numberA));
        }
    } else if (inputNumber.length == 2) {
        zeros = '0';
        for (let i = 0; i<inputNumber.length; i++) {
        const numberA = inputNumber[i] + zeros ;
        zeros = zeros.slice(0,-1);
        seperateInputNumbers.push(Number(numberA));
        }
    } else if (inputNumber.length == 1) {
        seperateInputNumbers.push(Number(inputNumber));
    } else if ( inputNumber.length > 4) {
        console.log("The number you have inserted is too large")
    }
    else {
        console.log('You have not inserted a number');
    }
    return seperateInputNumbers;
}
numberRoundOff();
console.log('Input numbers seperated and rounded off: ')
console.log(seperateInputNumbers);


let romanNumeralValue = '';
let testValue;
let baseNum;

function romanNumerals() {
    for (let i=0; i<seperateInputNumbers.length; i++){
        if (3000 < Number(inputNumber)){
            romanNumeralValue = '';
            console.log('Incorrect input! The number you have inserted is larger than 3000');
            break;
        } else if(900<seperateInputNumbers[i] && seperateInputNumbers[i]<3000) {
            // testValue determines amount of times M is repeated
            testValue = seperateInputNumbers[i] / 1000
            console.log(testValue);
            for (let i = 0; i<testValue; i++) {
                romanNumeralValue += 'M';
            }

        } else if (seperateInputNumbers[i] == 900) {
            romanNumeralValue += 'CM'

        } else if (499<seperateInputNumbers[i] && seperateInputNumbers[i]<900) {
            // minus 500 to get preceding letters for numbers>500
            baseNum = seperateInputNumbers[i] - 500;
            testValue = baseNum / 100;
            // if just 500
            romanNumeralValue += 'D';
            //if more than 500
            for(let i = 0; i<testValue; i++) {
                 romanNumeralValue += 'C';
            }
                
        } else if (seperateInputNumbers[i] == 400) {
            romanNumeralValue += 'CD'

        } else if (99<seperateInputNumbers[i] && seperateInputNumbers[i]<400) {
            //numbers between 100 and 300
            baseNum = seperateInputNumbers[i];
            testValue = baseNum / 100;
            for(let i = 0; i<testValue; i++) {
                 romanNumeralValue += 'C';
            }
                
        } else if (seperateInputNumbers[i] == 90) {
            romanNumeralValue += 'XC'

        } else if (49<seperateInputNumbers[i] && seperateInputNumbers[i]<90) {
            // minus 50 to get preceding letters for numbers>50
            baseNum = seperateInputNumbers[i] - 50;
            testValue = baseNum / 10;
            // if just 50
            romanNumeralValue += 'L';
            //if more than 50
            for(let i = 0; i<testValue; i++) {
                 romanNumeralValue += 'X';
            }
                
        } else if (seperateInputNumbers[i] == 40) {
            romanNumeralValue += 'XL'

        } else if (10<seperateInputNumbers[i] && seperateInputNumbers[i]<40) {
            //numbers between 10 and 30
            baseNum = seperateInputNumbers[i];
            testValue = baseNum / 10;
            for(let i = 0; i<testValue; i++) {
                 romanNumeralValue += 'X';
            }
                
        } else if (seperateInputNumbers[i] == 9) {
            romanNumeralValue += 'IX'

        } else if (4<seperateInputNumbers[i] && seperateInputNumbers[i]<9) {
            // minus 5 to get preceding letters for numbers>5
            baseNum = seperateInputNumbers[i] - 5;
            // if just 5
            romanNumeralValue += 'V';
            //if more than 5
            for(let i = 0; i<baseNum; i++) {
                 romanNumeralValue += 'I';
            }
                
        } else if (seperateInputNumbers[i] == 4) {
            romanNumeralValue += 'IV'

        }else if (0<seperateInputNumbers[i] && seperateInputNumbers[i]<4) {
            // minus 5 to get preceding letters for numbers>5
            baseNum = seperateInputNumbers[i]
            for(let i = 0; i<baseNum; i++) {
                 romanNumeralValue += 'I';
            }
                
        } 
    }    

}
romanNumerals();

console.log('The roman numeral equivalent of this value is: ');
console.log(romanNumeralValue);