class CASE_VALUE {
    static VOID = "void";

    static MINE = "mine";
    static BLANK = "blank";
    static BLANK_SHOW = "blank_show";

    static 1="1"; static 2="2"; static 3="3"; static 4="4"; static 5="5"; static 6="6"; static 7="7"; static 8="8";
    static 11="11"; static 12="12"; static 13="13"; static 14="14"; static 15="15"; static 16="16"; static 17="17"; static 18="18";
}

class CASE_VALUE_DISCORD_SMILEY {
    static VOID = "▪️";

    static MINE = "💥";
    static BLANK = "🔳";

    static 1="1️⃣"; static 2="2️⃣"; static 3="3️⃣"; static 4="4️⃣"; static 5="5️⃣"; static 6="6️⃣"; static 7="7️⃣"; static 8="8️⃣";
    static 11="1️⃣"; static 12="2️⃣"; static 13="3️⃣"; static 14="4️⃣"; static 15="5️⃣"; static 16="6️⃣"; static 17="7️⃣"; static 18="8️⃣";
}

class DIFFICULTY {
    static EASY = 5;
    static NORMAL = 10;
    static HARD = 25;
    static EXPERT = 30;
    static EXTREM = 50;
    static GLEBESKEFE = 75;
}

function generate({
    difficulty,
    gridSize,
    hide_brackets=["", ""], 
    show_brackets=["", ""], 
    lineEnd="" /* could be "\n" or "<br />" */
}) {
    var baseGrid = [];
    for(var i = 0; i < gridSize*gridSize; i+=1) { baseGrid[i] = CASE_VALUE.VOID; }

    var finalGrid = baseGrid;
    var linesStr = [];

    for(var i = 0; i < gridSize; i+=1) { linesStr[i] = ""; }

    var maxMines = baseGrid.length*( difficulty/100 );

    addRandomItem(finalGrid, maxMines, CASE_VALUE.MINE);
    searchAroundAndSet(finalGrid, gridSize, CASE_VALUE.VOID, CASE_VALUE.MINE);
    addRandomSpawnPoint(finalGrid, gridSize);
    addRandomSpawnPoint(finalGrid, gridSize);

    for(var i = 0, line = 0; i < finalGrid.length; i+=1) {
        if(i >= line*gridSize+gridSize) { line+=1; }
        linesStr[line] += " "+finalGrid[i]+" ";
    }

    for(var i = 0; i != linesStr.length; i+=1) {
        linesStr[i] = linesStr[i].replace(new RegExp(" "+CASE_VALUE.MINE +" ", "g"), hide_brackets[0]+CASE_VALUE_DISCORD_SMILEY.MINE+hide_brackets[1]);
        linesStr[i] = linesStr[i].replace(new RegExp(" "+CASE_VALUE.BLANK+" ", "g"), hide_brackets[0]+CASE_VALUE_DISCORD_SMILEY.BLANK+hide_brackets[1]);
        linesStr[i] = linesStr[i].replace(new RegExp(" "+CASE_VALUE.BLANK_SHOW+" ", "g"), show_brackets[0]+CASE_VALUE_DISCORD_SMILEY.BLANK+show_brackets[1]);
        for(var r = 1; r < 9; r+=1) {
            linesStr[i] = linesStr[i].replace(new RegExp(" "+CASE_VALUE[r]   +" ", "g"), hide_brackets[0]+CASE_VALUE_DISCORD_SMILEY[r]+hide_brackets[1]);
            linesStr[i] = linesStr[i].replace(new RegExp(" "+CASE_VALUE[r+10]   +" ", "g"), show_brackets[0]+CASE_VALUE_DISCORD_SMILEY[r]+show_brackets[1]);
        }

        linesStr[i] = linesStr[i]+lineEnd;
    }

    var generated = "";
    linesStr.forEach((line) => {
        generated+=line+"\n";
    });

    return generated;
}

//

function getRandom(min, max) {
    return Math.round(Math.random() * (max - min +1) + min);
}

function addRandomItem(grid, maxItems, itemValue, excludedValues=[]) {
    for(var i = 0; i < maxItems; i+=1) {
        while(true) {
            var itemPos = getRandom(0, grid.length-1);
    
            if(!excludedValues.includes(grid[itemPos]) && grid[itemPos] != itemValue) {
                grid[itemPos] = itemValue;
                break;
            }
        }
    }
    return grid;
}

function searchAroundAndSet(grid, gridSize, aroundItem, searchedItem, replaceValueByCount=[CASE_VALUE.BLANK, CASE_VALUE[1], CASE_VALUE[2], CASE_VALUE[3], CASE_VALUE[4], CASE_VALUE[5], CASE_VALUE[6], CASE_VALUE[7], CASE_VALUE[8]]) {
    for(var i = 0; i < grid.length; i+=1) {
        var item = grid[i];

        var lineUpPos = i-gridSize >= 0 ? i-gridSize : null;
        var currentLinePos = i >= 0 ? i : null;
        var lineDownPos = i+gridSize <= 399 ? i+gridSize : null;

        var searchedItemCount = 0;
        if(item == aroundItem) {
            for(var r = -1; r < 2; r+=1) {
                if(lineUpPos != null && lineUpPos != undefined) {
                    if(grid[lineUpPos+r] == searchedItem && getLineNumber(lineUpPos+r) == getLineNumber(lineUpPos)) { searchedItemCount+=1; foundSearchedItem = true; }
                }
                if(currentLinePos != null && currentLinePos != undefined) {
                    if(grid[currentLinePos+r] == searchedItem && getLineNumber(currentLinePos+r) == getLineNumber(currentLinePos)) { searchedItemCount+=1; foundSearchedItem = true; }
                }
                if(lineDownPos != null && lineDownPos != undefined) {
                    if(grid[lineDownPos+r] == searchedItem && getLineNumber(lineDownPos+r) == getLineNumber(lineDownPos)) { searchedItemCount+=1; foundSearchedItem = true; }
                }
            }
            if(replaceValueByCount[searchedItemCount]) { grid[i] = replaceValueByCount[searchedItemCount]; }
        }
    }
    return grid;
}

function addRandomSpawnPoint(grid, gridSize, allowedValues=[CASE_VALUE.BLANK, CASE_VALUE[1], CASE_VALUE[2], CASE_VALUE[3], CASE_VALUE[4], CASE_VALUE[5], CASE_VALUE[6], CASE_VALUE[7], CASE_VALUE[8]], excludedValues=[CASE_VALUE.MINE, CASE_VALUE.VOID]) {
    var randomPoint = getRandom(0, grid.length-1);

    var item = grid[randomPoint];

    var lineUpPos = randomPoint-gridSize >= 0 ? randomPoint-gridSize : null;
    var currentLinePos = randomPoint >= 0 ? randomPoint : null;
    var lineDownPos = randomPoint+gridSize <= gridSize*gridSize ? randomPoint+gridSize : null;

    if(!excludedValues.includes(item) && allowedValues.includes(item)) {
        for(var r = -1; r < 2; r+=1) {
            if(lineUpPos != null && lineUpPos != undefined) {
                if(!excludedValues.includes(grid[lineUpPos+r]) && allowedValues.includes(grid[lineUpPos+r]) && getLineNumber(lineUpPos+r) == getLineNumber(lineUpPos)) {
                    if(grid[lineUpPos+r] == CASE_VALUE.BLANK) {
                        grid[lineUpPos+r] = CASE_VALUE.BLANK_SHOW;
                    }
                    else if(parseInt(grid[lineUpPos+r]) != NaN) {
                        grid[lineUpPos+r] = (parseInt(grid[lineUpPos+r])+10)+"";
                    }
                }
            }
            if(currentLinePos != null && currentLinePos != undefined) {
                if(!excludedValues.includes(grid[currentLinePos+r]) && allowedValues.includes(grid[currentLinePos+r]) && getLineNumber(currentLinePos+r) == getLineNumber(currentLinePos)) {
                    if(grid[currentLinePos+r] == CASE_VALUE.BLANK) {
                        grid[currentLinePos+r] = CASE_VALUE.BLANK_SHOW;
                    }
                    else if(parseInt(grid[currentLinePos+r]) != NaN) {
                        grid[currentLinePos+r] = (parseInt(grid[currentLinePos+r])+10)+"";
                    }
                }
            }
            if(lineDownPos != null && lineDownPos != undefined) {
                if(!excludedValues.includes(grid[lineDownPos+r]) && allowedValues.includes(grid[lineDownPos+r]) && getLineNumber(lineDownPos+r) == getLineNumber(lineDownPos)) {
                    if(grid[lineDownPos+r] == CASE_VALUE.BLANK) {
                        grid[lineDownPos+r] = CASE_VALUE.BLANK_SHOW;
                    }
                    else if(parseInt(grid[lineDownPos+r]) != NaN) {
                        grid[lineDownPos+r] = (parseInt(grid[lineDownPos+r])+10)+"";
                    }
                }
            }
        }
    }
    else {
        return addRandomSpawnPoint(grid, gridSize, allowedValues, excludedValues);
    }
}

function getLineNumber(pos, gridSize) {
    for(var i = 0; i <= gridSize; i+=1) {
        if(pos >= gridSize*i && pos < gridSize*(i+1)) {
            return i;
        }
    }
}

//


//

class MinesWeeper {
    static generate = generate;
    static DIFFICULTY = DIFFICULTY;
    static getRandom = getRandom;
    // {node-block}=
    static createWebLib = createWebLib;
    // ={node-block}
}

// {node-block}=
const fs = require("fs");
const path = require("path");
const { parse } = require("path");
function createWebLib() {
    var nodeLibContent = fs.readFileSync(__filename).toString("utf8");
    var nodeLibFileName = path.basename(__filename);
    var webLibFileName = nodeLibFileName.substring(0, nodeLibFileName.length-path.extname(__filename).length)+".weblib.js";
    var webLibContent = nodeLibContent.replace(/\/\/ {node-block}=/g, "\/\* {node-block}=").replace(/\/\/ ={node-block}/g, "={node-block} \*\/");
    fs.writeFileSync(path.join(__dirname, webLibFileName), webLibContent);
}

module.exports = MinesWeeper
// ={node-block}