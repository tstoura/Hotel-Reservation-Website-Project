//Sequelize
// code connecting  Node.js application to the PostgreSQL database
import {Sequelize} from 'sequelize';

const sequelize = new Sequelize({
    host:'localhost',
    port:5432,
    dialect:'postgres',
    username: process.env.POSTGRES_USERNAME|| 'postgres',
    password: process.env.POSTGRES_PASSWORD||'Thanou1098!',
    database:"HotelRes",
    logging: false,
    define:{
        timestamps:false,
        freezeTableName: true
    },
    
});

const testDbConnection = async () => {
      try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
      } catch (error) {
        console.error("Unable to connect to the database:", error);
      }
};



testDbConnection()
export {sequelize}