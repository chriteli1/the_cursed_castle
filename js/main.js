function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


$(function game_loop(){



    var knight = new Knight([535, 20]);

    /*===check button press===*/
    onkeydown = (event) => {
        
        if (event.key == 'd') {
            knight.wr = true;

        }
        if(event.key == 'a') {
            knight.wl = true;
        }
        if(event.key == 'w') {
            knight.j = true;
        }
        if(event.key == ' ') {
            knight.b = true;
        }
        if(event.key == 'p') {
            knight.att = true;
        }
        
    };
    /*========================*/
    

    /*===check button release===*/
    onkeyup = (event) => {
        if (event.key == 'w'){
            knight.j = false;
            knight.jumped = false;
        }
        if (event.key == 'd'){
            knight.wr = false;
        
        }
        if (event.key == 'a'){
            knight.wl = false;
        }
        if (event.key == ' '){
            knight.b = false;
        }
        if(event.key == 'p') {
            knight.att = false;
        }

        
    };
    /*=============================*/
    
    
    setInterval(() => {
        if(knight.b) knight.block();
        else {
            if(!knight.att){
                if(knight.wr && !knight.wl) knight.walk("r");
                else if(knight.wl && !knight.wr) knight.walk("l");
                else knight.standing();
            }
            else knight.attack();
        }
        if(knight.j && !knight.on_air && !knight.jumped){
            knight.jump();
        }
    }, 100);


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

    
