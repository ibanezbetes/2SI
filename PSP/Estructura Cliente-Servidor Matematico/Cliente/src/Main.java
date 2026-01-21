import java.io.*;
import java.net.Socket;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        try {
            System.out.println("Intentando conectar con el servidor...");
            // 1. Apertura del Socket de Cliente (localhost puerto 5000)
            Socket skCliente = new Socket("localhost", 5000);
            System.out.println("Conectado al servidor.");

            // 2. Creación de Streams
            DataOutputStream flujo_salida = new DataOutputStream(skCliente.getOutputStream());
            DataInputStream flujo_entrada = new DataInputStream(skCliente.getInputStream());

            boolean continuar = true;

            while (continuar) {
                // Menú de usuario (v2.0)
                System.out.println("\n--- MENÚ SERVIDOR MATEMÁTICO ---");
                System.out.println("1. Sumar dos números");
                System.out.println("2. Raíz cuadrada");
                System.out.println("3. Completar serie");
                System.out.println("4. Desconectar");
                System.out.print("Elige una opción: ");

                int opcion = sc.nextInt();

                // Enviamos la opción al servidor
                flujo_salida.writeInt(opcion);

                switch (opcion) {
                    case 1:
                        System.out.print("Introduce el primer número: ");
                        int n1 = sc.nextInt();
                        System.out.print("Introduce el segundo número: ");
                        int n2 = sc.nextInt();

                        // Enviamos datos
                        flujo_salida.writeInt(n1);
                        flujo_salida.writeInt(n2);

                        // Recibimos respuesta
                        int resultadoSuma = flujo_entrada.readInt();
                        System.out.println("Resultado Servidor: " + resultadoSuma);
                        break;

                    case 2:
                        System.out.print("Introduce el número para la raíz: ");
                        double nRaiz = sc.nextDouble();

                        // Enviamos datos (Double)
                        flujo_salida.writeDouble(nRaiz);

                        // Recibimos respuesta
                        double resultadoRaiz = flujo_entrada.readDouble();
                        System.out.println("Resultado Servidor: " + resultadoRaiz);
                        break;

                    case 3:
                        System.out.print("¿Cuántos números tiene tu serie? (ej. 4): ");
                        int cantidad = sc.nextInt();
                        flujo_salida.writeInt(cantidad); // Enviamos tamaño

                        System.out.println("Introduce los números uno a uno:");
                        for(int i = 0; i < cantidad; i++) {
                            System.out.print("Num " + (i+1) + ": ");
                            int numSerie = sc.nextInt();
                            flujo_salida.writeInt(numSerie); // Enviamos cada número
                        }

                        // Recibimos el siguiente de la serie
                        int siguiente = flujo_entrada.readInt();
                        System.out.println("El siguiente número de la serie es: " + siguiente);
                        break;

                    case 4:
                        System.out.println("Desconectando...");
                        continuar = false;
                        break;

                    default:
                        System.out.println("Opción incorrecta.");
                        break;
                }
            }

            // 3. Cierre de recursos
            flujo_entrada.close();
            flujo_salida.close();
            skCliente.close();
            sc.close();

        } catch (IOException e) {
            System.out.println("Error en la comunicación: " + e.getMessage());
        }
    }
}