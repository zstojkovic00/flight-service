## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Setup](#setup)
* [Acknowledgement](#acknowledgement)






## General info

Iza Oblaka is a MERN application that helps users find and compare flight options for their travel plans. Once you sign up for an account, you can start booking tickets.
This project was created as part of my studies.



## Technologies
Project is created with:
* Node.js
* Express
* React.js
* MongoDB
* Redux



<br/>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,react,redux" />
  </a>
</p>




## Features
* Authentication and authorization created - JWT
* Admin Dashboard
* Account page where you can change your user information and upload a photo
* When creating an account, your photo will be the first letter of your name.
* Booking Flights
* Search functionality
* Based on your location, we suggest flights to the most popular cities.




## Setup

```
git clone https://github.com/zstojkovic00/iza-oblaka.git
```

Requirements:

If you want to test locally the user's ability to receive flights according to his IP address, You should install Ngrok and set your backend to be available on the internet.

Set up ENV file with appropriate data:

#### PORT={port}
#### DATABASE={mongodb+srv}
#### PASSWORD={mongodb-password}
#### JWT_SECRET={your_jwt_secret}
#### JWT_EXPIRES_IN={jwt expires time}
#### STRIPE_SECRET_KEY={your_stripe_key}


Frontend:
```
$ npm install
$ npm start
```

Backend:
```
npm install
npm start 
```

## Acknowledgement
This application makes use of the following third-party libraries:
Stripe, Multer, Ipapi API, Axios, React Material UI, and many more