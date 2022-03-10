import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { addToCart } from "../../store/actions/cartAction";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import { fetchProducts } from "../../store/actions/productAction";

const ProductsOverview = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [isRefresh, setIsrefeshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsrefeshing(true);
    try {
      await dispatch(fetchProducts());
    } catch (e) {
      setError(e);
    }
    setIsrefeshing(false);
  }, [dispatch, setError, setIsrefeshing]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProducts
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoader(true);
    loadProducts().then(
      setIsLoader(false)
    );
  }, [dispatch,setIsLoader]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      id: id,
      title: title,
    });
  };

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
  if (!isLoader && products.length == 0) {
    return (
      <View style={styles.center}>
        <Text>No products, please add products</Text>
      </View>
    );
  }

  return (
    <FlatList
    onRefresh={loadProducts}
    refreshing={isRefresh}
    
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <View style={styles.button}>
            <Button
              color={Colors.accent}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.accent}
              title="To Cart"
              onPress={() => {
                dispatch(addToCart(itemData.item));
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverview;

ProductsOverview.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
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
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="cart"
            iconName="cart-outline"
            onPress={() => {
              navData.navigation.navigate("Cart");
            }}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  button: {
    width: 150,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
