
export interface CartItem {
  id: number;
  title: string;
  thumbnail: string,
  price: number,
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
}

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  available_quantity: number;
  seller: {
    nickname: string;
  };
  seller_address: {
    city: {
      name: string;
    };
    state: {
      name: string;
    };
  };
}

export interface ProductDetailProps {
  route: { params: { item: Product } } | any;
  navigation: any;
}

export interface CardProps {
  item: Product;
  addToCart: (item: Product) => void;
}
