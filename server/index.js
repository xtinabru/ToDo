require('dotenv').config()

const express = require('express');
const cors = require('cors');
//const { Pool } = require('pg');
const { query } = require('./helpers/db.js')

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const port = process.env.PORT;

app.post("/new", (req, res) =>{
  const pool = openDb()

  pool.query('insert into task (description) values ($1) returning *',
  [req.body.description],
  (error, result) => {
    if (error){
      res.status(500).json({error: error.message})
    } else {
      res.status(200).json({id: result.rows[0].id})
    }
  })
})


app.get('/',(req, res) => {
  const pool = openDb()

  pool.query('select * from task', (error, result) => {
    if (error) {
      res.status(500).json({error: error.message})
    }
    res.status(200).json(result.rows)
  })
})

app.delete("/delete/:id", async(req,res) => {
  const pool = openDb()
  const id = parseInt(req.params.id)
  pool.query('delete from task where id = $1',
  [id],
  (error, result) => {
    if (error) {
      res.status(500).json({error: error.message})
    } else {
      res.status(200).json({id:id})
    }
  })
})

const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  return pool
}

app.listen(port)


