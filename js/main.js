function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



$(function game_loop(){

    knight([20, 535]);
    
    
 
    var wizard1 = new Wizard(6,"wizard1", [480, 1200]);
    wizard1.standing();

    
    
    

    setInterval(function() {

        var move_left = setInterval(function() {
            wizard1.move("l");
        }, 70);

        var move_right = null;

        sleep(3000).then(() => { 
            clearInterval(move_left);
            move_right = setInterval(function() {
                wizard1.move("r");
            }, 70);        
        });
        
        
        sleep(6000).then(() => {
            clearInterval(move_right);
        });

    }, 10000);
    


});

    
