import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CardProps, Product } from '../interfaces/interfacesShop';

function Card({ item, addToCart }: CardProps) {
  const navigation = useNavigation();

  const handleCardPress = () => {
    const itemData: Product = item
    // @ts-ignore
    navigation.navigate('Detalhes do Produto', { item: itemData });
  };

  const handleAddToCart = () => {
    addToCart(item);
  };

  const styles = StyleSheet.create({
    card: {
      width: 350,
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      elevation: 3,
      borderColor: 'black',
      borderWidth: 1,
    },
    productImage: {
      width: 150,
      height: 150,
      resizeMode: 'cover',
    },
    productName: {
      marginTop: 10,
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    productPrice: {
      marginTop: 5,
      fontSize: 16,
      color: 'green',
    },
    addButton: {
      marginTop: 10,
      backgroundColor: 'blue',
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    addButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={ handleCardPress }>
      <View style={ styles.card }>
        <Image source={ { uri: item.thumbnail } } style={ styles.productImage } />
        <Text style={ styles.productName }>{ item.title }</Text>
        <Text style={ styles.productPrice }>R$ { item.price.toFixed(2) }</Text>
        <TouchableOpacity style={ styles.addButton } onPress={ handleAddToCart }>
          <Text style={ styles.addButtonText }>Adicionar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Card;


