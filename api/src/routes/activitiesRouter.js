const { Router } = require("express");
const { Country, Tours } = require("../db");
const router = Router();
const {addTourtoCountry} = require("./controllers");

router.post('/', async (req,res) => {
    try{
        const {name,difficulty,duration,season, countries} = req.body;
        if(!name || !difficulty || !duration || !season || !countries){
        res.status(404).json("No se enviaron los datos necesarios");   
        }else{
            await addTourtoCountry(name,difficulty,duration,season, countries);
            res.status(201).send("Se agregó la actividad correctamente");
        }
    }catch(error){
        res.status(404).send(error.message);   
    }
});
   
module.exports = router;