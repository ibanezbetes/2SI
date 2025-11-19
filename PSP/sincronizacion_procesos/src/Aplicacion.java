public class Aplicacion {

    public static void main(String[] args) {
        CoordinadorSecuencia coordinador = new CoordinadorSecuencia();
        Hilo1 h1 = new Hilo1(coordinador);
        Hilo2 h2 = new Hilo2(coordinador);
        Hilo3 h3 = new Hilo3(coordinador);
        h1.start();
        h2.start();
        h3.start();
    }
}
