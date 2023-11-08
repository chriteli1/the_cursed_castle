class Knight{

    constructor(position){
        this.wr = this.wl = this.j = this.b = this.att = false; //movement flags
        this.position = position; //spawn position
        

        this.speed = 6, //walking speed
        this.jump_speed = 9; //jumping speed

        this.on_air = false; //flag to check if player is already jumping
        this.jumped = false; //flag to check if a jump occured already in a keypress

        //variables for "animate" method
        this.bg_position = 0;
        this.bg_increment = 80,
        this.bg_offset = 0;

        //"spawn" entity
        this.knight = document.createElement("div");
        this.knight.setAttribute("id", "knight");

        var stage = document.getElementById("stage");
        stage.appendChild(this.knight);

        //set new entity's position and size
        this.knight.style.cssText = "position: absolute; \
                                    top: " + this.position[0] + "px; \
                                    left: " + this.position[1] + "px; \
                                    height: 80px; \
                                    width: 80px;\
                                    border: black 2px solid";

        this.health = 100;
        this.health_bar = document.createElement("div");
        this.health_bar.setAttribute("id", "health");
        this.health_bar.style.cssText = "position: absolute; \
                                        top: -40px; \
                                        height: 32px; \
                                        width: 80px; \
                                        background-size: 100px;";

        this.health_bar.style.background = "no-repeat url('./img/health\ bar.png') 0px 0px/260%";
        
        this.knight.appendChild(this.health_bar);


        // //add hit check area in front of the player (area where if an enemy is in it, an attack will be successfull)                            
        // this.front = document.createElement("div");
        // this.front.setAttribute("id", "knight_front");
        // this.knight.appendChild(this.front);
        // this.front.style.cssText = "position: absolute; \
        //                                    right: 0px; \
        //                                    height: 100%; \
        //                                    width: 20%; \
        //                                    border: black 1px solid;";



        //update entity's coordinates
        setInterval(() => {
            this.x = this.knight.offsetLeft;
            this.y = this.knight.offsetTop;
            this.width = this.knight.offsetWidth;
            this.height = this.knight.offsetHeight;

            // this.front.x = this.front.offsetParent.offsetLeft + this.front.offsetLeft;
            // this.front.y = this.front.offsetParent.offsetTop;
            // this.front.width = this.front.offsetWidth;
            // this.front.height = this.front.offsetHeight;

        }, 70);


    }

    //animate with the given sprites(once_flag is to run animation once and stop on the last sprite)
    animate(sprite_num, once_flag){ 

        // console.log(bg_position);
        this.knight.style.backgroundPosition = -(this.bg_position + 4*this.bg_offset) + "px -" + this.bg_offset + "px";
        
        if (this.bg_position < (sprite_num-1)*this.bg_increment)this.bg_position = this.bg_position + this.bg_increment;
        else if(!once_flag) this.bg_position = 0;
                
    }

    standing(){
        
        this.knight.style.background = "url('./img/knight\ 3\ idle_big.png') 0px 0px";
        this.animate(4, false);
    }


    walk(dir){
        var direction; // 1 = move right; -1 = move left

        this.knight.style.background = "url('./img/knight\ walk\ animation_big.png') 0px 0px";


        // direction = (dir == "r") ? 1 : (dir == "l") ? -1 : 0; 

        if(dir == "r"){
            direction = 1;
            this.knight.classList.remove('flip');
        }
        else if( dir == "l"){
            direction = -1;
            this.knight.classList.add('flip');
        }
        else direction = 0;

        var leftPos = this.knight.offsetLeft;            
        
        this.knight.style.left = (leftPos + this.speed * direction) + 'px';

        this.animate(8, false);
    }    


    jump(){
        this.on_air = true;
        this.jumped = true;

        var jump_speed = this.jump_speed;

        var acceleration = 0.85, 
        direction = -1; //it's negative because the position is relative to the top (jumping=getting closer to the top) 

        var topPos;
        topPos = this.knight.offsetTop,
        this.knight.style.top = (topPos + jump_speed * direction) + 'px'; //move upwards with an initial jump_speed

        var initial_speed = jump_speed;

        var jumping = setInterval(() => { //jumping animation
            topPos = this.knight.offsetTop,
            jump_speed = jump_speed - acceleration;
            this.knight.style.top = (topPos + jump_speed * direction) + 'px';

            if(jump_speed <= acceleration) { //stop jumping when jump_speed is (almost) 0

                clearInterval(jumping);
                var landing = setInterval(() => { //landing animation
                    topPos = this.knight.offsetTop,
                    jump_speed = jump_speed + acceleration;
                    this.knight.style.top = (topPos + jump_speed * (direction * (-1))) + 'px';

                    if(jump_speed >= initial_speed) { //stop moving when speed is equal to initial speed (which happens on the ground because of ideal conditions) 
                        this.on_air = false;

                        clearInterval(landing);
                    }
                }, 40);
                
            }
        }, 40);
   
    }

    
    block() {
        this.knight.style.background = "url('./img/knight\ 3\ block_big.png') 0px 0px";

        this.animate(7, true);

    }

    attack(enemies) {
        this.knight.style.background = "url('./img/knight\ 3\ improved\ slash\ animation_big.png') 0px 0px";

        this.animate(10, false);

        for(let i=0;i<enemies.length;i++){
            if(collision_check(this, enemies[i])) enemies[i].health -= 5;
            // return collision_check(this, enemies[i]);
        }
    }

    
    
}