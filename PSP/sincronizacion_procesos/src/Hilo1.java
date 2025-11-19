public class Hilo1 extends Thread {

    private final CoordinadorSecuencia coordinador;

    public Hilo1(CoordinadorSecuencia coordinador) {
        this.coordinador = coordinador;
    }

    @Override
    public void run() {
        try {
            while (true) {
                coordinador.ejecutarPrimero();
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
        }
    }
}
