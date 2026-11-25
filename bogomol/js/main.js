import { drawWorld } from "./world.js";
import { player, drawPlayer } from "./player.js";
import { npcs, drawNPCs, getNearestNPC } from "./npc.js";

const canvas = document.getElementById("game");
console.log("ИГРА ЗАПУЩЕНА");

console.log("CANVAS:", canvas);

console.log("КОНТЕКСТ:", canvas.getContext("2d"));
const ctx = canvas.getContext("2d");

const status = document.getElementById("status");
const dialogue = document.getElementById("dialogue");
const speaker = document.getElementById("speaker");
const dialogueText = document.getElementById("dialogueText");

const keys = {};
let activeNPC = null;
let dialogueIndex = 0;
let questCompleted = false;

window.addEventListener("keydown", event => {
    keys[event.key.toLowerCase()] = true;

    if (event.key.toLowerCase() === "e") {
        if (activeNPC) {
            if (dialogue.classList.contains("active")) {
                nextDialogue();
            } else {
                talk(activeNPC);
            }
        }
    }

    if (event.key === "Enter" && dialogue.classList.contains("active")) {
        nextDialogue();
    }

    if (event.key === "Escape") {
        closeDialogue();
    }
});

window.addEventListener("keyup", event => {
    keys[event.key.toLowerCase()] = false;
});

function movePlayer() {
    if (dialogue.classList.contains("active")) return;

    let dx = 0;
    let dy = 0;

    if (keys["w"] || keys["arrowup"]) dy--;
    if (keys["s"] || keys["arrowdown"]) dy++;
    if (keys["a"] || keys["arrowleft"]) dx--;
    if (keys["d"] || keys["arrowright"]) dx++;

    if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
    }

    player.x += dx * player.speed;
player.y += dy * player.speed;

if (dx > 0) player.lastDirection = "right";
else if (dx < 0) player.lastDirection = "left";
else if (dy > 0) player.lastDirection = "down";
else if (dy < 0) player.lastDirection = "up";

    player.x = Math.max(35, Math.min(925, player.x));
    player.y = Math.max(90, Math.min(510, player.y));
}

function talk(npc) {
    activeNPC = npc;
    dialogueIndex = 0;

    speaker.textContent = npc.name + " · " + npc.role;

    if (npc.name === "Мира" && questCompleted) {
        dialogueText.textContent = "Спасибо! Ты отлично справился с поручением!";
    } else {
        dialogueText.textContent = npc.lines[dialogueIndex];
    }

    dialogue.classList.add("active");
}

function nextDialogue() {
    if (!activeNPC) return;

    dialogueIndex++;

    if (dialogueIndex >= activeNPC.lines.length) {
        if (activeNPC.name === "Тима" && !questCompleted) {
            questCompleted = true;
            status.textContent = "Поручение выполнено! Вернись к Мире.";
        }

        closeDialogue();
        return;
    }

    dialogueText.textContent = activeNPC.lines[dialogueIndex];
}

function closeDialogue() {
    dialogue.classList.remove("active");
    activeNPC = null;
}

function update() {
    movePlayer();

    const nearest = getNearestNPC(player.x, player.y);

    if (nearest) {
        status.textContent = nearest.name + " рядом. Нажми E, чтобы поговорить.";
        activeNPC = nearest;
    } else {
        status.textContent = "Исследуйте рынок и познакомьтесь с жителями.";
        if (!dialogue.classList.contains("active")) {
            activeNPC = null;
        }
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWorld(ctx);
    drawNPCs(ctx);
    drawPlayer(ctx);

    if (activeNPC && !dialogue.classList.contains("active")) {
        ctx.fillStyle = "#fff0a0";
        ctx.font = "bold 17px Arial";
        ctx.textAlign = "center";
        ctx.fillText("E", activeNPC.x, activeNPC.y - 55);
    }
}

function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

gameLoop();