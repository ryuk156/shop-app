import React, { useState } from "react";
import Colors from "../constants/Colors";
import { View, Text, Button, StyleSheet } from "react-native";

import CartItem from "./CartItem";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.totalAmount?.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails?"Hide Details":"Show Details"}
        onPress={()=>setShowDetails(!showDetails)}
      />
      {showDetails && (
        <View style={styles.details}>
          {props.items.map((item) => {
            return (
              <CartItem
                quantity={item.quantity}
                amount={item.sum}
                title={item.productTitle}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: Colors.white,
    margin: 20,
    padding: 14,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  totalAmount: {
    fontWeight: "500",
    fontSize: 18,
    color: "red",
  },
  date: {
    fontSize: 18,
    color: "#998",
  },
  details:{
    width: 300,
    marginTop: 20,
    
  }
});

export default OrderItem;
