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
                                    width: 80px;";

        this.x = this.knight.offsetLeft;
        this.y = this.knight.offsetTop;


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

    attack(){
        this.knight.style.background = "url('./img/knight\ 3\ improved\ slash\ animation_big.png') 0px 0px";

        this.animate(10, false);
    }

    
    
}