public class Hilo3 extends Thread {

    private final CoordinadorSecuencia coordinador;

    public Hilo3(CoordinadorSecuencia coordinador) {
        this.coordinador = coordinador;
    }

    @Override
    public void run() {
        try {
            while (true) {
                coordinador.ejecutarTercero();
                Thread.sleep(1000);
            }
        } catch (InterruptedException e) {
        }
    }
}
