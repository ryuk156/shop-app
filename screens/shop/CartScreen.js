import React, { useState } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import CartItem from "../../components/CartItem";
import { removeFromCart } from "../../store/actions/cartAction";
import { addOrder } from "../../store/actions/orderAction";

const CartScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoader, setIsLoader] = useState(false);
  const getCartTotal = useSelector((state) => state.cart.totalAmount);
  const getCartItem = useSelector((state) => {
    let transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const handleAddOrder = async () => {
    setIsLoader(true);
    await dispatch(addOrder(getCartItem, getCartTotal));
    setIsLoader(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${getCartTotal.toFixed(2)}</Text>
        </Text>
        <View style={styles.Button}>
          {isLoader ? (
              <View style={styles.center}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <Button
              title="Order Now"
              color={Colors.accent}
              disabled={getCartItem.length === 0}
              onPress={handleAddOrder}
            />
          )}
        </View>
      </View>
      <View style={styles.heading}>
        <Text>CART ITEMS</Text>
        <FlatList
          data={getCartItem}
          keyExtractor={(item) => item.productId}
          renderItem={(itemData) => (
            <CartItem
              deletable
              quantity={itemData.item.quantity}
              amount={itemData.item.productPrice}
              title={itemData.item.productTitle}
              onRemove={() => {
                dispatch(removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
    flex: 1,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 20,
    shadowColor: "grey",
    shadowOpacity: 0.026,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    width: "100%",
    elevation: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },

  summaryText: {
    fontSize: 20,
    fontWeight: "600",
  },
  amount: {
    color: Colors.accent,
    fontSize: 20,
    fontWeight: "bold",
  },
  heading: {
    marginLeft: 5,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartScreen;
