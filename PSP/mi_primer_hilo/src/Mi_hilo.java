public class Mi_hilo extends Thread{

    private int numero;
    private String mensaje;

    public Mi_hilo(int num) {
        numero = num;
    }

    public void run() {

        /*if (numero % 2 == 0) {
            System.out.println("Lo primero buenos días.");
            System.out.println("Soy el hilo #" + numero + ".");
        } else {
            System.out.println("Buenos días, por lo tanto buenos días.");
            System.out.println("Soy el hilo #" + numero + ".");
        }

        if (numero > 75) {
            System.out.println("Parece que refresca.");
        }*/

        mensaje = "Soy el hilo " + numero + ".";

        if (numero % 2 == 0) {
            mensaje = mensaje + " Lo primero buenos días.";
        } else {
            mensaje = mensaje + " Buenos días, por lo tanto buenos días.";
        }

        if (numero > 75) {
            mensaje = mensaje + " Paice que refresca.";
        }

        System.out.println(mensaje);
        System.out.println("");

    }
}