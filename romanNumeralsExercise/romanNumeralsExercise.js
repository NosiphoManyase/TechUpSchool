const inputNumber = prompt("Enter any digit between 1 and 3000: ");

const seperateInputNumbers = [];

let zeros;

function eachValue(){
    for (let i = 0; i<inputNumber.length; i++) {
        const numberA = inputNumber[i] + zeros ;
        zeros = zeros.slice(0,-1);
        console.log(numberA);
        seperateInputNumbers.push(Number(numberA));
        }
        return;
}
// loop through each value in input, round off each value to nearest 1000,100 or 10
function numberRoundOff() {   
    if (inputNumber.length == 4 && inputNumber <= 3000) {
        zeros = '000';
        eachValue();
        
    } else if (inputNumber.length == 4 && inputNumber > 3000){
        console.log('Incorrect input! The number you have inserted is larger than 3000');

    } else if (inputNumber.length == 3) {
        zeros = '00';
        eachValue();

    } else if (inputNumber.length == 2) {
        zeros = '0';
        eachValue();

    } else if (inputNumber.length == 1) {
        seperateInputNumbers.push(Number(inputNumber));

    } else if ( inputNumber.length > 4) {
        console.log("The number you have inserted is too large")

    } else {
        console.log('You have not inserted a number');
    }
    return seperateInputNumbers;
}
numberRoundOff();
console.log('Input numbers seperated and rounded off: ')
console.log(seperateInputNumbers);


let romanNumeralValue = [];
let testValue;

seperateInputNumbers.forEach(function(seperateInputNumber) {
    // used testValue as a base for all conditions
    testValue = seperateInputNumber/1000;

    // convert number to roman numeral value 
    //push to object to array

    if (testValue >= 1){
        // manipulated string to repeat based on amount of thousands
        romanNumeralValue.push({ numberValue: seperateInputNumber,
        romanValue: 'M'.repeat(testValue)}) ;

    } else if(testValue == 0.9) { 
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'CM'}) ;

    } else if(testValue > 0.4 && testValue < 0.9) {
        // D = default string for 500 
        //convert testValue to whole numbers to use repeat method for string
        // testValue determines C's added to romanValue for 500>numbers<900 
        testValue = (testValue * 10) -5;
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'D' + 'C'.repeat(testValue) }) ;

    } else if(testValue == 0.4){
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'CD'}) ;
   
    } else if(testValue >= 0.1 && testValue < 0.4) {
        // length of C's depends on number of 100's for num<400
        testValue = testValue * 10;
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'C'.repeat(testValue)}) ;
         
    } else if(testValue == 0.09){
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'XC' })

    } else if(testValue >= 0.05 && testValue < 0.09) {
        testValue = (testValue * 100) - 5;
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'L' + 'X'.repeat(testValue) });

    } else if(testValue == 0.04) {
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'XL' });

    } else if(testValue >= 0.01 && testValue < 0.04) {
        testValue = (testValue * 100);
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'X'.repeat(testValue) });

    } else if (testValue == 0.009){
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'IX'});

    } else if (testValue >= 0.005 && testValue < 0.009) {
        testValue = (testValue * 1000) - 5;
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'V'+'I'.repeat(testValue) });

    } else if(testValue == 0.004){
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'IV'});

    }else if(testValue >= 0.001 && testValue < 0.004) {
        testValue = (testValue * 1000);
        romanNumeralValue.push({ numberValue: seperateInputNumber,
            romanValue: 'I'.repeat(testValue) });
    }
 
});

console.log('The roman numeral equivalent of this value is: ');
const romanNumeralMap = romanNumeralValue.map(joinRomans => joinRomans.romanValue);
console.log(romanNumeralMap.join(''));

