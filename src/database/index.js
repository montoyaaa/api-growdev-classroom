import 'dotenv/config';
import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Class from '../app/models/Class';
import ClassUser from '../app/models/ClassUser';

const models = [User, Class, ClassUser];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(process.env.DB_URL, databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
