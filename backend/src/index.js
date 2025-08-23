import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();



app.use(express.json());
app.use(cors());

// Add a new user
app.post('/user', async(req,res)=>{
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    });
    res.json(user);
})
// For testing purposes from the browser
app.get('/add', async (req,res)=>{
    const username = Math.random().toString(36).substring(7);
    const password = Math.random().toString(36).substring(7);

    const user = await prisma.user.create({
        data: {
            username,
            password
        }
    });
    res.json(user);
})
// Get all users
app.get('/users', async (req,res)=>{
    const users = await prisma.user.findMany();

    res.json(users);

})


// Get the user by ID
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) }
    });
    res.json(user);
});

// Update a user password
app.put('/user/:id', async (req, res) => {
    const {id} = req.params;
    const {password} = req.body;

    const user = await prisma.user.update({
        where: {id: Number(id)},
        data: {password}
    });
    res.json(user);
});

// Delete the user from the DB
app.delete('/user/:id', async (req, res) => {
    const {id} = req.params;

    const user = await prisma.user.delete({
        where: {id: Number(id)}
    });
    res.json(user);
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        message: 'API is healthy',
        statuscode: 200,
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/',(req,res)=>{
    res.json({
        message: 'Welcome to the API',
        author: 'Debjyoti',
        statuscode: 200,
        timestamp: new Date().toISOString()
    });
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});