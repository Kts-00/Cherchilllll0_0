import { drawPerson } from "./player.js";

export const npcs = [
    {
        name: "Мира",
        role: "Продавец фруктов",
        x: 250,
        y: 260,
        color: "#bd6652",
        hair: "#56372e",
        lines: [
            "Привет! Я Мира. Продаю свежие фрукты.",
            "Не хочешь помочь мне с небольшим поручением?",
            "Сходи к Тиме и передай, что я жду его заказ."
        ]
    },
    {
        name: "Тима",
        role: "Продавец напитков",
        x: 700,
        y: 260,
        color: "#587d9d",
        hair: "#4b352c",
        lines: [
            "Здравствуй! Я Тима.",
            "Мира отправила тебя? Передай ей, что заказ готов!"
        ]
    },
    {
        name: "Аня",
        role: "Покупательница",
        x: 740,
        y: 420,
        color: "#9a719c",
        hair: "#563b35",
        lines: [
            "Какой сегодня чудесный рынок!",
            "Я люблю приходить сюда по утрам."
        ]
    }
];

export function drawNPCs(ctx) {
    for (const npc of npcs) {
        drawPerson(
            ctx,
            npc.x,
            npc.y,
            npc.color,
            npc.hair
        );

        ctx.fillStyle = "#44372f";
        ctx.font = "bold 12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(npc.name, npc.x, npc.y + 27);
    }
}

export function getNearestNPC(x, y) {
    let nearest = null;
    let minDistance = 55;

    for (const npc of npcs) {
        const distance = Math.hypot(
            npc.x - x,
            npc.y - y
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearest = npc;
        }
    }

    return nearest;
}