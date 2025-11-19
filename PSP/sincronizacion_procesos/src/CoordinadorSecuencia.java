public class CoordinadorSecuencia {

    private int turnoActual = 1;

    public synchronized void ejecutarPrimero() throws InterruptedException {
        while (turnoActual != 1) {
            wait();
        }
        System.out.println("Hilo 1 ejecutando...");
        turnoActual = 2;
        notifyAll();
    }

    public synchronized void ejecutarSegundo() throws InterruptedException {
        while (turnoActual != 2) {
            wait();
        }
        System.out.println("Hilo 2 ejecutando...");
        turnoActual = 3;
        notifyAll();
    }

    public synchronized void ejecutarTercero() throws InterruptedException {
        while (turnoActual != 3) {
            wait();
        }
        System.out.println("Hilo 3 ejecutando...");
        turnoActual = 1;
        notifyAll();
    }
}
