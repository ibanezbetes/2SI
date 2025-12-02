import java.util.Random;

public class Robot extends Thread {
    private int id;
    private Main base;
    private Random rnd = new Random();

    public Robot(int id, Main base) {
        this.id = id;
        this.base = base;
    }

    @Override
    public void run() {
        System.out.println("Robot " + id + " llega a la estación de carga.");

        int mod = -1;
        while (mod == -1) {
            mod = base.ocuparModulo();
            if (mod == -1) {
                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                }
            }
        }

        int tiempo = base.tiemposCarga[mod];
        int variacion = rnd.nextInt((tiempo / 2) + 1);
        int tipo = rnd.nextInt(3) + 1;

        if (tipo == 1)
            tiempo += variacion;
        else if (tipo == 2)
            tiempo -= variacion;

        System.out.println("Robot " + id + " comienza recarga en módulo " + (mod + 1) + ".");

        try {
            Thread.sleep(tiempo * 1000);
        } catch (InterruptedException e) {
        }

        System.out.println("Robot " + id + " termina recarga en módulo " + (mod + 1) + " tras " + tiempo + " segundos");

        base.liberarModulo(mod);
        System.out.println("Robot " + id + " completamente operativo.");
    }
}