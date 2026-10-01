const express=require('express');
const app=express();
app.use(express.json());
let users={
    1:{id:1201,name:'ucen',email:'1201@ucen.ac.in'},
    2:{id:1202,name:'ucen',email:'1202@ucen.ac.in'}, 
};
app.get('/',(req,res)=>
{
    res.send('WELCOME TO USER API');
});
app.get('/users/',(req,res)=>
{
    const name=req.query.name;
    let result=Object.values(users);
    if(name){
        result=result.filter(user=>user.name.toLocaleLowerCase===name.toLocaleLowerCase());
    }
    res.json(result);
});
app.get('/users/:id',(req,res)=>
{
    const user=users[req.params.id];
    if(user)
    {
        res.json(user);
    }
    else
    {
        res.status(404).send('user not found');
    }   
});
app.get('/build_url/:id',(req,res)=>
{
    const id=req.params.id;
    const fullurl=`${req.protocol}://${req.get('host')}/users/${id}`;
    res.send('user url:${fullurl}');
});
app.listen(5800,()=>
{
    console.log('server is running on http://localhost:5800');  
});       