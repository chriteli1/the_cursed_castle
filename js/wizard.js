class Wizard {
    constructor(speed, id, position){
        this.speed = speed;
        this.position = position; //initial entity's position
        this.id = id; //id to give the html element
        this.stnd_cntr = 0; //counter for standing animation

        //variables for "animate" method
        this.bg_position = 0;
        this.bg_increment = 130,
        this.bg_offset = 0;

        //"spawn" entity
        this.html_entity = document.createElement("div");
        this.html_entity.setAttribute("id", id);
        

        var stage = document.getElementById("stage");
        stage.appendChild(this.html_entity);

        //set new entity's position and size
        this.html_entity.style.cssText = "position: absolute; \
                                    top: " + this.position[0] + "px; \
                                    left: " + this.position[1] + "px; \
                                    height: 130px; width: 130px; \
                                    border: black 2px solid";


        this.health = 100;
        // this.health_bar = document.createElement("div");
        // this.health_bar.setAttribute("id", "health");
        // this.health_bar.style.cssText = "position: absolute; \
        //                                 top: -40px; \
        //                                 height: 32px; \
        //                                 width: 80px; \
        //                                 background-size: 100px;";

        // this.health_bar.style.background = "no-repeat url('./img/health\ bar.png') 0px 0px/260%";
        
        // new_div.appendChild(this.health_bar);


        //update entity's coordinates
        setInterval(() => {
            this.x = this.html_entity.offsetLeft;
            this.y = this.html_entity.offsetTop;
            this.width = this.html_entity.offsetWidth;
            this.height = this.html_entity.offsetHeight;
        }, 70);
                
    }

    /*animate with the given sprites(once_flag is to run animation once and stop on the last sprite, 
    repeat is an integer that tels the animation to run once and then repeat a part of the animation
    from <last sprite> - repeat to <last sprite> continously)*/
    animate(sprite_num, once_flag, repeat){ 

        // console.log(this.bg_position);
        this.html_entity.style.backgroundPosition = -(this.bg_position + 4*this.bg_offset) + "px -" + this.bg_offset + "px";
        
        if (this.bg_position < (sprite_num-1)*this.bg_increment) this.bg_position = this.bg_position + this.bg_increment;
        else if (!once_flag) {
            if (!repeat) this.bg_position = 0;
            else  this.bg_position = this.bg_position - repeat*this.bg_increment;
        }
                
    }

    standing(){
        
        this.html_entity.style.background = "url('./img/wizard\ idle.png') 0px 0px";
        this.animate(10, false, 2);
    }


    move(dir){

        this.html_entity.style.background = "url('./img/wizard\ fly\ forward.png') 0px 0px";

        // var direction = (dir == "r") ? 1 : (dir == "l") ? -1 : 0; // 1 = move right; -1 = move left
        var direction;
        if(dir == "r"){
            direction = 1;
            this.html_entity.classList.add('flip');
        }
        else if( dir == "l"){
            direction = -1;
            this.html_entity.classList.remove('flip');
        }
        else direction = 0;

        var leftPos = this.html_entity.offsetLeft;
        this.html_entity.style.left = (leftPos + this.speed * direction) + 'px';

        this.animate(6, false, 1);
        
    }


    attack() {
        this.html_entity.style.background = "url('./img/wizard\ attack.png') 0px 0px";

        this.animate(10, true, 0);

        var fireball = document.createElement("div");
        fireball.setAttribute("id", this.id + "_fireball" + Math.floor(Math.random()*10));


        var stage = document.getElementById("stage");
        stage.appendChild(fireball);


        var fireball_position_x = this.x - 30,
        fireball_position_y = this.y + 10;
        fireball.style.cssText = "position: absolute; \
                                  top: " + fireball_position_y + "px; \
                                  left: " + fireball_position_x + "px;  \
                                  height: 100px; \
                                  width: 100px;";
        
        fireball.style.background = "url('./img/wizard\ attack.png') -1300px 0px";

        this.fireball_shot(fireball);

        // if(collision_check(this, knight)) knight.health -= 5;

        
    }

    fireball_shot(fireball){

        var leftPos; 
        var shot = setInterval(() => {

            leftPos = fireball.offsetLeft;
            fireball.style.left = (leftPos + 8 * (-1)) + 'px';
            console.log(leftPos);
            if(leftPos < -2000 ) { 
                clearInterval(shot);
                fireball.remove();
            }

        }, 70);
        
    }

};


 