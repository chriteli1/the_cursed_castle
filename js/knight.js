function knight(){
    var s = true, wr = false, wl = false, j = false, b = false; 

    var knight = document.getElementById('knight');

    knight.style.left = "10px";
    knight.style.top = "545px";


    window.onload = setInterval(init, 70);

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

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    var stnd_cntr = 0; //counter for standing animation
    var walk_cntr = 0; //counter for walking animation
    var block_cntr = 0; //counter for blocking animation

    function standing(){
        var timer = 220;

        if(stnd_cntr == 0){
            knight.src='img/knight_standing/knight_standing2.png';
            sleep(timer).then(() => { 
                stnd_cntr = 1;
            });
        }
        else if(stnd_cntr == 1){
            knight.src='img/knight_standing/knight_standing3.png';
            sleep(timer).then(() => {
                stnd_cntr = 2;
            });
        }
        else if(stnd_cntr == 2){
            knight.src="img/knight_standing/knight_standing4.png";
            sleep(timer).then(() => { 
                stnd_cntr = 0;
            });
        }
            
    }

    function walkRight(){
        var speed = 6, // the box will move by <speed> pixels on every step
        direction = 1; // 1 = move right; -1 = move left
        var i =0;
        var leftPos;
        
        walkAnim();
        
        leftPos = knight.offsetLeft,
        rightPos = leftPos + knight.offsetWidth;
        knight.style.left = (leftPos + speed * direction) + 'px';
            
    }


    function walkLeft(){


        var speed = 6, // the box will move by <speed> pixels on every step
        direction = -1; // 1 = move right; -1 = move left

        var leftPos = knight.offsetLeft,
            rightPos = leftPos + knight.offsetWidth;
            
        
        knight.style.left = (leftPos + speed * direction) + 'px';

        walkAnim();

        
    }

    function walkAnim(){
        var timer = 50;
        
        
        if(walk_cntr == 0){
            knight.src='img/knight_walking/knight_walking1.png';
            sleep(timer).then(() => { 
                walk_cntr = 1;
            });
        }
        else if(walk_cntr == 1){
            knight.src='img/knight_walking/knight_walking2.png';
            sleep(timer).then(() => { 
                walk_cntr = 2;
            });
        }
        else if(walk_cntr == 2){
            knight.src='img/knight_walking/knight_walking3.png';
            sleep(timer).then(() => {
                walk_cntr = 3;
            });
        }
        else if(walk_cntr == 3){
            knight.src="img/knight_walking/knight_walking4.png";
            sleep(timer).then(() => { 
                walk_cntr = 4;
            });
        }
        else if(walk_cntr == 4){
            knight.src="img/knight_walking/knight_walking5.png";
            sleep(timer).then(() => { 
                walk_cntr = 5;
            });
        }
        else if(walk_cntr == 5){
            knight.src="img/knight_walking/knight_walking6.png";
            sleep(timer).then(() => { 
                walk_cntr = 6;
            });
        }
        else if(walk_cntr == 6){
            knight.src="img/knight_walking/knight_walking7.png";
            sleep(timer).then(() => { 
                walk_cntr = 7;
            });
        }
        else if(walk_cntr == 7){
            knight.src="img/knight_walking/knight_walking8.png";
            sleep(timer).then(() => { 
                walk_cntr = 0;
            });
        }
        else{
            knight.src="img/knight_walking/knight_walking1.png";
            sleep(timer).then(() => { 
                walk_cntr = 0;
            });
        }
        
    }

    var jumped = false; //flag to check if a jump occured already in a keypress

    function jump(){
        on_air = true;
        jumped = true;

        var speed = 8,
        acceleration = 0.85, 
        direction = -1; //it's negative because the position is relative to the top (jumping=getting closer to the top) 

        var topPos;
        topPos = knight.offsetTop,
        bottomPos = topPos + knight.offsetHeight;
        knight.style.top = (topPos + speed * direction) + 'px'; //move upwards with an initial speed

        var initial_speed = speed;

        jumping = setInterval( function(){ //jumping animation
            topPos = knight.offsetTop,
            bottomPos = topPos + knight.offsetHeight;
            speed = speed - acceleration;
            knight.style.top = (topPos + speed * direction) + 'px';

            if(speed <= acceleration) { //stop jumping when speed is (almost) 0

                clearInterval(jumping);
                landing = setInterval( function(){ //landing animation
                    topPos = knight.offsetTop,
                    bottomPos = topPos + knight.offsetHeight;
                    speed = speed + acceleration;
                    knight.style.top = (topPos + speed * (direction * (-1))) + 'px';

                    if(speed >= initial_speed) { //stop moving when speed is equal to initial speed (which happens on the ground because of ideal conditions) 

                        on_air = false;
                        clearInterval(landing);
                    }
                }, 50);
                
            }
        }, 50);

        
        
    }

    function block(){
        var timer = 10;
        if (block_cntr == 0){
            knight.src="img/knight_block/knight_block1.png";
            sleep(timer).then(() => { 
                block_cntr = 1;
            });

        }
        else if (block_cntr == 1){
            knight.src="img/knight_block/knight_block2.png";
            sleep(timer).then(() => { 
                block_cntr = 2;
            });

        }
        else if (block_cntr == 2){
            knight.src="img/knight_block/knight_block3.png";
            sleep(timer).then(() => { 
                block_cntr = 3;
            });

        }
        else if (block_cntr == 3) knight.src="img/knight_block/knight_block4.png";
    }

    var on_air = false;

    function init(){

        if(b) block();
        else if(wr && !wl){
            knight.classList.remove('knight_flip');
            walkRight();

        }
        else if(wl && !wr){
            knight.classList.add('knight_flip');
            walkLeft();
        }
        else standing();

        if(j && !on_air && !jumped){
            jump();
        }
        
        

    }
}