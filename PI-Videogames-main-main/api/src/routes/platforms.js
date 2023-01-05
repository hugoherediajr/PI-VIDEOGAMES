const {Router} = require('express')
const {Videogame, Genre, Platform}= require('../db.js')
const {Op} = require('sequelize')
const router = Router()


router.get('/',async (req, res)=>{
    const toall = await Platform.findAll();
    if (req.query.name) {
        try{
            let { name } = req.query
            const found = await Platform.findAll({
            where: { name: { [Op.iLike]: '%'+name+'%'} },
            })
        
            return res.json(found)
        }
        catch(error){
            console.log(error)
        } 
    }
    return res.json(toall);
//    res.json(all);
});


module.exports = router;