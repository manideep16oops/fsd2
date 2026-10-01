const express=require("express");
    const bodyParser=require('body-parser');
    const path=require('path');
    const app=express();
    app.set('view engine','ejs');
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static(path.join(__dirname,'views')));
    app.get('/',(req,res)=>{
        res.render('index');
    });
    app.post('/submit',(req,res)=>{
        const {name,email,}=req.body;
        res.render('result',{name,email});
    });
    app.listen(5000,()=>{
        console.log('Server is running on port 5000');
    });