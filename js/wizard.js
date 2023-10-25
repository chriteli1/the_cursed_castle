class Wizard {
    constructor(speed, id, position){
        this.speed = speed;
        this.position = position; //initial entity's position
        this.id = id; //id to give the html element
        this.stnd_cntr = 0; //counter for standing animation

        //"spawn" entity
        var new_div = document.createElement("div");
        this.html_entity = document.createElement("img");
        this.html_entity.setAttribute("id", id);
        this.html_entity.setAttribute("src", "img/wizard_idle/wizard_idle1.png");
        new_div.appendChild(this.html_entity);

        var stage = document.getElementById("stage");
        stage.appendChild(new_div);

        //set new entity's position and size
        this.html_entity.style.cssText = "position: absolute; \
                                    bottom: " + this.position[0] + "px; \
                                    right: " + this.position[1] + "px; \
                                    height: 130px; width: 80px;";
                
    }

    standing() {
        var timer = 120;
    
        var stnd_cntr = 0;
    
        setInterval( () => {
            if(stnd_cntr == 0){
                this.html_entity.src='img/wizard_idle/wizard_idle1.png';
                sleep(timer).then(() => { 
                    stnd_cntr = 1;
                });
            }
            else if(stnd_cntr == 1){
                this.html_entity.src='img/wizard_idle/wizard_idle2.png';
                sleep(timer).then(() => {
                    stnd_cntr = 2;
                });
            }
            else if(stnd_cntr == 2){
                this.html_entity.src='img/wizard_idle/wizard_idle3.png';
                sleep(timer).then(() => { 
                    stnd_cntr = 3;
                });
            }
            else if(stnd_cntr == 3){
                this.html_entity.src='img/wizard_idle/wizard_idle4.png';
                sleep(timer).then(() => { 
                    stnd_cntr = 4;
                });
            }
            else if(stnd_cntr == 4){
                this.html_entity.src='img/wizard_idle/wizard_idle5.png';
                sleep(timer).then(() => { 
                    stnd_cntr = 5;
                });
            }
            else if(stnd_cntr == 5){
                this.html_entity.src='img/wizard_idle/wizard_idle6.png';
                sleep(timer).then(() => { 
                    stnd_cntr = 6;
                });
            }
            else {
                stnd_cntr = 0;
            }
        }, 70);
            
    }

    move(dir){
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
        
    }

};


 