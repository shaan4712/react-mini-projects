//1. Backend Api endpoints
const express = require('express');
const app = express();

const User = require('./models/User'); //User is a model like a Mongodb model

app.get('api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); //HTTP 200 status code - success
    }
    catch (error) {
        res.status(500).json({error: "Failed to fetch users"}); //HTTP 500 status code - failure
    }
})

app.post('api/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error){
        res.status(400).json({error: "Failed to create user"});
    }
})

//2. Frontend api calls
//same usual async await api call - just url will be - "api/user"

/* GET    /api/users       // Get all
POST   /api/users       // Create
GET    /api/users/:id   // Get one
PUT    /api/users/:id   // Update
DELETE /api/users/:id   // Delete

*/

//for a specific field - url - "/api/users/${id}"