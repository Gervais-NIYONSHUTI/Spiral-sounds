import validator from 'validator'
import { db } from '../db/dbConnection.js'

export async function registerUser(req, res){
    let { name, email, username, password} = req.body
    if( !name || !email || !username || !password){
        res.status(400).json({error: "All fields must be completed"})
    }
    name = name.trim()
    email = email.trim()
    username = username.trim()
    if(!/^[a-zA-Z0-9_-]{1,20}$/.test(username)){
        res.status(400).json({error: "Username must be 1–20 characters, using letters, numbers, _ or -."})
    }
    if(!validator.isEmail(email)){
        res.status(400).json({error: "Invaid email format"})
    }
    const users = db.prepare('SELECT id FROM users WHERE email = ? OR username = ?').all(name, email)
    if(users.length){
        return res.status(400).json({ error: 'Email or username already in use.' })
    } else {
        db.prepare("Insert into users (name, email, username, password) values(?,?,?,?)").run(name, email, username, password)
        res.status(201).json({ message: 'User registered'})
    }
}