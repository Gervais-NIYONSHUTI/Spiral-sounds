import { db } from "../db/dbConnection.js"

export async function getGenres(req, res){

  const genres = db.prepare('select distinct(genre) from products')
  const genresRows = genres.all().map(val => val.genre)
  res.json(genresRows)
}

export async function getProducts(req, res){
  const { genre} = req.query
  let query = 'select * from products'

  if (genre) {
    query += ' where genre = ?'
    const products = db.prepare(query).all(genre)
    return res.json(products)
  }

  const products = db.prepare(query).all()
  return res.json(products)
}