import React from "react";

import { View, Alert, FlatList, StyleSheet, Button } from "react-native";
import ProductItem from "../../components/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/productAction";

const UserProduct = (props) => {
  const userProduct = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const handleEditScreen = (id) => {
    props.navigation.navigate("EditProducts", { productid: id });
  };

 

  const deleteHandler = (id) => {
    Alert.alert(
      "Delete Product",
      "do you really want to delete this product?",[
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      }]
    );
  };

  return (
    <FlatList
      data={userProduct}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            handleEditScreen(itemData.item.id);
          }}
        >
          <View style={styles.button}>
            <Button
              color={Colors.accent}
              title="Edit"
              onPress={() => {
                // props.navigation.navigate("ProductDetail", {
                //   id: itemData.item.id,
                //   title: itemData.item.title,
                // });
                handleEditScreen(itemData.item.id);
              }}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={Colors.accent}
              title="Delete"
              onPress={() => {
                deleteHandler(itemData.item.id);
              }}
            />
          </View>
        </ProductItem>
      )}
    />
  );
};

UserProduct.navigationOptions = (navData) => {
  return {
    title: "User products",
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
            title="add"
            iconName="ios-add"
            onPress={() => {
              navData.navigation.navigate("EditProducts");
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
});

export default UserProduct;
