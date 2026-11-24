function getSceneScale(stage) {
    return Math.max(stage.clientWidth / 1366, stage.clientHeight / 768);
}

function getGroundY(stage) {
    // The ground line is at y=724 in the 1366x768 background image.
    var backgroundGroundOffset = (768 - 724) * getSceneScale(stage);
    return stage.clientHeight - backgroundGroundOffset;
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
    var stage = document.getElementById("stage");
    var sceneScale = getSceneScale(stage);
    var groundY = getGroundY(stage);
    var knight = new Knight([groundY - 75 * sceneScale, stage.clientWidth * 0.02]);
    knight.setScale(sceneScale);
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

        if (!knight.attacking) {
            if (knight.b) knight.block();
            else if (!knight.att) {
                if (knight.wr && !knight.wl) knight.walk("r");
                else if (knight.wl && !knight.wr) knight.walk("l");
                else knight.standing();
            } else knight.attack(enemies);
        }

        if (knight.j && !knight.on_air && !knight.jumped) knight.jump();
    }, 100);

    var wizard1 = new Wizard(6, "wizard1", [groundY - 113 * sceneScale, stage.clientWidth * 0.45]);
    wizard1.setScale(sceneScale);
    enemies.push(wizard1);
    var previousStageWidth = stage.clientWidth;
    var previousStageHeight = stage.clientHeight;
    var resizeStage = () => {
        if (stage.clientWidth === previousStageWidth && stage.clientHeight === previousStageHeight) return;

        var nextSceneScale = getSceneScale(stage);
        var nextGroundY = getGroundY(stage);
        var knightGroundOffset = knight.y + 75 * sceneScale - groundY;
        var widthScale = stage.clientWidth / previousStageWidth;
        var knightLeft = Math.max(0, Math.min(stage.clientWidth - 80 * nextSceneScale, knight.x * widthScale));
        var wizardLeft = Math.max(0, Math.min(stage.clientWidth - 130 * nextSceneScale, wizard1.x * widthScale));

        knight.setScale(nextSceneScale);
        wizard1.setScale(nextSceneScale);
        knight.knight.style.left = knightLeft + "px";
        knight.knight.style.top = (nextGroundY - 75 * nextSceneScale + knightGroundOffset * (nextSceneScale / sceneScale)) + "px";
        wizard1.html_entity.style.left = wizardLeft + "px";
        wizard1.html_entity.style.top = (nextGroundY - 113 * nextSceneScale) + "px";
        sceneScale = nextSceneScale;
        groundY = nextGroundY;
        previousStageWidth = stage.clientWidth;
        previousStageHeight = stage.clientHeight;
    };
    window.addEventListener("resize", resizeStage);
    new ResizeObserver(resizeStage).observe(stage);

    var wizardStanding = setInterval(() => {
        if (!wizard1.dead && !wizard1.moving && !wizard1.attacking) wizard1.standing();
    }, 180);

    var wizardAttackReady = true;
    var patrolDirection = -1;
    var nextRelativeMoveAt = Date.now() + 4000;
    var relativeMoveUntil = 0;
    setInterval(() => {
        if (wizard1.dead || knight.dead) return;
        if (wizard1.attacking) {
            wizard1.moving = false;
            return;
        }

        var distance = knight.x - wizard1.x;
        var absoluteDistance = Math.abs(distance);
        var now = Date.now();
        var stage = document.getElementById("stage");
        var maxLeft = stage.clientWidth - wizard1.width;

        if (wizard1.x <= 0 && patrolDirection < 0) {
            patrolDirection = 1;
        } else if (wizard1.x >= maxLeft && patrolDirection > 0) {
            patrolDirection = -1;
        }

        if (now >= nextRelativeMoveAt) {
            nextRelativeMoveAt = now + 5000;
            if (absoluteDistance > 400 * sceneScale) relativeMoveUntil = now + 1200;
        }

        var moveDirection = patrolDirection;
        if (now < relativeMoveUntil && absoluteDistance > 220 * sceneScale) {
            moveDirection = distance < 0 ? -1 : 1;
        } else {
            relativeMoveUntil = 0;
        }

        wizard1.moving = true;
        wizard1.move(moveDirection < 0 ? "l" : "r");

        if (absoluteDistance < 700 * sceneScale && wizardAttackReady) {
            wizardAttackReady = false;
            wizard1.attack(knight);
            setTimeout(() => {
                wizardAttackReady = true;
            }, 2200);
        }
    }, 70);

    setInterval(() => {
        if (!gameEnded && (knight.dead || wizard1.dead)) {
            gameEnded = true;
            knight.wr = knight.wl = knight.j = knight.b = knight.att = false;
        }
    }, 100);
});
