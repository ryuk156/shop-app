import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemSummary}>
        <Text style={styles.cartItemQunatity}>{props.quantity}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <View style={styles.cartItemSummary}>
        <Text style={styles.amount}>${props.amount}</Text>
        {props.deletable && (
          <TouchableOpacity onPress={props.onRemove} style={styles.trash}>
            <Ionicons name="trash-outline" color="red" size={23} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 18,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 6,
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    overflow: "hidden",
  },
  cartItemSummary: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartItemQunatity: {
    fontSize: 18,
    padding: 4,
    color: "black",
    fontWeight: "700",
  },
  title: {
    fontSize: 18,
  },
  amount: {
    fontSize: 18,
  },
  trash: {
    marginLeft: 20,
  },
});

export default CartItem;
