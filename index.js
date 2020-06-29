const http = require('http');
const express = require('express');
const morgan = require('morgan');
const app = express();
const auth = require('./auth');

// const cookierParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)



app.use(morgan('dev'));
//app.use(cookieParser('abcdef-12345'))

app.use(session({
    name:'session-id',
    secret:'123456xxx',
    saveUninitialized:false,
    resave:false,
    store:new FileStore()
}))


app.get('/', (req, res)=> {
    res.statusCode = 200;
    res.end("Welcome to your express app! \n Making it work  yeah r fd")
})

app.use(auth)
app.get('/secret', (req,res) => {
    res.status = 200;
    res.end("*****");
});

const server = http.createServer(app);

server.listen(3001, 'localhost', ()=>{
    console.log("Server is live at localhost:3001");
})