({
    getWords : function(count) {
        if(count>100) return;
        //build an array 
        let wordsArray = [
            "elephant", "umbrella", "guitar", "castle", "rainbow", "butterfly", "mountain", "fireworks", "whale", "astronaut",
            "carousel", "harmony", "jazz", "dolphin", "galaxy", "robot", "parachute", "volcano", "tornado", "mermaid",
            "treasure", "mystery", "wizard", "unicorn", "dragon", "phoenix", "spaceship", "adventure", "serendipity",
            "whisper", "chocolate", "raindrop", "moonlight", "sunshine", "fairy", "magic", "enchanted", "exploration",
            "discovery", "cinnamon", "marshmallow", "cathedral", "kaleidoscope", "jubilee", "quicksilver", "illusion",
            "cascade", "silhouette", "liberty", "rhapsody", "sapphire", "cascade", "silhouette", "liberty", "rhapsody",
            "sapphire", "cosmos", "nebula", "synergy", "triumph", "paradox", "eclipse", "whirlwind", "solitude", "mystic",
            "dawn", "dusk", "starlight", "firefly", "blossom", "laughter", "giggles", "serenity", "melody", "sunset",
            "magnolia", "infinity", "ripple", "harbor", "trellis", "quasar", "labyrinth", "echo", "saga", "puzzle",
            "crimson", "velvet", "carousel", "whimsical", "paradise", "lagoon", "cascade", "silhouette"
        ];
        //randomize an array
        wordsArray=this.randomizeArray(wordsArray); 
        //open=false property
        const wordsObjArray = wordsArray.map(element =>{
            return{word : element, open : false};
        }); 
        //return requested words
        return wordsObjArray.slice(0,count);

    },
    randomizeArray : function(array){
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    },
    getWinWord:function(array){
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the word at the random index
    return array[randomIndex].word;

    },
    disableBoard : function(component){
        component.set("v.boardDisabled",true);
    },
    enableBoard : function(component){
        component.set("v.boardDisabled",false);
    },
    resetBoard : function(component){
        this.enableBoard(component);
        //reset the counter
        component.set("v.clickcount",0);
        //reset the result
        component.set("v.result","");
    },
    fireResultEvent : function(resultValue){
        const appevent = $A.get("e.c:ResultApplicationEvent");
        appevent.setParams({result : resultValue});
        appevent.fire();
    }
})
