import { Sequelize } from 'sequelize'
import {DATABASE_URL} from '../constant/app.constant'
import initModels from '../../models/init-models.js'


const sequelize = new Sequelize(DATABASE_URL, {logging: false })
export const models = initModels(sequelize)
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
};

export default sequelize