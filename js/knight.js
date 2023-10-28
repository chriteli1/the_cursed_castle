function knight(position){
    var wr = false, wl = false, j = false, b = false; 

    var knight = document.getElementById('knight');

    knight.style.left = position[0] + "px";
    knight.style.top = position[1] + "px";


    window.onload = setInterval(init, 100);

    /*===check button press===*/
    onkeydown = (event) => {
        
        if (event.key == 'd') {
            wr = true;

        }
        if(event.key == 'a') {
            wl = true;
        }
        if(event.key == 'w') {
            j = true;
        }
        if(event.key == ' ') {
            b = true;
        }
        
    };
    /*========================*/
    

    /*===check button release===*/
    onkeyup = (event) => {
        if (event.key == 'w'){
            j = false;
            jumped = false;
        }
        else if (event.key == 'd'){
            wr = false;
        
        }
        else if (event.key == 'a'){
            wl = false;
        }
        else if (event.key == ' '){
            block_cntr = 0;
            b = false;
        }
        
    };
    /*=============================*/




    var speed = 6, //walking speed
    jump_speed = 9; //jumping speed

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    var bg_position = 0,
    bg_increment = 80,
    bg_offset = 5;


    function animate(sprite_num, once_flag){ //animate with the given sprites(once_flag is to run animation once and stop on the last sprite)

        knight.style.backgroundPosition = -(bg_position + 4*bg_offset) + "px -" + bg_offset + "px";
        
        if (bg_position < (sprite_num-1)*bg_increment)bg_position = bg_position + bg_increment;
        else if(!once_flag) bg_position = 0;
               
    }

    function standing() {
        
        knight.style.background = "url('./img/knight\ 3\ idle_big.png') 0px 0px";
        animate(4, false);
    }


    function walk(dir){
        var direction; // 1 = move right; -1 = move left

        knight.style.background = "url('./img/knight\ walk\ animation_big.png') 0px 0px";


        // direction = (dir == "r") ? 1 : (dir == "l") ? -1 : 0; 

        if(dir == "r"){
            direction = 1;
            knight.classList.remove('flip');
        }
        else if( dir == "l"){
            direction = -1;
            knight.classList.add('flip');
        }
        else direction = 0;

        var leftPos = knight.offsetLeft;            
        
        knight.style.left = (leftPos + speed * direction) + 'px';

        animate(8, false);
    }



    var on_air = false; //flag to check if player is already jumping
    var jumped = false; //flag to check if a jump occured already in a keypress    


    function jump(){
        on_air = true;
        jumped = true;

        var acceleration = 0.85, 
        direction = -1; //it's negative because the position is relative to the top (jumping=getting closer to the top) 

        var topPos;
        topPos = knight.offsetTop,
        bottomPos = topPos + knight.offsetHeight;
        knight.style.top = (topPos + jump_speed * direction) + 'px'; //move upwards with an initial jump_speed

        var initial_speed = jump_speed;

        jumping = setInterval( function(){ //jumping animation
            topPos = knight.offsetTop,
            bottomPos = topPos + knight.offsetHeight;
            jump_speed = jump_speed - acceleration;
            knight.style.top = (topPos + jump_speed * direction) + 'px';

            if(jump_speed <= acceleration) { //stop jumping when jump_speed is (almost) 0

                clearInterval(jumping);
                landing = setInterval( function(){ //landing animation
                    topPos = knight.offsetTop,
                    bottomPos = topPos + knight.offsetHeight;
                    jump_speed = jump_speed + acceleration;
                    knight.style.top = (topPos + jump_speed * (direction * (-1))) + 'px';

                    if(jump_speed >= initial_speed) { //stop moving when speed is equal to initial speed (which happens on the ground because of ideal conditions) 

                        on_air = false;
                        clearInterval(landing);
                    }
                }, 40);
                
            }
        }, 40);

        
        
    }

    
    function block() {
        knight.style.background = "url('./img/knight\ 3\ block_big.png') 0px 0px";

        animate(7, true);

    }

    function init(){ //checks which movement to execute

        if(b) block();
        else if(wr && !wl){
            walk("r");

        }
        else if(wl && !wr){
            walk("l");
        }
        else standing();

        if(j && !on_air && !jumped){
            jump();
        }
        
        

    }
    
}