const express=require('express');
const session=require('express-session');
const cookieParser=require('cookie-parser');

const app=express();
const port=4500;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}));
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome back, ${req.session.username}! <br><br><a href="/logout">Logout</a>`);
    } else {
     
        res.send(`<form method="POST" action="/login"><input type="text" name="username" placeholder="Enter your username" required><button type="submit">Login</button></form>`);
    }
});
app.post('/login', (req, res) => {
    const { username } = req.body;
    req.session.username = username;
    res.redirect('/');
});
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('You have been logged out. <br><br><a href="/">Login again</a>');
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});