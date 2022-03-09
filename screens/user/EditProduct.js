import React, { useState, useEffect, useCallback } from "react";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  FlatList,
  StyleSheet,
  Button,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import {
  deleteProduct,
  createProduct,
  updateProduct,
} from "../../store/actions/productAction";

const EditProduct = (props) => {
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState();
  const prodId = props.navigation.getParam("productid");
  const dispatch = useDispatch();
  console.log(prodId);

  const editedProduct = useSelector(
    (state) =>
      state.products &&
      state.products.userProducts.find((prod) => prod.id === prodId)
  );
  console.log(editedProduct);
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageURL] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [desc, setDesc] = useState(
    editedProduct ? editedProduct.description : ""
  );


  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, desc, imageUrl));
      props.navigation.goBack();
    } else {
     dispatch(createProduct(title, desc, imageUrl, +price));
      props.navigation.goBack();
    }
    // try {
    //   setError(null);
    //   setIsLoader(true);
     
    // } catch (e) {
    //   setError(e);
    //   setIsLoader(false);
    // }
  }, [dispatch, prodId, title, desc, imageUrl, price]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  // if (error) {
  //   return (
  //     <View style={styles.center}>
  //       <Text>Something went wrong, please try again</Text>
  //       <View style={{ marginTop: 8 }}>
  //         <Button color={Colors.primary} title="Retry" onPress={loadProducts} />
  //       </View>
  //     </View>
  //   );
  // }

  // if (isLoader) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color={Colors.primary} />
  //     </View>
  //   );
  // }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => {
              setImageURL(text);
            }}
            keyboardType="default"
            returnKeyType="next"
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => {
                setPrice(text);
              }}
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View>
        )}

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={desc}
            onChangeText={(text) => {
              setDesc(text);
            }}
            keyboardType="default"
            returnKeyType="Done"
          />
        </View>
      </View>
    </ScrollView>
  );
};

EditProduct.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");
  return {
    title: navData.navigation.getParam("productid")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="save" iconName="ios-checkmark" onPress={submitHandler} />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProduct;
