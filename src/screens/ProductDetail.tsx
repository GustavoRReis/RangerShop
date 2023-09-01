import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useCart } from '../Context/CartProvider';
import { Product, ProductDetailProps } from '../interfaces/interfacesShop';
import { useDark } from '../Context/DarkMode';

const ProductDetail = ({ route, navigation } : ProductDetailProps) => {
  const { item }: { item: Product } = route.params;
  const { addToCart } = useCart(); 
  const { darkMode } = useDark();

  const handleAddToCart = () => {
    addToCart(item); 
    navigation.navigate('Carrinho de compras');
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: darkMode ? '#121212' : 'white', 
      justifyContent: 'flex-start',
      padding: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: darkMode ? 'yellow' : 'blue', 
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    productContainer: {
      width: '100%',
      alignItems: 'center',
    },
    productImage: {
      width: 200,
      height: 200,
      marginBottom: 10,
    },
    productTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'left',
      letterSpacing: 2,
      width: '100%',
      color: darkMode ? 'white' : 'black',
    },
    productPrice: {
      fontSize: 30,
      marginBottom: 20,
      width: '100%',
      color: darkMode ? 'white' : 'black',
    },
    productInfo: {
      borderWidth: 1,
      borderColor: 'gray',
      padding: 10,
      borderRadius: 5,
      width: '100%',
    },
    productInfoText: {
      fontSize: 16,
      marginBottom: 5,
      color: darkMode ? 'white' : 'black',
    },
    addToCartButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    addToCartButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Ranger Shop</Text>
      <View style={ styles.productContainer }>
        <Text style={ styles.productTitle }>{ item.title }</Text>
        <Image source={ { uri: item.thumbnail } } style={ styles.productImage } />
        <Text style={ styles.productPrice }>R$ { item.price.toFixed(2) }</Text>
        <View style={ styles.productInfo }>
          <Text style={ styles.productInfoText }>
            Disponibilidade: { item.available_quantity } unidades
          </Text>
          <Text style={ styles.productInfoText }>
            Vendedor: { item.seller.nickname }
          </Text>
          <Text style={ styles.productInfoText }>
            Cidade: { item.seller_address.city.name }, Estado:{ ' ' }
            { item.seller_address.state.name }
          </Text>
        </View>
        <TouchableOpacity
          onPress={ handleAddToCart }
          style={ styles.addToCartButton }
        >
          <Text style={ styles.addToCartButtonText }>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default ProductDetail;
