const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() =>{
   return  new Date().getFullYear();
});



app.set('view engine','hbs');


let fn = express.static(__dirname + '/public');

app.use(fn);
app.use((req,res,next)=>{
    const date = new Date().toString();
    let logMsg = `${date}: ${req.method} ${req.url}`;
    console.log(logMsg);
    fs.appendFile('server.log',logMsg + "\n",(err)=>{
        console.log('unable to write to file: ',err);
    });
    next();
});

app.get('/',(req,res)=>{
    res.render("home.hbs",{
        pageTitle:'Home page',
        welcomeMessage: 'Hello Orr'
    })
});

app.get('/about',(req,res)=>{
    res.render("about.hbs",{
        pageTitle:'About page',
    })
});



app.listen(port,()=>{
    console.log(`Server is up on port: ${port}`);
});


