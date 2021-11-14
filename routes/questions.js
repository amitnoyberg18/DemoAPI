const express = require('express');
const router = express.Router();
const {
    AllData,
    getTheCard,
    getMostClickedInTheTree,
    getInchargeSelected,
    getDataArray,
    getAnswerArray
} = require("../controllers/GetsRequests/questions");

router.get('/',AllData);//first card
router.get('/TheCard/:CardId',getTheCard);//FA /QA
//gets a cardID and sends back all the FA ordered by most clicked
router.get('/MostClicked/:CardId',getMostClickedInTheTree);
//get all card that ahmash is true
router.get('/InchargeSelected',getInchargeSelected);//

router.get('/dataarray',getDataArray)
router.get('/Answers',getAnswerArray)




module.exports = router;