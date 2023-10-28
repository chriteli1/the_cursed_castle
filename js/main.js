function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// function to check for collision between two objects
function collision_check(entity1, entit2) {
    return (
      entity1.x < entit2.x + entit2.width &&
      entity1.x + entity1.width > entit2.x &&
      entity1.y < entit2.y + entit2.height &&
      entity1.y + entity1.height > entit2.y
    );
  }

function contains(outer_entity, inner_entity){
    return outer_entity.x <= inner_entity.x && inner_entity.x + inner_entity.width <= outer_entity.x + outer_entity.width &&
           outer_entity.y <= inner_entity.y && inner_entity.y + inner_entity.height <= outer_entity.y + outer_entity.height;
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


    setInterval(() => {
        console.log("Collision: ", collision_check(wizard1, knight));
        var stage = document.getElementById("stage");
        stage.width = stage.offsetWidth;
        stage.height = stage.offsetHeight;
        stage.x = stage.offsetLeft;
        stage.y = stage.offsetTop;
        console.log("Out of bounds: ", !contains(stage, knight));
    }, 70);
    

    setInterval(() => {

        var move_left = setInterval(function() {
            wizard1.move("l");
        }, 70);

        var move_right = null;

        sleep(3000).then(() => { 
            clearInterval(move_left);
            move_right = setInterval(() => {
                wizard1.move("r");
            }, 70);        
        });
        
        
        sleep(6000).then(() => {
            clearInterval(move_right);
        });

    }, 10000);


});

    
