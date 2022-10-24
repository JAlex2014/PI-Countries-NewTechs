const { Router } = require("express");
const {addTourtoCountry,getTourswithCountries,deletetours} = require("./controllers");


const router = Router();
router.get('/', async (req,res) => {
    try{
        const activities = await getTourswithCountries();
        res.status(201).send(activities);
    }catch(error){
        res.status(404).send(error.message);
    }
});
    
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

router.delete('/', async (req,res) => {
    try{
        const {name} = req.body;
        await deletetours(name);
        res.status(201).send("La actividad fue eliminada correctamente");
    }catch(error){
        res.status(404).send("La actividad no pudo ser eliminada"); 
    }
});
   
module.exports = router;