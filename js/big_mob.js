function big_mob(){
    var s = true, wr = false, wl = false, j = false, b = false; 

    window.onload = setInterval(standing, 70);

    var big_mob = document.getElementById('big_mob');

    big_mob.style.left = "1200px";
    big_mob.style.top = "475px";


    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    var stnd_cntr = 0; //counter for standing animation

    function standing(){
        var timer = 120;

        if(stnd_cntr == 0){
            big_mob.src='img/wizard_idle/wizard_idle1.png';
            sleep(timer).then(() => { 
                stnd_cntr = 1;
            });
        }
        else if(stnd_cntr == 1){
            big_mob.src='img/wizard_idle/wizard_idle2.png';
            sleep(timer).then(() => {
                stnd_cntr = 2;
            });
        }
        else if(stnd_cntr == 2){
            big_mob.src='img/wizard_idle/wizard_idle3.png';
            sleep(timer).then(() => { 
                stnd_cntr = 3;
            });
        }
        else if(stnd_cntr == 3){
            big_mob.src='img/wizard_idle/wizard_idle4.png';
            sleep(timer).then(() => { 
                stnd_cntr = 4;
            });
        }
        else if(stnd_cntr == 4){
            big_mob.src='img/wizard_idle/wizard_idle5.png';
            sleep(timer).then(() => { 
                stnd_cntr = 5;
            });
        }
        else if(stnd_cntr == 5){
            big_mob.src='img/wizard_idle/wizard_idle6.png';
            sleep(timer).then(() => { 
                stnd_cntr = 6;
            });
        }
        else {
            stnd_cntr = 0;
        }
            
    }
}