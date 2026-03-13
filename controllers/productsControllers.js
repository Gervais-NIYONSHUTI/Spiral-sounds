import { db } from "../db/dbConnection.js"

export async function getGenres(req, res){

  const genres = db.prepare('select distinct(genre) from products')
  const genresRows = genres.all().map(val => val.genre)
  res.json(genresRows)
}

export async function getProducts(req, res){
  const { genre } = req.query
  console.log(genre)
  let genres = ''
  if(genre !== undefined) genres = db.prepare(`select * from products where genre = '${genre}'`)
  else genres = db.prepare('select * from products')
  res.json(genres.all())

}