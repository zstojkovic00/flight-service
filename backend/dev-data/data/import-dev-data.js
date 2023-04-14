const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('../../models/userModel');
const Flight = require('../../models/flightModel')
const City = require('../../models/cityModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const flights = JSON.parse(fs.readFileSync(`${__dirname}/flights.json`, 'utf-8'))
const cities = JSON.parse(fs.readFileSync(`${__dirname}/city.json`, 'utf-8'));




// IMPORT DATA INTO DB
const importData = async () => {
    try {
        await User.create(users, { validateBeforeSave: false });
        await Flight.create(flights)
        await City.create(cities)
        console.log('Data successfully loaded!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
    try {
        await User.deleteMany();
        await Flight.deleteMany();
        await City.deleteMany();
        console.log('Data successfully deleted!');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}























