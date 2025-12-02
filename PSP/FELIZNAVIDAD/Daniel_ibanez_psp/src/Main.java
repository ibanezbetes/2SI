public class Main {

    public final int[] tiemposCarga = { 20, 40, 30 };
    private final boolean[] modulos = { false, false, false };

    public static void main(String[] args) {
        Main base = new Main();
        for (int i = 1; i <= 5; i++) {
            new Robot(i, base).start();
        }
    }

    public synchronized int ocuparModulo() {
        for (int i = 0; i < modulos.length; i++) {
            if (!modulos[i]) {
                modulos[i] = true;
                return i;
            }
        }
        return -1;
    }

    public synchronized void liberarModulo(int i) {
        modulos[i] = false;
    }
}