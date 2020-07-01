const express = require('express')
const app = express()
const cors = require('cors')
const port = 3003
const bodyParser = require('body-parser');
const knex = require('knex')
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'pgadmin',
    database : 'practice_db'
  }
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/foo', (req, res) => res.send('Hellooo World!'))
app.post('/test', (req, res) => res.send(req.body.name))

app.get('/select', (req,res)=>{
                                db.select().from('members').then(data=>{
                                                                         //console.log(data);
                                                                         res.json(data)
                                                                        })
                                }
        )


app.post('/insert',(req,res)=>{
          db('members').insert({
          name: req.body.name, 
          username:req.body.username, 
          email: req.body.email
        }).then(()=>{res.send('Insertion reussie')})
  });

  app.get('/delete/:id',(req,res)=>{
    db('members')
    .where('member_id', req.params.id)
    .del().then(()=>{})
});

app.post('/update/:id',(req,res)=>{
  db('members')
  .where('member_id', req.params.id)
  .update({
    name:req.body.name,
    username:req.body.username,
    email:req.body.email
  }).then(()=>{res.send("Success!!!")})
});
   


app.listen(port, () => console.log('App is running on port: '+ port))