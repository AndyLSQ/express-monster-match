import path from 'path'
import { fileURLToPath } from 'url'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'

import express from 'express';
import monsters from './monsterData.json' assert {type: 'json'};

const app = express();
const port = process.env.PORT || 1982

app.set('view engine', 'ejs');
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'views')))

// Add a middleware function that runs on every route. It will inject 
// the prismic context to the locals so that we can access these in 
// our templates.
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  }
  next()
})



// Listen to application port.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(express.static('public'));


// Router

// Prismic- Query for the root path.
app.get('/', async (req, res) => {
  // Here we are retrieving the document from your API endpoint
  const document = await client.getByUID('page','this-is-a-apage');
  res.render('home', { document });
})

// app.get('/', function(request, response) {
// 	response.render('home')
// })

app.get('/monsters', async(request, response) => {
  let monsters = await client.getAllByType('monster');
  response.render('monsters', { monsters });
	// response.render('monsters', {data: monsters})
})

// app.get('/monsters', function(request, response) {
//   response.render('monsters', {data: monsters})
// })

app.get('/adopt', function(request, response) {
	response.render('adopt')
})

app.get('/about', function(request, response) {
	response.render('about')
})

app.get('/detail/:id', function(request, response) {
  // let monsters = await client.getAllByType('monster');
	response.render('detail', {data: monsters, params: request.params})
})

//if no route matches use use()
app.use(function(request, response){
	response.status(404).render('404', {query: request.url})
})

