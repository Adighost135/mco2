const express = require('express');
const app = express();

app.listen(3000);
console.log("listening at port 3000");
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
	res.render('index.ejs', {title: "Home page", h_user: "adi"});
})
