import { db } from '../db/dbConnection.js'

export async function getCurrentUser(req, res) {
  try {
    
    if(!req.session.userID){
      res.json({ isLoggedIn: false })
    }
    const user = db.prepare('SELECT name FROM users WHERE id = ?').get(req.session.userID)
    console.log(user, req.session.userID)
    res.json({ isLoggedIn: true, name: user.name })

  } catch (err) {
    console.error('getCurrentUser error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}