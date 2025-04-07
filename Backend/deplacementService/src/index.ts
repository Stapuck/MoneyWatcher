import dotenv from 'dotenv';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors';
import mongoose from 'mongoose'


const app = new Hono()

dotenv.config();
// import  dotenv 

const PORT = Number(process.env.PORT) || 3000;
// import route 


//cors 
app.use('*', cors({
  origin: '*', // Autoriser toutes les origines
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// app.route
app.get('/', (c) => {
  return c.text('Hello deplacement')
})


//mongoose


// mongoose.connect('mongodb+srv://root:root@cluster0.zdnx3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then( () => {
//   console.log('connected to mongodb')
 
//   serve({
//     fetch: app.fetch,
//     port: PORT
//   }, (info) => {
//     console.log(`Server Restaurateur is running on http://localhost:${info.port}`)
//   })
// })


serve({
  fetch: app.fetch,
  port: PORT
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
