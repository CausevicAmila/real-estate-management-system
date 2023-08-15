const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const client = require('./Database/database')

app.use(express.static(path.join(__dirname, 'dist')));

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));


const port = process.env.PORT || 3000


app.get('/', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});

app.get('/about', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});

app.get('/sales', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});
app.get('/contact', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});
app.get('/login', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});
app.get('/property', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});

app.get('/properties', (req, res) => {
    const { sort } = req.query;

    let orderByClause = 'ORDER BY id ASC';

    if (sort) {
        if (sort[0].toLowerCase() === 'l') {
            orderByClause = 'ORDER BY price ASC';
        } else if (sort[0].toLowerCase() === 'h') {
            orderByClause = 'ORDER BY price DESC';
        }
    }

    const query = `SELECT * FROM property ${orderByClause}`;

    client.query(query, (err, dbRes) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
            return;
        }
        res.json(dbRes.rows);
    });
});

app.get('/image/:id', (req, res) => {
    const pictureId = req.params.id;
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif']; 

    let foundImagePath = null;

    allowedExtensions.some(extension => {
        const imagePath = path.join(__dirname, 'property_images', pictureId + extension);

        try {
            fs.accessSync(imagePath, fs.constants.F_OK);
            foundImagePath = imagePath;
            return true; 
        } catch (err) {
            return false;
        }
    });

    if (!foundImagePath) {
        res.status(404).send('Image not found');
    } else {
        res.sendFile(foundImagePath);
    }
});



app.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`);
});
