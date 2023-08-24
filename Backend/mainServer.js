const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const client = require('./Database/database')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.use(express.static(path.join(__dirname, 'dist')));

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));


const port = process.env.PORT || 3000


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


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
app.get('/property/:id', (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);

});


app.get('/properties', (req, res) => {
    const { sort, type } = req.query;

    let orderByClause = 'ORDER BY id ASC';
    let whereClause = '';

    if (type && type.toLowerCase() !== 'all') {
        whereClause = `WHERE type = '${type}'`;
    }

    if (sort) {
        if (sort[0].toLowerCase() === 'l') {
            orderByClause = 'ORDER BY price ASC';
        } else if (sort[0].toLowerCase() === 'h') {
            orderByClause = 'ORDER BY price DESC';
        }
    }

    const query = `SELECT * FROM property ${whereClause} ${orderByClause}`;

    client.query(query, (err, dbRes) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching data' });
            return;
        }
        res.json(dbRes.rows);
    });
});


const appSpecificPassword = 'aatsniuwhkpwqjwc'

app.post('/send-email', (req, res) => {
    const { name, surname, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'realestateba2023@gmail.com', 
            pass: appSpecificPassword 
        }
    });

    const mailOptions = {
        from: `${email}`,
        to: 'realestateba2023@gmail.com',
        subject: 'Property Inquiry',
        html: `<p>Name: ${name} ${surname}</p><p>Email: ${email}</p><p>Message: ${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.send('Email sent successfully');
        }
    });
});



app.get('/image/:id', (req, res) => {
    const pictureId = req.params.id;
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif' ,'.webp']; 

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


app.get('/getPropertyDetails/:id', async (req, res) => {
    const propertyId = req.params.id;

    try {
        const query = 'SELECT * FROM property WHERE id = $1';
        const { rows } = await client.query(query, [propertyId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Property not found' });
        }

        const property = rows[0];
        res.json(property);
    } catch (error) {
        console.error('Error fetching property data:', error);
        res.status(500).json({ error: 'Error fetching property data' });
    }
});


app.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`);
});
