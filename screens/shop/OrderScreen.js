import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/OrderItem";
import { fetchOrders } from "../../store/actions/orderAction";

const OrderScreen = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [isRefresh, setIsrefeshing] = useState(false);
  consr[(error, setError)] = useState();
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();

  const loadOrder = useCallback(async () => {
    try {
      setError(null)
      setIsrefeshing(true)
      await dispatch(fetchOrders());
    } catch (e) {
      setError(e);
    }
    setIsrefeshing(false)
  }, [dispatch, setIsLoader]);
  
  useEffect(() => {
    setIsLoader(true);
    loadOrder().then(()=>{
      setIsLoader(false);
    });
    
  }, [dispatch]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something went wrong, please try again</Text>
        <View style={{ marginTop: 8 }}>
          <Button color={Colors.primary} title="Retry" onPress={loadProducts} />
        </View>
      </View>
    );
  }

  if (isLoader) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoader && order.length == 0) {
    return (
      <View style={styles.center}>
        <Text>No products, please add products</Text>
      </View>
    );
  }

  return (
    <FlatList
    onRefresh={loadOrder}
    refreshControl={isRefresh}
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderScreen;
