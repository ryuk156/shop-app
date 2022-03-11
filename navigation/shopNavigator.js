import  React from  'react'
import { Platform } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator} from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";


import Colors from "../constants/Colors";

import ProductsOverview from "../screens/shop/ProductsOverview";
import ProductDetail from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProduct from '../screens/user/UserProduct';
import EditProduct from '../screens/user/EditProduct';
import AuthScreen from '../screens/user/AuthScreen';
import { Ionicons } from "@expo/vector-icons";



const  defaultOptions= {
    headerStyle: {
        backgroundColor: Platform.OS==="android"? Colors.primary: Colors.white
    },
    headerTintColor: Platform.OS==="android"? Colors.white: Colors.primary
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverview,
    ProductDetail: ProductDetail,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig =><Ionicons name="md-cart" size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions:  defaultOptions
})


// const CustomDrawer = ()=>{
//     return <View>
//         <Text>
//             SHOP APP
//         </Text>
//     </View>
// }

const  OrdersNavigator  = createStackNavigator({
    Orders: OrderScreen
},{

    navigationOptions: {
        drawerIcon: drawerConfig =><Ionicons name="md-list" size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultOptions
}
)


const  AdminNavigator  = createStackNavigator({
    UserProducts: UserProduct,
    EditProducts:  EditProduct
},{

    navigationOptions: {
        drawerIcon: drawerConfig =><Ionicons name="ios-people" size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultOptions
}
)




const  ShopNavigator = createDrawerNavigator({
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator
},{
    contentOptions:{
        activeBackgroundColor: Colors.primary,
        activeTintColor: Colors.white
    },
   
},)


const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
},{
    // defaultNavigationOptions: defaultOptions
}
)

const  MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Shop: ShopNavigator
})



export default createAppContainer(MainNavigator)