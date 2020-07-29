var express= require('express')
var app= express()
var mongojs= require('mongojs')
var db= mongojs('contacts',['contacts'])
var bodyParser= require('body-parser')

// app.get('/', (req, res)=>{
//    res.send("hello from server.js")
// });

app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json())

app.get('/list',(req,res)=>{
    console.log("I received a GET request.")
    
    db.contacts.find((err, docs)=>{
        res.json(docs)
    })
})

app.post('/list', (req, res)=>{
    db.contacts.insert(req.body, (err, docs)=>{
        res.json(docs)
    })
})

app.delete('/list/:id', (req, res)=>{
    var id= req.params.id;
    db.contacts.remove({_id: mongojs.ObjectId(id)}, (err,docs)=>{
        res.json(docs)
    })
})

app.get('/list/:id', (req, res)=>{
    var id= req.params.id;
    db.contacts.findOne({_id: mongojs.ObjectId(id)}, (err,docs)=>{
        res.json(docs)
    })
})

app.put('/list/:id', (req, res)=>{
    var id= req.params.id;
    db.contacts.findAndModify({query:{_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}}, 
    new: true }, (err,docs)=>{
        res.json(docs)
        console.log(docs)
    })
})

 app.listen(3000)
 console.log("server is running port 3000")