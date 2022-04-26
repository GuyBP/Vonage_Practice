const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Item = require('./models/item');

mongoose.connect('mongodb://localhost:27017/store', {
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));


app.post('/items', async (req, res) => {
    const item = new Item(req.body.item);
    await item.save();
    res.redirect('items');
})

app.get('/items', async (req, res) => {
    const items = await Item.find({});
    res.render('items/index', { items });
})

app.get('/items/new', async (req, res) => {
    res.render('items/new');
})

app.listen(3000, () => {
    console.log('Running in port http://localhost:3000/items');
})