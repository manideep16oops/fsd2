const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/userdb")
.then(() => {
    console.log("Connected to MongoDB");
})
.catch(err => {
    console.error("Error connecting to MongoDB", err);
    console.error(err);
});
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});
const User = mongoose.model('User', userSchema);
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
});
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
}); 
app.put('/users/:id', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
}); 
app.listen(1904, () => {
    console.log('server is running on http://localhost:1904');
});