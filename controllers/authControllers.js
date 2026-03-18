import validator from 'validator'
import { db } from '../db/dbConnection.js'
import bcrypt from 'bcrypt'

export async function registerUser(req, res){
    let { name, email, username, password} = req.body
    if( !name || !email || !username || !password){
        res.status(400).json({error: "All fields must be completed"})
    }
    name = name.trim()
    email = email.trim()
    username = username.trim()
    const hashed = await bcrypt.hash(password, 10)

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
        const result = db.prepare("Insert into users (name, email, username, password) values(?,?,?,?)").run(name, email, username, hashed)
        req.session.userID = result.lastInsertRowid
        res.status(201).json({ message: 'User registered'})
    }
}
export async function loginUser(req, res){
     let { username, password } = req.body
     if( !username || !password){
        res.status(400).json({error: "All fields are required"})
    }
    username = username.trim()
    let user = db.prepare('SELECT * FROM users WHERE username = ?').all(username)

    if (!user.length) {
      return res.status(401).json({ error: 'Invalid credentials'} )
    }
    user = user[0]
    const isValid = await bcrypt.compare(password, user.password)
    if(!isValid){
        return res.status(401).json({ error: 'Invalid credentials'} )
    }
    req.session.userID = user.id
    res.json({ message: 'Logged in' })

}
export async function logoutUser(req, res){
    req.session.destroy(() => res.json({ message: "Logged out"}))
}