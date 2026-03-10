import express from "express"

const PORT = 8000

const app = express()

const trainees = {
    name: 'hope',
    age: 24
}

app.get('/', (req, res) =>{
    res.json(trainees)
})

app.listen(PORT, () => console.log('the site is connected to port: ' + PORT))