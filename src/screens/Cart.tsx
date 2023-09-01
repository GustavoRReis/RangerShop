import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../Context/CartProvider';
import { CartItem } from '../interfaces/interfacesShop';
import { useDark } from '../Context/DarkMode';

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const { darkMode } = useDark();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkMode ? '#121212' : '#fff',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: darkMode ? 'white' : 'black',
    },
    cartItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
    },
    image: {
      width: 80,
      height: 80,
      marginRight: 10,
    },
    itemDetails: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      color: darkMode ? 'white' : 'black',
    },
    removeItem: {
      color: 'red',
      marginTop: 5,
    },
    emptyCartMessage: {
      fontSize: 16,
      textAlign: 'center',
      color: darkMode ? 'white' : 'black',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    totalLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? 'white' : 'black',
    },
    totalAmount: {
      fontSize: 18,
      color: darkMode ? 'white' : 'black',
    },
  });

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={ styles.cartItem }>
      <Image style={ styles.image } source={ { uri: item.thumbnail } } />
      <View style={ styles.itemDetails }>
        <Text style={ styles.itemTitle }>{ item.title }</Text>
        <Text style={ styles.itemTitle }>R$ { item.price.toFixed(2) }</Text>
        <TouchableOpacity onPress={ () => removeFromCart(item.id) }>
          <Text style={ styles.removeItem }>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>Carrinho de compras</Text>
      { cart.length === 0 ? (
        <Text style={ styles.emptyCartMessage }>Carrinho vazio</Text>
      ) : (
        <>
            <FlatList
              data={ cart as any }
              renderItem={ renderItem }
              keyExtractor={ (item: CartItem, index: number) =>
                item.id.toString() + index.toString()
              }
            />

          <View style={ styles.totalContainer }>
            <Text style={ styles.totalLabel }>Total:</Text>
            <Text style={ styles.totalAmount }>
              R$ { calculateTotal().toFixed(2) }
            </Text>
          </View>
        </>
      ) }
    </View>
  );
}


