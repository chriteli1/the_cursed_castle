class Knight{

    constructor(position){
        this.wr = this.wl = this.j = this.b = this.att = false; //movement flags
        this.position = position; //spawn position
        this.facing = "r";
        this.attackCooldown = 0;
        this.attacking = false;
        this.blocking = false;
        this.dead = false;

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

        this.health = 100;
        this.maxHealth = 100;
        this.health_bar = document.createElement("div");
        this.health_bar.className = "health-bar";
        this.health_fill = document.createElement("div");
        this.health_fill.className = "health-bar-fill";
        this.health_bar.appendChild(this.health_fill);
        this.knight.appendChild(this.health_bar);
        this.updateHealthBar();
    }

    get x() { return this.knight.offsetLeft; }
    get y() { return this.knight.offsetTop; }
    get width() { return this.knight.offsetWidth; }
    get height() { return this.knight.offsetHeight; }

    updateHealthBar(){
        this.health_fill.style.width = (this.health / this.maxHealth * 100) + "%";
    }

    //animate with the given sprites(once_flag is to run animation once and stop on the last sprite)
    animate(sprite_num, once_flag){ 

        // console.log(bg_position);
        this.knight.style.backgroundPosition = -(this.bg_position + 4*this.bg_offset) + "px -" + this.bg_offset + "px";
        
        if (this.bg_position < (sprite_num-1)*this.bg_increment)this.bg_position = this.bg_position + this.bg_increment;
        else if(!once_flag) this.bg_position = 0;
                
    }

    standing(){
        if (this.blocking) this.bg_position = 0;
        this.blocking = false;
        this.knight.style.background = 'url("./img/knight 3 idle_big.png") 0px 0px';
        this.animate(4, false);
    }


    walk(dir){
        if (this.b) return;

        var direction; // 1 = move right; -1 = move left

        if (this.blocking) this.bg_position = 0;
        this.blocking = false;
        this.knight.style.background = 'url("./img/knight walk animation_big.png") 0px 0px';

        // direction = (dir == "r") ? 1 : (dir == "l") ? -1 : 0; 

        if(dir == "r"){
            direction = 1;
            this.facing = "r";
            this.knight.classList.remove('flip');
        }
        else if( dir == "l"){
            direction = -1;
            this.facing = "l";
            this.knight.classList.add('flip');
        }
        else direction = 0;

        var leftPos = this.knight.offsetLeft;
        var stage = document.getElementById("stage");
        var maxLeft = stage.clientWidth - this.width;
        this.knight.style.left = Math.max(0, Math.min(maxLeft, leftPos + this.speed * direction)) + 'px';

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
            var stage = document.getElementById("stage");
            var maxTop = stage.clientHeight - this.height;
            this.knight.style.top = Math.max(0, Math.min(maxTop, topPos + jump_speed * direction)) + 'px';

            if(jump_speed <= acceleration) { //stop jumping when jump_speed is (almost) 0

                clearInterval(jumping);
                var landing = setInterval(() => { //landing animation
                    topPos = this.knight.offsetTop,
                    jump_speed = jump_speed + acceleration;
                    this.knight.style.top = Math.max(0, Math.min(maxTop, topPos + jump_speed * (direction * (-1)))) + 'px';

                    if(jump_speed >= initial_speed) { //stop moving when speed is equal to initial speed (which happens on the ground because of ideal conditions) 
                        this.on_air = false;

                        clearInterval(landing);
                    }
                }, 40);
                
            }
        }, 40);
   
    }

    
    block() {
        if (!this.blocking) {
            this.bg_position = 0;
            this.blocking = true;
        }
        this.knight.style.background = 'url("./img/knight 3 block_big.png") 0px 0px';

        this.animate(7, true);

    }

    attack(enemies) {
        if (this.dead || this.attacking) return;
        if (this.blocking) this.bg_position = 0;
        this.blocking = false;
        var now = Date.now();
        if (now < this.attackCooldown) return;

        this.attackCooldown = now + 500;
        this.attacking = true;
        this.knight.style.background = 'url("./img/knight 3 improved slash animation_big.png") 0px 0px';
        this.bg_position = 0;
        this.animate(10, true);

        var attackFrame = 0;
        var attackAnimation = setInterval(() => {
            if (this.dead) {
                clearInterval(attackAnimation);
                this.attacking = false;
                return;
            }

            this.animate(10, true);
            attackFrame++;
            if (attackFrame === 5) {
                var hitbox = {
                    x: this.facing === "r" ? this.x + this.width - 10 : this.x - 50,
                    y: this.y + 10,
                    width: 60,
                    height: this.height - 20
                };
                for (let i = 0; i < enemies.length; i++) {
                    if (!enemies[i].dead && collision_check(hitbox, enemies[i])) {
                        enemies[i].takeDamage(25);
                    }
                }
            }
            if (attackFrame >= 9) {
                clearInterval(attackAnimation);
                this.attacking = false;
            }
        }, 50);
    }

    takeDamage(amount, incomingDirection){
        if (this.dead) return;
        if (this.b && (
            (this.facing === "l" && incomingDirection > 0) ||
            (this.facing === "r" && incomingDirection < 0)
        )) return;

        this.health = Math.max(0, this.health - amount);
        this.updateHealthBar();
        if (this.health === 0) {
            this.dead = true;
            this.knight.style.opacity = "0.5";
            showGameMessage("Game over! Refresh to play again.");
        }
    }
    
}