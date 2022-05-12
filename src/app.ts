// import express from 'express';
// import { RequestHandler } from 'express';
// import {sequelize} from "./config/model.config";
// import cors from "cors";
// import routes from './routes/index.route'

// const corsOptions = {
//     origin: `http://localhost:${process.env.PORT}`
//   };
// const app = express();
// app.use(cors(corsOptions));

// app.use(express.json());
// app.use(express.urlencoded({ extended: false}));
// require('dotenv').config();

// app.use('/',routes);


// app.listen(process.env.PORT,()=>{
//     console.log(`Server running on ${process.env.PORT}`)
//     sequelize.authenticate().then(async() => {
//         console.log("database connected");
//         try {
//             await sequelize.sync({ force: true });
//         } catch (error) {
//             console.log(error)
//         }

//     }).catch( (e: any) => {
//         console.log(e.message)
//     })
// });
import { createServer, startServer } from './server'
createServer()
  .then(startServer)
  .catch((error: Error) => {
    console.log(error);
  })