const express=require('express');
const session=require('express-session');
const bodyParser=require('body-parser');
const app=express();
const port=5600;
const USERS={
    admin: {password: 'admin'},
    user: {password: 'admin@123'}
};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'authsecret',
    resave: false,
    saveUninitialized: true,
})
);
app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`Welcome ${req.session.username}! <br><br> <a href="/dashboard">Dashboard</a> <br><a href="/logout">Logout</a>`);
    } else {
        res.send(`<form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required><br>
            <input type="password" name="password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>`);
}
});

        app.post('/login', (req, res) => {
            const { username, password } = req.body;
            const user = USERS[username];
            if (user && user.password === password) {
                req.session.username = username;
                res.redirect('/');
            }else {
                res.status(401).send(`Invalid credentials. <a href="/">Try again</a>`);
            }
        });
        app.get('/logout', (req, res) => {
            req.session.destroy(()=>{
                res.send(`Logged out successfully. <a href="/">Login again</a>`);
            });
        });
   
    app.get('/dashboard', (req, res) => {
        if (req.session.username) {
            res.send(`This is the dashboard. Welcome ${req.session.username}! <br><br> <a href="/logout">Logout</a>`);
        }else {
            res.status(401).send(`Unauthorized access. <a href="/">Login</a>`);
        }
    });
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });