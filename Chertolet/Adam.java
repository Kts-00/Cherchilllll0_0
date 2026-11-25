public class Adam {

    public static void main(String[] args) {

        NPC adam = new NPC(
            "Адам",
            "Городской сумасшедший, одержимый театром",
            "ГРАЖДАНЕ! БЕЗ ТЕАТРА МЫ ВСЕ УМРЁМ. " +
            "С театором тоже все умрём, но не так драматично."
        );

        System.out.println("Имя: " + adam.getName());
        System.out.println("Описание: " + adam.getDescription());
        System.out.println("Реплика: " + adam.getDialogue());
    }
}