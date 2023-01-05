const {Router} = require('express')
const {Videogame, Genre, Platform}= require('../db.js')
const {Op} = require('sequelize')
const router = Router()


router.get('/all',async (req, res)=>{
    const toall = await Genre.findAll();
    if (req.query.name) {
        try{
            let { name } = req.query
            const found = await Genre.findAll({
            where: { name: { [Op.iLike]: '%'+name+'%'} },
            })
        
            return res.json(found)
        }
        catch(error){
            console.log(error)
        } 
    }
    return res.json(toall)


//    res.json(all);
});


module.exports = router;