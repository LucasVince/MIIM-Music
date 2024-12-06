const express = require('express');
const app = express();
const userModel = require('../DB/models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/users', async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const usernameAlreadyTaken = await userModel.findOne({ username });
        if (usernameAlreadyTaken) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const emailAlreadyTaken = await userModel.findOne({ email });
        if (emailAlreadyTaken) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        });

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

app.get('/users', async (req, res) => {
    try {
        const user = await userModel.find({ });
        res.status(201).send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/users', async (req, res) => {
    const {username} = req.body;

    try {
        const user = await userModel.findOneAndDelete( {username} );

        if (!user) {
            return res.status(400).json( {message: 'user not found'} );
        }

        return res.status(200).json({message: 'user delete succesfully'});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

app.post('/login', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const passwordComparison = await bcrypt.compare(password, user.password);

        if (!passwordComparison) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        next(err);
    }
});

app.listen(8080, console.log('API started successfully'));