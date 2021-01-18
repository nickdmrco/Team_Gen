const Employee = require('./employee.js')

class Boss extends Employee {
 constructor(name, id, email, officeNumber) {
  super(name, id, email)
  this.officeNumber = officeNumber
 }
 getOfficeNumber() {
  return this.officeNumber
 }
 getRole() {
  return 'Boss'
 }
}

module.exports = Boss