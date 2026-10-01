const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

const MONGO = 'mongodb://localhost:27017/mydb';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(MONGO)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:",err));

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
       type: String,
       required: true
    }
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', async (req,res )=>{
    const users = await User.find().sort({_id: -1});
    res.json(users);
});

app.post('/api/users', async (req,res )=>{
    try{
       const user= new User(req.body);
       await user.save();
       res.status(201).json(user);
    }catch(err){
        res.status(400).json({error: err.message});
    }
});

app.put('/api/users/:id', async (req,res )=>{
    try{
        const u = await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true, runValidators: true}
        );
        if(!u)
            return res.status(404).json({ error: 'Not found'});

        res.json(u);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

app.delete('/api/users/:id', async (req,res )=>{
    try{
        const u = await User.findByIdAndDelete(req.params.id);

        if(!u)
            return res.status(404).json({error: 'Not found'});

        res.json({message: 'Deleted'});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public','index.html'));
});

app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});