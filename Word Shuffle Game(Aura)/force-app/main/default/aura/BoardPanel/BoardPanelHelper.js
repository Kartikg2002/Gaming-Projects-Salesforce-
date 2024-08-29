({
    addResultRecord : function(component,gameResult) {
        const modeValue = component.get("v.selectedGameMode").toUpperCase();
        // create apex method call action
        const action = component.get("c.addResult");
        // set the method parameters
        action.setParams({result : gameResult,mode : modeValue});
        // set the callback
        action.setCallback(this,function(response){
            const state = response.getState();
            if(state !== "SUCCESS"){
                console.log("ERROR IN SAVING RECORD");
            }
        });
        // call apex method
        $A.enqueueAction(action);
    },
    showToast : function(titleValue,messageValue,typeValue) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title" : titleValue,
            "message": messageValue,
            "type": typeValue
        });
        toastEvent.fire();
    }
})
