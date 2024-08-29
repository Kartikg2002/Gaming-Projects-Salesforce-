({
    doInit: function (component, event, helper) {

        //get game mode 
        const gameMode = component.get("v.mode");
        let column = 0;
        //get number of columns based on game mode
        if (gameMode && gameMode === "hard") {
            column = 6;
        } else if (gameMode === "medium") {
            column = 4;
        }
        else {
            column = 3;
        }
        let blockSize = 12/column;
        component.set("v.blockSize", blockSize);
        //build of list of 100 words
        const words = helper.getWords(column * column);
        component.set("v.words", words);
        //get Win Word
        const winword = helper.getWinWord(words);
        component.set("v.winword", winword);
        //reset the board
        helper.resetBoard(component);
    },

    doRender: function (component, event, helper) {
        console.log("Render is Calling");
    },

    blockClickHandler : function(component, event, helper) {
        let clickCount = component.get("v.clickcount") + 1;
        //get event value
        const value = event.getParam("value");
        if(value===component.get("v.winword")){
            //user won
            component.set("v.result","YOU WIN");
            console.log("YOU WIN");
            helper.disableBoard(component);
            helper.fireResultEvent("WIN");
        }
        else if(clickCount === 3){
            //user lose
            component.set("v.result","YOU LOSE");
            console.log("You Lose");
            helper.disableBoard(component);
            helper.fireResultEvent("LOSE");
        }
        component.set("v.clickcount",clickCount);
    },
    reshuffleBoard : function(component, event, helper){
        const words = component.get("v.words");
        const randomizeWords = helper.randomizeArray(words);
        component.set("v.words",randomizeWords);
        helper.resetBoard(component);
    }
})
