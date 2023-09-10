const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const fs = require('fs');
const client = require('./Database/database')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname, 'dist')));

client.connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Error connecting to the database', err));


const port = process.env.PORT || 3000
const SECRET_KEY = 'd2JF9$1k8XpA&5qR';



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());


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



app.post('/loginIn', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
        const user = result.rows[0];


        if (user) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1 hour', algorithm: 'HS256' });
            res.status(200).cookie('token', token, { httpOnly: true });
            res.json({ token });

        } else {
            res.status(401).json({ error: 'Invalid username or password.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
});


function verifyToken(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Authorization token is missing.' });  
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token.' });
    }
}


app.get('/admin', verifyToken, (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);
});

app.get('/admin/add', verifyToken, (req, res) => {

    const location = path.join(__dirname, 'dist', 'index.html')

    res.sendFile(location);
});

app.post('/addingProperty', async (req, res) => {
    try {
        const propertyData = req.body;


        const nextIdQuery = `
            SELECT nextval('property_id_seq') as next_id;
        `;

        const result = await client.query(nextIdQuery);
        const nextId = result.rows[0].next_id;

        const image = propertyData.images[0];
        const imageData = image.data
        const binaryData = Buffer.from(imageData, 'base64');

        const originalFileName = image.name; 
        const fileExtension = originalFileName.split('.').pop();

        const newFileName = `${nextId}.${fileExtension}`;

        fs.writeFileSync(`property_images/${newFileName}`, binaryData);

       
        for (let i = 1; i < propertyData.images.length; i++) {
            const image = propertyData.images[i];
            const imageData = image.data
            const binaryData = Buffer.from(imageData, 'base64');

            const originalFileName = image.name; 
            const fileExtension = originalFileName.split('.').pop(); 

            const newFileName = `${nextId}_${i + 1}.${fileExtension}`;

            fs.writeFileSync(`property_images/${newFileName}`, binaryData);
        }


        const insertQuery = `
            INSERT INTO property (
                id,
                pimage,
                title,
                description,
                address,
                bed,
                area,
                price,
                plink,
                type,
                "roomNum",
                "bathNum",
                "constructionYear",
                floor,
                heating,
                windows,
                "blinded door",
                lift,
                "electrical power",
                internet,
                garbage,
                "cable TV",
                interphone,
                "public parking",
                electricity,
                balcony,
                garage,
                "air conditioning",
                gas
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ,$13,$14, $15, $16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29
            )
        `;


        const values = [
            nextId,
            `/image/${nextId}`,
            propertyData.title,
            propertyData.desc,
            propertyData.address,
            parseInt(propertyData.roomNumber),
            parseInt(propertyData.size),
            parseInt(propertyData.price),
            '/property',
            propertyData.type,
            parseInt(propertyData.roomNumber),
            parseInt(propertyData.bathroomNumber),
            parseInt(propertyData.yearConstruction),
            parseInt(propertyData.floor),
            propertyData.heatingOption,
            propertyData.joineryOption,
            propertyData.selectedFeatures['Blinded door'],
            propertyData.selectedFeatures.Lift,
            propertyData.selectedFeatures['Electrical power'],
            propertyData.selectedFeatures.Internet,
            propertyData.selectedFeatures.Garbage,
            propertyData.selectedFeatures['Cable TV'],
            propertyData.selectedFeatures.Interphone,
            propertyData.selectedFeatures['Public Parking'],
            propertyData.selectedFeatures.Electricity,
            propertyData.selectedFeatures.Balcony,
            propertyData.selectedFeatures.Garage,
            propertyData.selectedFeatures['Air conditioning'],
            propertyData.selectedFeatures.Gas
        ];
        await client.query(insertQuery, values);

    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ message: 'Error uploading images' });
    }
});


app.listen(port, () => {
    console.log(`Express.js server listening on port ${port}`);
});
