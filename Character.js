import {getDiceRollArray, getDicePlaceholderHtml, getPercentage} from "./utils.js"

function Character(data){

    Object.assign(this, data)
    this.maxHealth = this.health
    
    this.getCharacterHtml = function(){
        const {name, avatar, health, diceCount, diceHtml} = this
        const healthBar = this.getHealthBarHtml()

        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}"/>
                <p class="health">health: <b> ${health} </b></p>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`
    }

    this.setDiceHtml = function(diceCount){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceArray = this.currentDiceScore.map(num =>
            `<div class="dice">${num}</div>`).join("")
    }

    this.diceHtml = getDicePlaceholderHtml(this.diceCount)

    this.getHealthBarHtml = function(){
        const percent = getPercentage(this.health, this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent<26? "danger" : ""} " 
                        style="width: ${percent}%;">
                    </div>
                </div>`
        
    }

    this.takeDamage = function(attackScoreArray){
        const totalDamage = attackScoreArray.reduce((total, num) => total + num)
        
        this.health -= totalDamage

        if(this.health<=0){
            this.health=0
            this.dead = true 
        }
    }  

}

// class Character {
//     constructor(data) {
//         Object.assign(this, data)
//         this.maxHealth = this.health
//         this.diceHtml = getDicePlaceholderHtml(this.diceCount)
//     }

//     setDiceHtml() {
//         this.currentDiceScore = getDiceRollArray(this.diceCount)
//         this.diceHtml = this.currentDiceScore.map((num) =>
//             `<div class="dice">${num}</div>`).join("")
//     }

//     takeDamage(attackScoreArray) {
//         const totalAttackScore = attackScoreArray.reduce((total, num) => total + num)
//         this.health -= totalAttackScore
//         if (this.health <= 0) {
//             this.dead = true
//             this.health = 0
//         }
//     }

//     getHealthBarHtml() {
//         const percent = getPercentage(this.health, this.maxHealth)
//         return `<div class="health-bar-outer">
//                     <div class="health-bar-inner ${percent < 26 ? "danger" : ""}" 
//                             style="width:${percent}%;">
//                     </div>
//                 </div>`
//     }

//     getCharacterHtml() {
//         const { elementId, name, avatar, health, diceCount, diceHtml } = this
//         const healthBar = this.getHealthBarHtml()
//         return `
//             <div class="character-card">
//                 <h4 class="name"> ${name} </h4>
//                 <img class="avatar" src="${avatar}" />
//                 <div class="health">health: <b> ${health} </b></div>
//                 ${healthBar}
//                 <div class="dice-container">
//                     ${diceHtml}
//                 </div>
//             </div>`
//     }
// }

export  default Character