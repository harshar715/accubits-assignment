const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: 'tmp/csv/' });
const fs = require('fs');
const jwt = require('jsonwebtoken');
const nodeMailer = require('../rq/produceQ')

router.post('/importdata', upload.single('file'), function (req, res, next) {
    if (req.header('Authorization')) {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisisassignment');
        if (decoded.data && token) {

            if (req.file.mimetype === 'text/csv') {

                console.log(req.file);
                let stream = fs.createReadStream(req.file.path);
                let csvData = [];
                let csvStream = csv.parse().on("data", function (data) {
                    csvData.push(data);
                    let mail = {
                        from: decoded.data.email,
                        to: data[0],
                        subject: data[2],
                        text: `Hello from ${decoded.data.firstName} ${decoded.data.lastName}`,
                        html: `<h1>${data[1]}</h1>`
                    }
                    nodeMailer(mail,'mails');

                }).on("end", function () {
                    // Remove Header ROW
                    csvData.shift();


                    // Create a connection to the database

                    // const connection = mysql.createConnection({
                    //     host: 'localhost',
                    //     user: 'root',
                    //     password: '12345',
                    //     database: 'testdb'
                    // });

                    // Open the MySQL connection
                    // connection.connect((error) => {
                    //     if (error) {
                    //         console.error(error);
                    //     } else {
                    //         let query = 'INSERT INTO customer (id, address, name, age) VALUES ?';
                    //         connection.query(query, [csvData], (error, response) => {
                    //             console.log(error || response);
                    //         });
                    //     }
                    // });

                    // delete file after saving to MySQL database
                    // -> you can comment the statement to see the uploaded CSV file.

                    // fs.unlinkSync(filePath)
                });

                stream.pipe(csvStream);


            } else {
                res.status(500).json({
                    message: 'Invalid file type. Upload CSV file.',
                    data: '',
                    status: 500
                });
            }


        } else {
            res.status(401).json({
                message: 'Unauthorized',
                data: '',
                status: 401
            });
        }

    } else {
        res.status(500).json({
            message: 'Bad Request ',
            data: '',
            status: 500
        });
    }
});

const mailsSender1 = require('../rq/consumeQ.js')('mails');

module.exports = router;