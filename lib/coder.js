const Employee = require('./employee.js')

class Coder extends Employee {
 constructor(name, id, email, github) {
  this.github = github
 }

 getGithub() {
  return this.github
 }
 getRole() {
  return 'Coder'
 }
}

module.exports = Coder