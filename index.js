const express = require('express')
const cors = require('cors')

const app = express()

let people = [
    {
    "id": "80aa",
    "name": "Munkh-Erdene Batchuluun",
    "number": "042498578"
    },
    {
    "id": "ddc7",
    "name": "Albert Enshtein",
    "number": "0415485868"
    },
    {
    "id": "cfad",
    "name": "Neil Armstrong",
    "number": "0435485868"
    },
    {
    "id": "9756",
    "name": "Van Helsing",
    "number": "0666485868"
    },
    {
    "name": "Munkh",
    "number": "asdb",
    "id": "d0d4"
    }
]

// uses express json parser to get body in json format or access the body data easily
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/people', (req, res) => {
    res.json(people)
})

app.get('/api/people/:id', (req, res) => {
    const id = req.params.id
    const person = people.find(p => p.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    } 
})

app.post('/api/people', (req, res) => {
    const person = req.body
    console.log(person)
    if(!person.id || !person.name || !person.number){
        return res.status(400).json({
            err: 'Missing id, name or number.'
        })
    }

    const existingPerson = people.find(p => p.name === person.name)
    if(existingPerson){
        return res.status(400).json({
            err: 'Name must be unique.'
        })
    }

    people = people.concat(person)
    res.json(people)
})

app.delete('/api/people/:id', (req, res) => {
    const id = req.params.id
    people = people.filter(p => p.id !== id)

    res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
