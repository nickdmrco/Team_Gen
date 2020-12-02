const path = require('path')
const fs = require('fs')

const templatesDir = path.resolve(__dirname, '../templates')

const render = employees => {
 const html = []
 
 html.push(employees
  .filter(employee = employee.getRole() === 'Boss')
  .map(boss => renderBoss(boss))
  )
  html.push(employees
   .filter(employee => employee.getRole() === 'Coder')
   .map(coder => renderCoder(coder))
   )
   html.push(employees
    .filter(employee => employee.getRole() === 'Intern')
    .map(intern => renderIntern())
    )
    return renderMain(html.join(''))
}

const renderBoss = boss => {
 let template = fs.readFileSync(path.resolve(templatesDir, 'manager.html'), 'utf8')
 template = replacePlaceholders(template, 'name', manager.getName())
 template = replacePlaceholders(template, 'role', manager.getRole())
 template = replacePlaceholders(template, 'email', manager.getEmail())
 template = replacePlaceholders(template, 'id', manager.getName())
 template = replacePlaceholders(template, 'officeNumber', manager.getOfficeNumber())
 return template
}

const renderCoder = coder => {
 let template = fs.readFileSync(path.resolve(templatesDir, 'coder.html'), 'utf8')
 template = replacePlaceholders(template, 'name', coder.getName())
 template = replacePlaceholders(template, 'role', coder.getRole())
 template = replacePlaceholders(template, 'email', coder.getEmail())
 template = replacePlaceholders(template, 'id', coder.getName())
 template = replacePlaceholders(template, 'github', coder.getGithub())
 return template
}

const renderIntern = intern => {
 let template = fs.readFileSync(path.resolve(templatesDir, 'intern.html'), 'utf8')
 template = replacePlaceholders(template, 'name', intern.getName())
 template = replacePlaceholders(template, 'role', intern.getRole())
 template = replacePlaceholders(template, 'email', intern.getEmail())
 template = replacePlaceholders(template, 'id', intern.getName())
 template = replacePlaceholders(template, 'school', intern.getSchool())
 return template
}

const renderMain = html => {
 const template = fs.readFileSync(path.resolve(templatesDir, 'main.html'), 'utf8')
 return replacePlaceholders(template, 'team', html)
}

const replacePlaceholders = (template, placeholder, value) => {
 const pattern = new RegExp("{{ " + placeholder + " }}", "gm")
 return template.replace(pattern, value)
}

module.exports = render