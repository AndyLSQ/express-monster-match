import express from 'express';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

import monsters from './monsterData.json' assert {type: 'json'};

//router
app.get('/', function(request, response) {
	response.render('home')
})

app.get('/monsters', function(request, response) {
	response.render('monsters', {data: monsters})
})

app.get('/adopt', function(request, response) {
	response.render('adopt')
})

app.get('/about', function(request, response) {
	response.render('about')
})

app.get('/detail/:id', function(request, response) {
	response.render('detail', {data: monsters, params: request.params})
	// response.render('detail', {data: monsters})
})

//if no route matches use use()
app.use(function(request, response){
	response.status(404).render('404', {query: request.url})
})


// Start app
app.listen(1982, function(){
	console.log("server started at http://localhost:1982/")
});