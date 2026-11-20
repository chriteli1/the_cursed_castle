class Wizard {
    constructor(speed, id, position){
        this.speed = speed;
        this.position = position; //initial entity's position
        this.id = id; //id to give the html element
        this.stnd_cntr = 0; //counter for standing animation
        this.dead = false;

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
                                    height: 130px; width: 130px;";


        this.health = 100;
        this.maxHealth = 100;
        this.health_bar = document.createElement("div");
        this.health_bar.className = "health-bar";
        this.health_fill = document.createElement("div");
        this.health_fill.className = "health-bar-fill";
        this.health_bar.appendChild(this.health_fill);
        this.html_entity.appendChild(this.health_bar);
        this.updateHealthBar();
    }

    get x() { return this.html_entity.offsetLeft; }
    get y() { return this.html_entity.offsetTop; }
    get width() { return this.html_entity.offsetWidth; }
    get height() { return this.html_entity.offsetHeight; }

    updateHealthBar(){
        this.health_fill.style.width = (this.health / this.maxHealth * 100) + "%";
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
        
        this.html_entity.style.background = 'url("./img/wizard idle.png") 0px 0px';
        this.animate(10, false, 2);
    }


    move(dir){
        if (this.dead) return;

        this.html_entity.style.background = 'url("./img/wizard fly forward.png") 0px 0px';

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
        var stage = document.getElementById("stage");
        var maxLeft = stage.clientWidth - this.width;
        this.html_entity.style.left = Math.max(0, Math.min(maxLeft, leftPos + this.speed * direction)) + 'px';

        this.animate(6, false, 1);
        
    }


    attack(target) {
        if (this.dead) return;
        this.html_entity.style.background = 'url("./img/wizard attack.png") 0px 0px';
        this.bg_position = 0;
        this.animate(10, true, 0);

        var direction = target.x < this.x ? -1 : 1;
        if (direction < 0) this.html_entity.classList.remove("flip");
        else this.html_entity.classList.add("flip");

        var fireball = document.createElement("div");
        var stage = document.getElementById("stage");
        stage.appendChild(fireball);

        fireball.className = "fireball";
        fireball.style.top = (this.y + 15) + "px";
        fireball.style.left = (this.x + (direction < 0 ? -40 : this.width - 20)) + "px";
        
        this.fireball_shot(fireball, target, direction);
    }

    fireball_shot(fireball, target, direction){
        var stage = document.getElementById("stage");
        var shot = setInterval(() => {
            var leftPos = fireball.offsetLeft + 8 * direction;
            fireball.style.left = leftPos + 'px';
            fireball.x = leftPos;
            fireball.y = fireball.offsetTop;
            fireball.width = fireball.offsetWidth;
            fireball.height = fireball.offsetHeight;

            var hitTarget = collision_check(fireball, target);
            if (target.dead || this.dead || hitTarget) {
                clearInterval(shot);
                fireball.remove();
                if (!target.dead && !this.dead && hitTarget) target.takeDamage(20);
            } else if (leftPos + fireball.offsetWidth < 0 || leftPos > stage.clientWidth) {
                clearInterval(shot);
                fireball.remove();
            }
        }, 35);
        
    }

    takeDamage(amount){
        if (this.dead) return;
        this.health = Math.max(0, this.health - amount);
        this.updateHealthBar();
        if (this.health === 0) {
            this.dead = true;
            this.html_entity.remove();
            showGameMessage("You win! Refresh to play again.");
        }
    }

};


 