public class Hilo2 extends Thread {

    private final CoordinadorSecuencia coordinador;

    public Hilo2(CoordinadorSecuencia coordinador) {
        this.coordinador = coordinador;
    }

    @Override
    public void run() {
        try {
            while (true) {
                coordinador.ejecutarSegundo();
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
        }
    }
}
