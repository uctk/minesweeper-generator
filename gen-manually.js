const fs = require("fs");

var generator = require("./minesweeper-generator");
generator.createWebLib();

var difficulty = generator.DIFFICULTY.NORMAL;

var discordGameGrid = generator.generate({
    difficulty: difficulty,
    gridSize: 12,
    hide_brackets: ["||", "||"]});

function rngL() { return generator.getRandom(0, 9); }

var randomId = ""+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL()+rngL();

var htmlGameGrid = generator.generate({
    difficulty: difficulty,
    gridSize: 12,
    hide_brackets: [`<div id=\"mw_hide_${randomId}\" style=\"display: inline-block; margin: 0; width: 22px; height: 22px; cursor: pointer; border: 1px #000 solid; color: transparent;\" onclick=\"this.style.color = ''; if(this.innerHTML == '💥') {alert('BOUM 💥 ! Perdu.'); document.querySelectorAll('div#mw_hide_${randomId}').forEach((mscase) => {mscase.style.color = '';});}\">`, `</div>`],
    show_brackets: [`<div style=\"display: inline-block; margin: 0; width: 22px; height: 22px; cursor: default; border: 1px #000 solid;\">`, `</div>`],
    lineEnd: "<br />"
});

var gameInfo = `
Discord Grid :

> **Minesweeper**
> __Difficulty :__ _\`${getDifficultyName(difficulty)}\`_ | __Mines :__ _\`${difficulty}% of grid\`_
> 
> Grid :
> ${discordGameGrid.replace(/\n/g, "\n> ")}
> 
> Correction :
> ||${discordGameGrid.replace(/\|\|/g, "").replace(/\n/g, "\n> ")}||




HTML Grid : 

${htmlGameGrid}`;
fs.writeFileSync("./generated.txt", gameInfo);

function getDifficultyName(difficulty) {
    if(difficulty <= generator.DIFFICULTY.EASY) {
        return "easy";
    }
    else if(difficulty > generator.DIFFICULTY.EASY && difficulty <= generator.DIFFICULTY.NORMAL) {
        return "normal";
    }
    else if(difficulty > generator.DIFFICULTY.NORMAL && difficulty <= generator.DIFFICULTY.HARD) {
        return "hard";
    }
    else if(difficulty > generator.DIFFICULTY.HARD && difficulty <= generator.DIFFICULTY.EXPERT) {
        return "expert";
    }
    else if(difficulty > generator.DIFFICULTY.EXPERT && difficulty <= generator.DIFFICULTY.EXTREM) {
        return "extrem";
    }
    else if(difficulty > generator.DIFFICULTY.GLEBESKEFE && difficulty <= generator.DIFFICULTY.GLEBESKEFE) {
        return "glebeskefe";
    }
}