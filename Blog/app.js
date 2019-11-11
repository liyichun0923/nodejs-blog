const express = require("express"),
      bodyParser = require("body-parser"),
      data = require("./data.json"),
      path = require("path");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/list/', (req, res, next) => {
    login = false;
    for (let i = 0; i < data.users.length; i++) {
        if (data.users[i].username == req.body.username && data.users[i].password == req.body.pwd)
                login = true;
    }
    if (login) {
        next();
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });
        res.end("您输入的用户名或密码错误!");
    }

});

app.get('/', (req,res) => {
    res.type('text/html');
    res.status(200);
    res.sendfile(`${__dirname}/public/login.html`)
});

app.get('/list3/', (req,res) => {
    res.type('text/html');
    res.status(200);
    res.json(data.chapterList);
});

app.post('/list/', (req,res) => {
    res.type('text/html');
    res.status(200);
    res.sendfile(`${__dirname}/public/list.html`)
});

app.listen(3000);
