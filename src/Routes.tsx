import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack'

import Home from "./screens/Home";
import Cart from "./screens/Cart";
import ProductDetail from "./screens/ProductDetail";


const Tab = createStackNavigator();

export default function Routes() {
  return <NavigationContainer>
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={ Home } options={ {
        headerShown: false,
      } } />
      <Tab.Screen name="Detalhes do Produto" component={ ProductDetail as any }  />
      <Tab.Screen name="Carrinho de compras" component={ Cart } />

    </Tab.Navigator>
  </NavigationContainer>
}
