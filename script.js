const KMRJ_R = [
    'mu', 'su', 'me', 'fu', 'sa', 'ho', 'se', 
    'uka', 'ura', 'tsuku', 'tsuki', 'shira', 'shino', 'momo', 'moro', 'yura', 'yuu',
    'ini', 'imako', 'imawa', 'chiha', 'chigiriki', 'chigirio', 'hisa', 'hitomo', 'hitowa', 'kiri', 'kimigatameo', 'kimigatameha', 
    'hanasa', 'hanano', 'haruno', 'harusu', 'yamaga', 'yamaza', 'yae', 'yasu', 'yononakayo', 'yononakawa', 'yomo', 'yoo', 'kasa', 'kaku', 'kazeo', 'kazeso',
    'mikaki', 'mikano', 'mise', 'miyo', 'michi',
    'taka', 'taki', 'tachi', 'tare', 'tago', 'tama',
    'kokoroa', 'kokoroni', 'konu', 'kono', 'kore', 'koi',
    'ooke', 'ooko', 'ooe', 'oku', 'ogu', 'oto', 'omo',
    'wagai', 'wagaso', 'wasura', 'wasure', 'watanoharako', 'watanoharaya', 'wabi',
    'nagaka', 'nagara', 'nageki', 'nageke', 'naniwaga', 'naniwae', 'nanishi', 'natsu',
    'akino', 'akika', 'aria', 'arima', 'araza', 'arashi', 'awaji', 'aware', 'amatsu', 'amano', 'asaborakea', 'asaborakeu', 'asaji', 'ashi', 'ake', 'ai'

];

const KMRJ_H = [
    "む", "す", "め", "ふ", "さ", "ほ", "せ",
    'うか', 'うら', 'つく', 'つき', 'しら', 'しの', 'もも', 'もろ', 'ゆら', 'ゆう'
];

var cardList = [
    [ ['mu', 'su', 'me', 'fu', 'sa'], ['ho', 'se', 'ura', 'uka'] ],
    [ ['tsuku', 'tsuki', 'shira', 'shino'], ['momo', 'moro', 'yura', 'yuu'] ],
    [ ['akika', 'akino', 'araza', 'arashi'], ['ooke', 'ooko', 'ooe', 'oku', 'watanoharako'] ]
];

function mergeCardList(cardList) {
    let mergedList = [];
    
    for (let i = 0; i < cardList.length; i++) {
        for (let j = 0; j < cardList[i].length; j++) {
            mergedList = mergedList.concat(cardList[i][j]);
        }
    }
    
    return mergedList;
}

var mergedList = mergeCardList(cardList);


////________ TERRITORY PREP

function createCardRow() {
    let terri = document.getElementById("territory");

    for(let i=0;i<3;i++) {
        let row = document.createElement("div");
        row.classList.add("card-row");

        for(let j=0;j<2;j++) {
            let col = document.createElement("div");
            col.classList.add("col");
            if(j===0) {
                col.classList.add("left");
            }
            else {
                col.classList.add("right");
            }
    
            for(let k=0;k<cardList[i][j].length;k++) {
           
                let card = document.createElement("div");
                card.classList.add("card");
                card.classList.add("visible");
                card.id = "card"+i+j+k;

                card.style.backgroundImage = "url(/front_card/" + cardList[i][j][k] + ".jpg)";
                card.innerText = cardList[i][j][k];

                col.appendChild(card);
            }
            row.appendChild(col);
        }
        terri.appendChild(row);
    }
}

createCardRow();

let startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);


////________ START PICKING CARD

var kimariji = document.getElementById("kimariji");
var k_index = 0;
var gameOver = false;
kimariji.innerText = KMRJ_R[0];

var deadCardButton = document.getElementById("dead-card-button");

function startGame() {

    //add event listener for all cards
    //(WIP) add animation flip back
    for(let i=0;i<3;i++) {
        for(let j=0;j<2;j++) {
            for(let k=0;k<cardList[i][j].length;k++) {
                let card = document.getElementById("card"+i+j+k);
                card.style.backgroundImage = "none";
                card.classList.remove("visible");
                card.addEventListener("click", function() {
                    handleCardClick(card);
                });
            }
        }
    }

    deadCardButton.addEventListener("click", handleDeadCard);

}

function handleDeadCard() {
    if(gameOver) return;

    if(!mergedList.includes(kimariji.innerText.toLowerCase())) {
        console.log("correct");
        nextKimariji();
    }
    else {
        console.log("wrong");
    }
}

function handleCardClick(card) {

    if(gameOver) return;
    
    //console.log(kimariji)
    if(card.innerText === kimariji.innerText.toLocaleLowerCase()) {
        console.log("correct");
        card.style.backgroundImage = "url(/front_card/" + kimariji.innerText + ".jpg)";
        card.classList.add("visible");
        nextKimariji();
    }
    else {
        console.log("wrong");
    }
}

function nextKimariji() {
    k_index++;

    if(k_index >= 100) {
        alert("finish");
        gameOver = true;
    }
    else {
        kimariji.innerText = KMRJ_R[k_index];
    }
}