const express = require('express');
const mongoose = require('mongoose');
const app = express();

const userRoutes = require('./routes/user-route');
const dataRoutes = require('./routes/data-route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const httpServer = app.listen(PORT, function () { console.log('listening to PORT'); });

mongoose.connect(`mongodb+srv://<username>:<password>@mydatabase-imncy.mongodb.net/accubitsassignment?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(conn => console.log('DB connected Successfully'));
mongoose.Promise = global.Promise;

app.use('/api', userRoutes);
app.use('/api', dataRoutes);