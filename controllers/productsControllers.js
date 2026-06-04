import { db } from "../db/dbConnection.js"

export async function getGenres(req, res){

  const genres = db.prepare('select distinct(genre) from products')
  const genresRows = genres.all().map(val => val.genre)
  res.json(genresRows)
}

export function getProducts(req, res){
  const { genre, search } = req.query
  let query = 'select * from products'
  if (genre) {
    query += ' where genre = ?'
    const products = db.prepare(query).all(genre)
    return res.json(products)
  } else if(search){
    query += ' WHERE title LIKE ? OR artist LIKE ? OR genre LIKE ?'
    const searchPattern = `%${search}%`
    const products = db.prepare(query).all(searchPattern, searchPattern, searchPattern)
    return res.json(products)
  }

  const products = db.prepare(query).all()
  return res.json(products)
}