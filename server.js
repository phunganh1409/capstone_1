import express from 'express';
import sequelize from './src/common/sequelize/connect.sequelize';
import { DataTypes } from 'sequelize';
import root from './src/common/Router/root.router';
import { handleError } from './src/common/helper/error.helper';
import cors from "cors"

const app = express()
// middleware
app.use(express.json());
app.use(cors())
app.use(root)
app.use(handleError)

//npx sequelize-auto -h localhost -d database_capstone -u root -x 1234 -p 3307  --dialect mysql -o src/models -l esm

app.get(`/sequelizeAuto`,(req, res , next )=>{

    res.json()
})
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})


