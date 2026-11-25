export const player = {
    x: 480,
    y: 390,
    speed: 2.5,
    color: "#6b936b",
    lastDirection: "down"
};

// Загрузка спрайта
const sprite = new Image();
sprite.src = new URL("../assets/player.png", import.meta.url).href;

let spriteLoaded = false;

sprite.onload = () => {
    spriteLoaded = true;
    console.log("Спрайт игрока загружен!");
};

sprite.onerror = () => {
    console.error("Не удалось загрузить assets/player.png");
};

// Анимация
let previousX = player.x;
let previousY = player.y;
let walkFrame = 0;

export function drawPlayer(ctx) {
    if (!spriteLoaded) return;

    const moving =
        player.x !== previousX ||
        player.y !== previousY;

    if (moving) {
        walkFrame += 0.18;
    } else {
        walkFrame = 0;
    }

    previousX = player.x;
    previousY = player.y;

    // Направление
    let row = 0;

    if (player.lastDirection === "left") row = 1;
    if (player.lastDirection === "right") row = 2;
    if (player.lastDirection === "up") row = 3;

    const column = moving
        ? Math.floor(walkFrame) % 5
        : 0;

    const frameWidth = sprite.width / 5;
    const frameHeight = sprite.height / 4;

    const drawWidth = 64;
    const drawHeight = 80;

    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
        sprite,
        column * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight,
        Math.round(player.x - drawWidth / 2),
        Math.round(player.y - drawHeight),
        drawWidth,
        drawHeight
    );
}

// NPC — старая отрисовка без изменений
export function drawPerson(ctx, x, y, shirt, hair) {
    const px = (a, b, w, h, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x + a, y + b, w, h);
    };

    px(-12, 7, 24, 5, "#75865e");
    px(-8, -5, 7, 13, "#493b40");
    px(2, -5, 7, 13, "#493b40");
    px(-10, 6, 10, 5, "#342d35");
    px(1, 6, 10, 5, "#342d35");
    px(-12, -27, 25, 23, "#493b40");
    px(-10, -26, 21, 20, shirt);
    px(-15, -25, 5, 17, "#493b40");
    px(-14, -24, 4, 14, shirt);
    px(12, -25, 5, 17, "#493b40");
    px(13, -24, 4, 14, shirt);
    px(-12, -53, 24, 25, "#493b40");
    px(-10, -51, 20, 19, "#edc39b");
    px(-12, -56, 24, 9, "#44353a");
    px(-10, -57, 20, 7, hair);
    px(-12, -51, 5, 12, hair);
    px(8, -51, 5, 11, hair);
    px(-6, -40, 3, 3, "#44353a");
    px(4, -40, 3, 3, "#44353a");
}