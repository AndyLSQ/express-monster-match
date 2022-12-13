import express from 'express';

const app = express();

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', function(request, response) {
	response.render('home', {pageName: "Home Page"})
})


// Start app
app.listen(1982, function(){
	console.log("server started at http://localhost:1982/")
});