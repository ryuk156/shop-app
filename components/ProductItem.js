import React, { Children } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import * as Animatable from 'react-native-animatable';

const ProductItem = (props) => {
  let TouchComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= "21") {
    TouchComp = TouchableNativeFeedback;
  }

  return (
      <Animatable.View style={styles.product}  animation="fadeInUp"
      
       
     >
           <View style={styles.touchable}>
    <TouchComp onPress={props.onSelect} useForeground>
     
        <View >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: props.image }} />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price}</Text>
          </View>

          <View style={styles.actions}>
            {props.children}
          </View>
        </View>
     
    </TouchComp>
    </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 6,
    borderRadius: 10,
    backgroundColor: Colors.white,
    height: 300,
    margin: 20,
    
  },
  touchable:{
    overflow: "hidden",
    borderRadius: 10
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    padding: 12,
  },
 
});

export default ProductItem;
