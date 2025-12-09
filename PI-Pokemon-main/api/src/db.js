require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = process.env.NODE_ENV === 'production'
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    })
  : new Sequelize(
      `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/onlypan`,
      {
        logging: false,
        native: false
      }
    );

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los modelos
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyectamos sequelize a los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos modelos
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Relaciones
const { Pokemon, Type } = sequelize.models;

Pokemon.belongsToMany(Type, { through: 'Pokemon-type' });
Type.belongsToMany(Pokemon, { through: 'Pokemon-type' });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
