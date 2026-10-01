const express=require('express');
const app=express();
const port=4000;
app.use(express.json());
let users={
    1: {id: 1201,name: 'DIET',email: '1201@ucen.ac.in'},    
    2: {id: 1202,name: 'it dept',email: '1202@diet.ac.in'}
};
app.post('/users',(req,res)=>{
    const { id, name, email }=req.body;
    if(!id || !name || !email){
        return res.status(400).send('Please provide id, name and email');
    }
    if(users[id]) {
        return res.status(400).send('User with this id already exists');
    }
    users[id]={id,name,email};
    res.status(201).send(users[id]);
});
app.get('/users',(req,res)=>{
    res.json(Object.values(users));
});
app.get('/users/:id',(req,res)=>{
    const id=req.params.id;
    const user=users[id];
    if(!user){
        return res.status(404).send('User not found');
    }
    res.json(user);
});
app.delete('/users/:id',(req,res)=>{
    const id=req.params.id;
    if(!users[id]){
        return res.status(404).send('User not found');
    }
    delete users[id];
    res.send(`User with id ${id} deleted successfully`);
});
app.put('/users/:id',(req,res)=>{
    const id=req.params.id;
    const { name, email }=req.body;
    if(!users[id]){
        return res.status(404).send('User not found');
    }
    if(!name || !email){
        return res.status(400).send('Please provide name and email');
    }
    users[id].name=name;
    users[id].email=email;
    res.send(`User with id ${id} updated successfully`);
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});