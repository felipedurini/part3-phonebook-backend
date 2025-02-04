const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]     
const number = process.argv[4]   

const url =
  `mongodb+srv://felipeduri:${password}@part3.nf6rt.mongodb.net/telephone-contacts?retryWrites=true&w=majority&appName=part3`
  
mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const addPerson = (name, number) => {
    if(name && number){
        const person = new Person({
        name: name,      
        number: number,  
      })
    
      person.save().then(result => {
        console.log(`added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
      })}
      else{
        console.log("Phonebook:");
        
        Person.find({}).then(result => {
            result.forEach(person => {
              console.log(person)
            })
            mongoose.connection.close()
          })
      }
}



addPerson(name, number)