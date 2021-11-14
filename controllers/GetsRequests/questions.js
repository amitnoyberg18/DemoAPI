
const db = require("../../db/db.json")
let CardData = db.data;

const addNexts = ()=>{
    CardData[0].nextCards = ([CardData[1],CardData[5]]);
    CardData[1].nextCards = ([CardData[6],CardData[10],CardData[10],CardData[2]]);
    CardData[2].nextCards = ([CardData[3],CardData[4]]);
    CardData[3].nextCards = ([CardData[4],CardData[11]]);
    CardData[4].nextCards = ([CardData[7],CardData[11]]);
    // CardData[5].nextCards = null;
    // CardData[6].nextCards = null;
    CardData[7].nextCards = ([CardData[8],CardData[9]])
    // CardData[8].nextCards = null;
    // CardData[9].nextCards = null;
    // CardData[10].nextCards = null;
    // CardData[11].nextCards = null;
}
//arr is where you put the most Clicked
//card is The the one
const GetMostClicked = (arr,card)=>{
    if(card.nextCards === undefined){
        return arr;
    }else{
        for (let index = 0; index < card.nextCards.length; index++) {
            if(arr.indexOf(card.nextCards[index]) === -1){
                arr.push(card.nextCards[index]);
            }
            
        }
        for (let index = 0; index < card.nextCards.length; index++) {
            GetMostClicked(arr,card.nextCards[index]);      
        }
    }
}

addNexts();

module.exports = {
    AllData : (req,res)=>{
        res.json(CardData[0]);
    },
    getTheCard: (req,res)=>{
        const id = req.params.CardId;
        const theCard = CardData.find((item)=>item.id === parseInt(id))
        res.json(theCard)
    },
    getMostClickedInTheTree:(req,res)=>{
        let MostClicked =[];

        const id = req.params.CardId;
        CardData.map((item)=>{
            if(item.id === Number(id)){
                GetMostClicked(MostClicked,item);
                MostClicked.sort((a,b)=>Number(b.clicked) - Number(a.clicked));
                let Answer = [];
                MostClicked.map((item)=>{
                    if(item.nextCards === undefined){
                        Answer.push(item)
                    }
                })
                Answer.splice(4,MostClicked.length)
                res.json(Answer);
            }
        })
    },
    getInchargeSelected:(req,res)=>{
        let newArr;
        newArr = CardData.filter((item)=>Boolean(item.InCargeSelcted) === true);
        res.json(newArr);
    },
    getAnswerArray:(req,res)=>{
        let Answer = [];
        CardData.map((item)=>{
            if(item.nextCards === undefined){
                Answer.push(item)
            }
        })
        res.json(Answer);
    },
    getDataArray:(req,res)=>{
        res.json(CardData)
    }
};