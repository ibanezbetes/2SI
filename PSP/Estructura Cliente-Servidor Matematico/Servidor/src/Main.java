import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {
    public static void main(String[] args) {
        try {
            // 1. Apertura del Socket de Servidor
            System.out.println("Creando el server socket...");
            ServerSocket skServidor = new ServerSocket(5000);

            System.out.println("Esperando al cliente...");
            // 2. El Servidor acepta la petición de servicio y crea el canal privado
            Socket skCliente = skServidor.accept();
            System.out.println("Cliente conectado. Atendiendo...");

            // 3. Creación de Streams de Entrada y Salida
            InputStream aux = skCliente.getInputStream();
            DataInputStream flujo_entrada = new DataInputStream(aux);

            OutputStream aux2 = skCliente.getOutputStream();
            DataOutputStream flujo_salida = new DataOutputStream(aux2);

            boolean conectado = true;

            // Bucle para mantener la conversación (Persistencia v2.0)
            while (conectado) {
                try {
                    // Esperamos la operación que quiere el cliente
                    int operacion = flujo_entrada.readInt();
                    System.out.println("El cliente ha pedido la operación: " + operacion);

                    switch (operacion) {
                        case 1: // Suma
                            int op1 = flujo_entrada.readInt();
                            int op2 = flujo_entrada.readInt();
                            int suma = op1 + op2;
                            flujo_salida.writeInt(suma);
                            break;

                        case 2: // Raíz Cuadrada
                            double numRaiz = flujo_entrada.readDouble();
                            double resultadoRaiz = Math.sqrt(numRaiz);
                            flujo_salida.writeDouble(resultadoRaiz);
                            break;

                        case 3: // Serie
                            // Protocolo: 1. Leer cuántos números tiene la serie
                            int cantidadNumeros = flujo_entrada.readInt();

                            // 2. Leer los números
                            int[] serie = new int[cantidadNumeros];
                            for (int i = 0; i < cantidadNumeros; i++) {
                                serie[i] = flujo_entrada.readInt();
                            }

                            // 3. Calcular el siguiente (Lógica simple: calcular la diferencia entre los dos últimos)
                            int siguienteNumero = 0;
                            if (cantidadNumeros >= 2) {
                                int diferencia = serie[cantidadNumeros - 1] - serie[cantidadNumeros - 2];
                                siguienteNumero = serie[cantidadNumeros - 1] + diferencia;
                            } else if (cantidadNumeros == 1) {
                                siguienteNumero = serie[0] + 1; // Fallback simple
                            }

                            flujo_salida.writeInt(siguienteNumero);
                            break;

                        case 4: // Desconexión
                            System.out.println("Solicitud de desconexión recibida.");
                            conectado = false; // Rompe el bucle while
                            break;

                        default:
                            System.out.println("Operación no reconocida");
                            break;
                    }
                } catch (EOFException e) {
                    // Captura si el cliente se desconecta abruptamente
                    System.out.println("El cliente se ha desconectado.");
                    conectado = false;
                }
            }

            // 4. Cierre de Sockets
            skCliente.close();
            skServidor.close();
            System.out.println("Servidor cerrado.");

        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
    }
}