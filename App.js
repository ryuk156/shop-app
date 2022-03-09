import React from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ProductsNavigator from "./navigation/shopNavigator";

import productReducer from "./store/reducers/productReducer";
import cartReducer from "./store/reducers/cartReducer";
import orderReducer from "./store/reducers/orderReducer";
import ReduxThunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk) , composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
     <ProductsNavigator />
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
