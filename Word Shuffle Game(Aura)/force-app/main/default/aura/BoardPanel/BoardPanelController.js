({
    startGame: function(component, event, helper) {
        //access combobox
        let gameModeComboBox = component.find("gameMode");
        //access the value of combobox
        let selectedValue = gameModeComboBox.get("v.value");
        //For Again Call
        const selectedMode = component.get("v.selectedGameMode")
        //update selectMode attribute
        component.set("v.selectedGameMode",selectedValue);

        if(selectedMode != null){
            const boardComp = component.find("boardComp");
            boardComp.startGame();
        }
    },
    reshuffleBoard:function(component,event,helper){
        const boardComp = component.find("boardComp");
        boardComp.reshuffleBoard();
        component.set("v.reshuffleDisabled",true);
    },
    onResultHandler:function(component,event,helper){
        const result = event.getParam("result");
        if(result === "WIN"){
            component.set("v.reshuffleDisabled",true);
            helper.showToast("YOU WIN","HOORAY!!","success");
        }else{
            component.set("v.reshuffleDisabled",false);
            helper.showToast("YOU LOSE","Reshuffle the board for keep playing","error");
        }
        helper.addResultRecord(component,result);
    }
})


















