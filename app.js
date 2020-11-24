const Employee = require("./lib/Employee");
const Boss = require("./lib/Boss");
const Coder = require("./lib/Coder");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = []

const finish = () => {
 let htmlPage = render(team)
 if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR)
 }
 fs.writeFile(outputPath, htmlPage, err => {
  if (err) {
   console.log(err)
  }
 })
}

const addMember = () => {
 let role = ''
 inquirer.prompt([{
  type: 'list',
  name: 'type',
  message: 'Is this employee a Coder or an Intern:',
  choices: ['Coder', 'Intern']
 }])
  .then(({ type }) => {
   role = type
   if (role === 'Coder') {
    inquirer.prompt([
     {
      type: 'input',
      name: 'name',
      message: `Coder's name:`
     },
     {
      type: 'input',
      name: 'id',
      message: `Coder's id:`
     },
     {
      type: 'input',
      name: 'email',
      message: `Coder's email:`
     },
     {
      type: 'input',
      name: 'github',
      message: `Coder's github:`
     },
     {
      type: 'list',
      name: 'newMember',
      message: `Would you like to add a team member:`,
      choices: ['Yes', 'No']
     }])
     .then(({ name, id, email, github, newMember }) => {
      team.push(new Coder(name, id, email, github,))
      if (newMember === 'Yes') {
       addMember()
      } else {
       finish()
      }
     })
   } else {
    inquirer.prompt([
     {
      type: 'input',
      name: 'name',
      message: `Intern's name:`
     },
     {
      type: 'input',
      name: 'id',
      message: `Intern's id:`
     },
     {
      type: 'input',
      name: 'email',
      message: `Intern's email:`
     },
     {
      type: 'input',
      name: 'school',
      message: `What school do they attend:`
     },
     {
      type: 'list',
      name: 'newMember',
      message: `Would you like to add a team member:`,
      choices: ['Yes', 'No']
     }])
     .then(({ name, id, email, school, newMember }) => {
      team.push(new Intern(name, id, email, school,))
      if (newMember === 'Yes') {
       addMember()
      } else {
       finish()
      }
     })
   }
  })
  .catch(err => console.log(err))
}

const createTeam = () => {
 inquirer.prompt([{
  type: 'input',
  name: 'name',
  message: `Boss's name:`
 },
 {
  type: 'input',
  name: 'id',
  message: `Boss's id:`
 },
 {
  type: 'input',
  name: 'email',
  message: `Boss's email:`
 },
 {
  type: 'input',
  name: 'officeNumber',
  message: `What is their office number:`
 },
 {
  type: 'list',
  name: 'newMember',
  message: `Would you like to add a team member:`,
  choices: ['Yes', 'No']
 }
 ])
  .then(({ name, id, email, officeNumber, newMember }) => {
   team.push(new Boss(name, id, email, officeNumber))
   if (newMember === 'Yes') {
    console.log(
     'run'
    )
    addMember()
   } else {
    finish()
   }
  })
  .catch(err => console.log(err))
}

createTeam()