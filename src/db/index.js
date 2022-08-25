import Sequelize from "sequelize";

export default function connectToBD(){
    
    const PASSWORD_USER = "Pa$$w0rd"
    const USERNAME = "user"
    const DATABASE = "brisq"
    const HOST = "db_brisq:3306"

    const url = "mariadb://" + USERNAME + ":" + PASSWORD_USER + "@" + HOST + "/" + DATABASE;

    const sequelized = new Sequelized(DATABASE, USERNAME, PASSWORD_USER, {
        host: HOST,
        dialect: 'mariadb'
      });

    return sequelized.authenticate();
}