import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { useState, useEffect } from 'react';

type Produto = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type Dados = {
  products: Produto[];
};

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function carregarProdutos() {
    const res = await fetch('https://dummyjson.com/products');
    const dados: Dados = await res.json();
    setProdutos(dados.products);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>CLUBE DE REGATAS DO FLAMENGO</Text>

      <FlatList
        data={produtos}
        keyExtractor={(prod) => prod.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Image 
              source={{ uri: item.thumbnail }} 
              style={{width: 200, height: 200}}
            />
            <Text>{item.title}</Text>
            <Text>R$ {item.price}</Text>
          </View>
        )}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto: {
    fontSize: 30,
    color: 'red',
  },
});
