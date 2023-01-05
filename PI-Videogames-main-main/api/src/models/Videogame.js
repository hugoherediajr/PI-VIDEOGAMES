const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//D:\Henry\PI new\PI-Videogames-main\client\src\img\newVideogame.jpg
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { //COMPLETE
      // Use UUID - Diferenciar entre ambas BDD...
    type: DataTypes.STRING,

//    type: DataTypes.UUID,
    defaultValue:DataTypes.UUIDV4,

      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    },
    image: {
      type: DataTypes.STRING,
      defaultValue:'https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f179fc9dc2f763647.jpg',
    },
    released:{ 
      // type: DataTypes.STRING,
      type: DataTypes.DATEONLY,
    },
    rating:{
      type: DataTypes.DECIMAL,
      defaultValue:0,
    },    
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'None',
    },
    createdInDb: { // Que debería hacer con esto
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },{timestamps : false});
};
