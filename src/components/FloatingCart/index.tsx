import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {
  Container,
  CartPricing,
  CartButton,
  CartButtonText,
  CartTotalPrice,
} from './styles';

import formatValue from '../../utils/formatValue';

import { useCart } from '../../hooks/cart';

// Calculo do total
// Navegação no clique do TouchableHighlight

const FloatingCart: React.FC = () => {
  const { products } = useCart();

  const navigation = useNavigation();

  const cartTotal = useMemo(() => {
    // console.log('Tipo de products: ');
    // console.log(typeof products);

    // const totalOfCart = products.reduce((total, p) => {
    //   total += p.price * p.quantity;
    //   return total;
    // }, 0);

    return formatValue(50);
  }, [products]);

  const totalItensInCart = useMemo(() => {
    console.log(typeof products);

    if (typeof products != null) {
      products.map(p => {
        console.log('################');
        console.log(p.title);
        console.log(p.quantity);
        console.log('################');
      });
      const totalQtdOfCart = products.reduce((totalQtd, p) => {
        totalQtd += p.quantity;
        return totalQtd;
      }, 0);

      return 50;
    }
  }, [products]);

  return (
    <Container>
      <CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon name="shopping-cart" size={24} color="#fff" />
        <CartButtonText>{`${totalItensInCart} itens`}</CartButtonText>
      </CartButton>

      <CartPricing>
        <CartTotalPrice>{cartTotal}</CartTotalPrice>
      </CartPricing>
    </Container>
  );
};

export default FloatingCart;
