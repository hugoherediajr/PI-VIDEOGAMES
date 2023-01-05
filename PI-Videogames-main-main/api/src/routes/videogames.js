const {Router} = require('express')
const {Videogame, Genre, Platform}= require('../db.js')
const {Op} = require('sequelize')
const router = Router()

//'/videogame'

// mainRouter.get('/',()=>{})

// Todos los videogames y por query name...
router.get('/',async (req,res)=>{
 const all = await Videogame.findAll({include: Genre})
    if (req.query.name) {
        try{
            let { name } = req.query
            const found = await Videogame.findAll({
            include: Genre,    
            where: { name: { [Op.iLike]: '%'+name+'%'} },
            })
        
            return res.json(found)
        }
        catch(error){
            console.log(error)
        } 
    }
 res.json(all)
})

router.post('/', async (req,res)=>{
 const {genres, 
  platforms, 
  name, 
  description, 
  released, 
  rating,
  createdInDb} = req.body
  let platformsFormated = platforms && platforms.join(', ');
 const newVideogame = await Videogame.create({
    name,
    description,
    released,
    rating,
    createdInDb,
    platforms: platformsFormated,
 })

 console.log(genres);
genres&&genres.map(
    async (c) => await newVideogame.setGenres(await Genre.findByPk(c))
    )
    res.json(newVideogame)

});

// router.get('/orderbyrating'),(req,res)=>{
  
//     const listar = await Videogame.findAll( {
//         include: Genre,
//         order:["rating","asc"]
        

//     }
//     )
 

// };
  
// Para acceder al detail de videogames
router.get('/:id', async (req, res)=>{
    
      const found = await Videogame.findByPk(req.params.id, 
      {include: Genre})
      
      if (!found) {
              return res.status(404).send('Error: videogame not found')
      }
      
      return res.json(found)
  
  })
  


  module.exports = router