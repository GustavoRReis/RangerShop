import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, TextInput, Button, Keyboard } from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import { useCart } from '../Context/CartProvider';
import { Product } from '../interfaces/interfacesShop';
import { Switch } from 'react-native-paper';
import { useDark } from '../Context/DarkMode';



export default function Home({ navigation }: any) {
  const { addToCart } = useCart();
  const [dataProducts, setDataProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToDark, darkMode } = useDark();
  


  const fetchData = async (product: string): Promise<void> => {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

    const { data } = await axios.get(URL);
    const filterData = data.results.slice(0, 8);
    setDataProducts(filterData);
  }

  const handleSearch = () => {
    fetchData(searchQuery);
    Keyboard.dismiss();
    setSearchQuery('');
  }

  useEffect(() => {
    fetchData('power ranger');
  }, []);

  const renderCard = ({ item }: { item: Product }): JSX.Element => {
    return <Card item={ item } addToCart={ addToCart } />;
  };

  const goToCart = () => {
    navigation.navigate('Carrinho de compras');
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: darkMode ? 'yellow' : 'blue',
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    containerInput: {
      backgroundColor: darkMode ? 'black' : 'yellow',
      width: '100%',
      alignItems: 'center',
    },
    searchInput: {
      width: '80%',
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      margin: 10,
      backgroundColor: '#fff',
    },
    button: {
      margin: 6,
    },
    goToCartButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    goToCartButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    switch: {
      marginTop: 50
    }
  });

  return (
    
      <View style={ styles.container }>
        <View style={ styles.containerInput }>
        <Switch
          style={ styles.switch }
          value={ darkMode }
          onValueChange={ () => addToDark() }
        />
          <Text style={ styles.title }>Ranger Shop</Text>
          <TextInput
            style={ styles.searchInput }
            placeholder="Digite o produto..."
            onChangeText={ (text) => setSearchQuery(text) }
            value={ searchQuery }
            onSubmitEditing={ handleSearch }
          />
        </View>
        <View style={ styles.button }>
          <Button title="Buscar" onPress={ handleSearch } />
        </View>
        <FlatList
          data={ dataProducts }
          renderItem={ renderCard }
          keyExtractor={ (item) => item.id.toString() }
          horizontal={ false }
          numColumns={ 1 }
        />
        <TouchableOpacity onPress={ goToCart } style={ styles.goToCartButton }>
          <Text style={ styles.goToCartButtonText }>Ir para o Carrinho</Text>
        </TouchableOpacity>
      </View>
   
  );
}


