export function drawWorld(ctx) {
    // Земля
    ctx.fillStyle = "#91aa70";
    ctx.fillRect(0, 0, 960, 560);

    // Площадь
    ctx.fillStyle = "#c9b18a";
    ctx.fillRect(65, 65, 830, 440);

    // Плитка
    for (let y = 70; y < 500; y += 24) {
        for (let x = 70; x < 890; x += 24) {
            ctx.fillStyle = "#b59d7c";
            ctx.fillRect(x, y, 2, 2);
        }
    }

    // Центральная дорожка
    ctx.fillStyle = "#ddc9a5";
    ctx.fillRect(420, 65, 120, 440);

    // Прилавки
    drawStall(ctx, 150, 140, "#d86d54", "ФРУКТЫ");
    drawStall(ctx, 610, 140, "#6486a5", "НАПИТКИ");

    // Декорации
    drawBush(ctx, 100, 100);
    drawBush(ctx, 850, 100);
    drawBush(ctx, 100, 450);
    drawBush(ctx, 850, 450);

    // Табличка
    ctx.fillStyle = "#72523c";
    ctx.fillRect(365, 15, 230, 40);

    ctx.fillStyle = "#fff0cf";
    ctx.font = "bold 17px Arial";
    ctx.textAlign = "center";
    ctx.fillText("ГОРОДСКОЙ РЫНОК", 480, 41);
}

function drawStall(ctx, x, y, color, label) {
    ctx.fillStyle = "#79543c";
    ctx.fillRect(x, y + 40, 200, 65);

    // Навес
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = i % 2 === 0 ? color : "#f4dfbd";
        ctx.fillRect(x + i * 25, y, 25, 45);
    }

    ctx.fillStyle = "#fff8e8";
    ctx.font = "bold 13px Arial";
    ctx.textAlign = "center";
    ctx.fillText(label, x + 100, y + 31);

    // Товары
    const colors = ["#d85e4d", "#e4bd53", "#78a65d"];

    for (let i = 0; i < 6; i++) {
        ctx.fillStyle = colors[i % 3];
        ctx.fillRect(x + 20 + i * 26, y + 65, 15, 15);
    }
}

function drawBush(ctx, x, y) {
    ctx.fillStyle = "#527b4c";
    ctx.fillRect(x, y, 25, 15);

    ctx.fillStyle = "#71975b";
    ctx.fillRect(x + 5, y - 7, 15, 12);

    ctx.fillStyle = "#e8c66c";
    ctx.fillRect(x + 10, y - 8, 5, 5);
}