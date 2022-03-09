import React, { useState } from "react";
import Colors from "../../constants/Colors";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartAction";

const ProductDetail = (props) => {
  const getAllProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const getProductId = props.navigation.getParam("id");
  const getDetail = getAllProducts.find((prod) => prod.id === getProductId);
  const dispatch = useDispatch();
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: getDetail.imageUrl }} />
     
       <View>

        <Text style={styles.desc}>{getDetail.description}</Text>
  
       </View>
     
     <View>
     <Text style={styles.price}>${getDetail.price}</Text>
     </View>

      {/* <View style={styles.button}>
        <Button
          color={Colors.primary}
          title="Add to cart"
          onPress={() => {
            dispatch(addToCart(getDetail.id));
          }}
        />
      </View> */}
    </ScrollView>
  );
};

ProductDetail.navigationOptions = (navData) => {
  const title = navData.navigation.getParam("title");
  return {
    title: title,
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  button: {
    alignItems: "center",
    marginVertical: 20,
  },
  desc: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 20,
    marginHorizontal: 20,
  },
  price: {
    color: "#888",
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default ProductDetail;
