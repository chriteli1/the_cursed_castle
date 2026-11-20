function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function collision_check(entity1, entity2) {
    return (
        entity1.x < entity2.x + entity2.width &&
        entity1.x + entity1.width > entity2.x &&
        entity1.y < entity2.y + entity2.height &&
        entity1.y + entity1.height > entity2.y
    );
}

function showGameMessage(message) {
    var gameMessage = document.getElementById("game-message");
    gameMessage.textContent = message;
    gameMessage.classList.add("visible");
}

document.addEventListener("DOMContentLoaded", () => {
    var knight = new Knight([535, 20]);
    var enemies = [];
    var gameEnded = false;

    window.addEventListener("keydown", (event) => {
        var key = event.key.toLowerCase();
        if (key === " ") event.preventDefault();
        if (gameEnded) return;

        if (key === 'd') knight.wr = true;
        if (key === 'a') knight.wl = true;
        if (key === 'w') knight.j = true;
        if (key === ' ') knight.b = true;
        if (key === 'p') knight.att = true;
    });

    window.addEventListener("keyup", (event) => {
        var key = event.key.toLowerCase();
        if (key === 'w') {
            knight.j = false;
            knight.jumped = false;
        }
        if (key === 'd') knight.wr = false;
        if (key === 'a') knight.wl = false;
        if (key === ' ') knight.b = false;
        if (key === 'p') knight.att = false;
    });

    setInterval(() => {
        if (knight.dead) return;

        if (knight.b) knight.block();
        else if (!knight.att) {
            if (knight.wr && !knight.wl) knight.walk("r");
            else if (knight.wl && !knight.wr) knight.walk("l");
            else knight.standing();
        } else knight.attack(enemies);

        if (knight.j && !knight.on_air && !knight.jumped) knight.jump();
    }, 100);

    var wizard1 = new Wizard(6, "wizard1", [480, 600]);
    enemies.push(wizard1);
    var wizardStanding = setInterval(() => {
        if (!wizard1.dead) wizard1.standing();
    }, 180);

    async function wizardTurn() {
        if (wizard1.dead || knight.dead) return;
        clearInterval(wizardStanding);

        var moveLeft = setInterval(() => wizard1.move("l"), 70);
        await sleep(3000);
        clearInterval(moveLeft);
        if (wizard1.dead || knight.dead) return;

        wizard1.attack(knight);
        var moveRight = setInterval(() => wizard1.move("r"), 70);
        await sleep(3000);
        clearInterval(moveRight);
        if (wizard1.dead || knight.dead) return;

        wizard1.move("l");
        wizard1.attack(knight);
        await sleep(1450);
        if (wizard1.dead || knight.dead) return;

        wizardStanding = setInterval(() => wizard1.standing(), 180);
    }

    setInterval(wizardTurn, 10000);

    setInterval(() => {
        if (!gameEnded && (knight.dead || wizard1.dead)) {
            gameEnded = true;
            knight.wr = knight.wl = knight.j = knight.b = knight.att = false;
        }
    }, 100);
});
