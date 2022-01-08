'use strict'


const student1 = {firstName:'Kyle', age: 19, emailAddress: 'kyleford@gmail.com', programmingLanguages: 'CSS, Java, SQL', Mentor: 'Vincent'};
const student2 = {firstName:'Steve', age: 22, emailAddress: 'stevieboy@yahoo.com', programmingLanguages: 'React, Html, CSS, C++', Mentor: 'Hans'};
const student3 ={firstName:'Zethu', age: 20, emailAddress: 'zethuwillem@gmail.com', programmingLanguages: 'Python, Java', Mentor: 'Haylee'};
const student4 = {firstName:'Jim', age: 27, emailAddress: 'jimCole@outlook,com', programmingLanguages: 'Java, Javascript, Html', Mentor: 'Vusi'};
const student5 = {firstName:'Precious', age: 23, emailAddress: 'preciousNgcube@kpmInc.com', programmingLanguages: 'PHP, SQL, Python', Mentor: 'Lilly'};


function get_youngest_student() {
    const ages = [student1.age, student2.age, student3.age, student4.age, student5.age]
    const youngestStudent = Math.min(...ages);
    console.log(`The youngest student is ${youngestStudent} years old.`);
}
get_youngest_student();

function get_email_addresses() {
    const emailAddresses = [student1.emailAddress,student2.emailAddress, student3.emailAddress,
        student4.emailAddress,student5.emailAddress]
        console.log(emailAddresses)
}
get_email_addresses();

function get_students_by_programming_languages(){
    const languageCheck = prompt('Enter programming language (to check students who are familiar with it):');
    const programmingLanguages = [student1.programmingLanguages, student2.programmingLanguages,
         student3.programmingLanguages, student4.programmingLanguages,student5.programmingLanguages]
    for(let i = 0; i<programmingLanguages.length; i++){
        if(programmingLanguages[i].search(languageCheck) !== -1){
         const firstNames = [student1.firstName, student2.firstName,student3.firstName,student4.firstName,student5.firstName] 
         console.log(firstNames[i]+ ': ' + programmingLanguages[i]);
        }
    }
}
get_students_by_programming_languages();