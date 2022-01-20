let promptPermission = '';
let permission = ''
let promptName = '';
let promptGrade = '';
let studentGrade = '';
let singleStudentInfo = {studentName: '', studentGrade: ''};
let schoolStudentInfo = [];
let schoolGrades = [];


function addStudentToGrade(studentName, studentGrade){
    
    if(studentName !== undefined && studentGrade !== undefined){
        // update object w/in function = (reference type)
        singleStudentInfo = {studentName: studentName, studentGrade: studentGrade};
        //pushing objects as elements in array
        schoolStudentInfo.push(singleStudentInfo);
        // school grade array for loop within getAllStudents function
        schoolGrades.push(studentGrade);

    } else {
        // Installed prompt-sync module
        // empty call function passed, question appears after call functions w/ arguments
        promptPermission = require('prompt-sync')();
        permission = promptPermission('Would you like to add a student?(y/n): ');

        if (permission == 'y') {
        promptName = require('prompt-sync')();
        studentName = promptName('Enter student name:');
        promptGrade = require('prompt-sync')();
        studentGrade = Number(promptGrade('Enter student grade:'));

        singleStudentInfo = {studentName: studentName, studentGrade: studentGrade};
        //pushing objects as elements in array
        schoolStudentInfo.push(singleStudentInfo);
        
        }else if(permission == 'n') {
        console.log('Ok!');

        } else {
        console.log('Your input is wrong, enter y/n');
        addStudentToGrade(); 
        }
    }
 
    return studentName, studentGrade;
}


function getStudentsForGrade() {
    promptPermission = require('prompt-sync')();
    permission = promptPermission('Would you like to search for students in a grade?(y/n): ');
    
    if (permission == 'y') {
        promptGrade = require('prompt-sync')();
        studentGrade = Number(promptGrade('Enter grade to retrieve grade list:'));
        console.log(`Student list for grade ${studentGrade} :`);
        // loop through objects in array, find object with property = variable input
        for(let i = 0; i<schoolStudentInfo.length; i++) {
            if(schoolStudentInfo[i].studentGrade == studentGrade){
                console.log(schoolStudentInfo[i].studentName);
            }
        }
    } else if(permission == 'n') {
        console.log('Ok!');
    } else {
        console.log('Your input is wrong, enter y/n');
        getStudentsForGrade(); 
    }

    return studentGrade;
}

function getAllStudents() {
    promptPermission = require('prompt-sync')();
    permission = promptPermission('Would you like to display all grade lists?(y/n): ')
    
    if (permission == 'y') {
        console.log(`Student list for all grades :`);
        let baseNum = 1;
        // limit is length of schoolStudentInfo because at the very least, only 1 student per grade
        for (let i = 0; i<schoolStudentInfo.length; i++) {
            // increment of baseNum only up to 12 i.e grade 12
            if(baseNum < 13) {
                console.log(`GRADE ${baseNum}: `);
                //find student grade == baseNum
                if (schoolStudentInfo[i].studentGrade === baseNum){
                    console.log(schoolStudentInfo[i].studentName);
                }
                //loop through other  objects = baseNum ,and display all besides student in above for loop
                for(let t = 0; t<schoolStudentInfo.length; t++){
                    if(schoolStudentInfo[t].studentGrade == baseNum && schoolStudentInfo[i].studentName !== schoolStudentInfo[t].studentName){
                    console.log(schoolStudentInfo[t].studentName);
                    } 
                }
                //update baseNum for next loop and loop w/n loop
                baseNum += 1;
            }
    
        }
         
    } else if(permission == 'n') {
        console.log('Ok!');
    } else {
        console.log('Your input is wrong, enter y/n');
        addStudentToGrade(); 
    }

    return studentGrade;
}

addStudentToGrade('Anna',1);
addStudentToGrade('Barb', 3);
addStudentToGrade('Charlie', 3);
addStudentToGrade('Lawrence', 5);
addStudentToGrade('Themba', 2);
addStudentToGrade('John', 3);
addStudentToGrade('Esethu', 4);
addStudentToGrade('Carl', 2);
addStudentToGrade('Garry',4 );
addStudentToGrade();
getStudentsForGrade();
getAllStudents();