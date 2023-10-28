function knight(position){
    var wr = false, wl = false, j = false, b = false; 

    var knight = document.getElementById('knight');

    knight.style.left = position[0] + "px";
    knight.style.top = position[1] + "px";

    var speed = 6, //walking speed
    jump_speed = 9; //jumping speed

    // window.onload = setInterval(init, 170);

    var bg_position = initial_bg_position= 80,
    bg_offset = 5;


    function animate(sprite_num/*, block_flag*/){
        knight.style.backgroundPosition = -(bg_position + 4*bg_offset) + "px -" + bg_offset + "px";
        // console.log(bg_position);
        if (bg_position < sprite_num*initial_bg_position) bg_position = bg_position + initial_bg_position;
        else bg_position = initial_bg_position;
    }

    var standing_Int = null;
    function standing(flag) {
        if(flag){
            standing_Int = setInterval(() => {
                knight.style.background = "url('./img/knight\ 3\ idle_big.png') 0px 0px";
                animate(4/*, false*/);
            }, 230);
        }
        else clearInterval(standing_Int);
    }

    standing(true);

    var walk_right_TO = null;
    function walk_right(flag) {
        if(flag){
            
                knight.style.background = "url('./img/knight\ walk\ animation_big.png') 0px 0px";
                
                var direction = 1; // the box will move by <speed> pixels on every step
                
                knight.classList.remove('flip');
                
                var leftPos = knight.offsetLeft;
                knight.style.left = (leftPos + speed * direction) + 'px';

                animate(8/*, false*/);

            walk_right_TO = setTimeout(function() {
                walk_right(flag);
            }, 70);
        }
        else clearTimeout(walk_right_TO);
    }

    var walk_left_TO = null;
    function walk_left(flag) {
        if(flag){
            
                knight.style.background = "url('./img/knight\ walk\ animation_big.png') 0px 0px";
                
                var direction = -1; // the box will move by <speed> pixels on every step
                
                knight.classList.add('flip');
                
                var leftPos = knight.offsetLeft;
                knight.style.left = (leftPos + speed * direction) + 'px';

                animate(8/*, false*/);

            walk_left_TO = setTimeout(function() {
                walk_left(flag);
            }, 70);
        }
        else clearTimeout(walk_left_TO);
    }



    var on_air = false; //flag to check if player is already jumping
    var jumped = false; //flag to check if a jump occured already in a keypress


    /*===check button press===*/
    onkeydown = (event) => {
        
        if (event.key == 'd') {
            wr = true;

            if(!wl){
                if(event.repeat) return;

                standing(false);
                walk_left(false);
                walk_right(true);
            }

            
        }
        if(event.key == 'a') {
            wl = true;       

            if(!wr){
                if(event.repeat) return; 

                standing(false);
                walk_right(false);
                walk_left(true);
            }
                           
            
        }
        if(event.key == 'w') {
            j = true;
            if(!on_air && !jumped) jump();
        }
        if(event.key == ' ') {
            wl = wr = false;
            b = true;
            if(event.repeat) return; 
            standing(false);
            block(true);

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
            walk_right(false);
            if(!wl)standing(true);
        
        }
        else if (event.key == 'a'){
            wl = false;
            walk_left(false);
            if(!wr)standing(true);
        }
        else if (event.key == ' '){
            b = false;
            block(false);
            standing(true);
        }
        
        
    };
    /*=============================*/

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


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

    // function block(){
    //     var timer = 10;
    //     if (block_cntr == 0){
    //         knight.src="img/knight_block/knight_block1.png";
    //         sleep(timer).then(() => { 
    //             block_cntr = 1;
    //         });

    //     }
    //     else if (block_cntr == 1){
    //         knight.src="img/knight_block/knight_block2.png";
    //         sleep(timer).then(() => { 
    //             block_cntr = 2;
    //         });

    //     }
    //     else if (block_cntr == 2){
    //         knight.src="img/knight_block/knight_block3.png";
    //         sleep(timer).then(() => { 
    //             block_cntr = 3;
    //         });

    //     }
    //     else if (block_cntr == 3) knight.src="img/knight_block/knight_block4.png";
    // }

    var block_TO = null;
    function block(flag) {
        if(flag){
            
                knight.style.background = "url('./img/knight\ 3\ block_big.png') 0px 0px";

                animate(7, true);

            block_TO = setTimeout(function() {
                block(flag);
            }, 70);
        }
        else clearTimeout(block_TO);
    }

    
}