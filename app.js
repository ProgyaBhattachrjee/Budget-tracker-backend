require('dotenv').config()
let express = require('express')
let cors = require('cors')
const { db } = require('./db/db')
const path = require('path')
const fs = require('fs')
let app = express()
//middleware
app.use(express.json())
app.use(cors())
//router
const routesDir = path.join(__dirname, 'routes');
fs.readdirSync(routesDir).forEach((file) => {
    const routePath = path.join(routesDir, file);
    const routeModule = require(routePath);
    if (typeof routeModule === 'function') {
      app.use('/api/v1', routeModule);
    } else if (typeof routeModule.default === 'function') {
      app.use('/api/v1', routeModule.default);
    } else {
      console.error(`Invalid route module: ${routePath}`);
    }
  });


let p = process.env.PORT
const server = ()=>{
    db()
   app.listen(p,()=>{
    console.log(p)
   })
}

server();