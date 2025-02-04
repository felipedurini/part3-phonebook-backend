require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })



app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))

mongoose.set('strictQuery',false)
mongoose.connect(url)

morgan.token('body', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)  
  }
  return ''  
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const now = new Date();
const time = now.toString();
// const info = `
// <p>Phonebook has info for ${people.length} people </p>
// <p>${time}</p>
// `

app.get('/info', (request, response) => {
  response.send(info)
})

app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/people/:id', (request, response) => {
    const id = Number(request.params.id)
    people = people.filter(person => person.id !== id)
    response.status(204).end()
})

const generateId = () =>{
    return Math.floor(Math.random() * 999999)
}

app.post('/api/people', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    if (people.find(p => p.name === body.name)) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
  
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
  
    console.log(person);
    
    people = people.concat(person)

    response.json(person)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
