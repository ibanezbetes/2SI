import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  paginas: number;
};

export default function Index() {
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
  const fetchLibros = async () => {
    try{
      const response = await fetch('http://10.0.2.2:3000/libros');
      const data = await response.json();
      setLibros(data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchLibros();
},[]);
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 10 }}>
        Listado de Libros
      </Text>

      <FlatList
        data={ libros }
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ fontSize: 18, marginBottom: 5 }}>
            {item.titulo} ({item.autor}) - {item.paginas} páginas
          </Text>
        )}
      />
    </View>
  );
}
