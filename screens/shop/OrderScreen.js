import React from "react";
import { View, Text, FlatList } from "react-native";

import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/OrderItem";

const OrderScreen = (props) => {
  const order = useSelector((state) => state.order.order);
  return (
    <FlatList
      data={order}
      renderItem={(itemData) => (
        <OrderItem
          totalAmount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrderScreen.navigationOptions = (navData) => {
  return {
    title: "Your Orders",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

export default OrderScreen;
