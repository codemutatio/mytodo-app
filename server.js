import express from 'express';
import next from 'next'
import db from './db/db'


const PORT = process.env.PORT || 3000;    
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
    
app.prepare()
.then(() => { 
  
  const server = express();


  server.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'todos retrieved successfully',
      todos: db
    })
  });
    
  server.get('*', (req, res) => {
    return handle(req, res)
  }) 
    
  server.listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
