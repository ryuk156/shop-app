import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () =>{
    return async dispatch =>{
        try {
            const response = await fetch(
              "https://shop-app-3a7e4-default-rtdb.firebaseio.com/orders/u1.json"
            );
      
            if (!response.ok) {
              throw new Error("Something went wrong!");
            }
            const resData = await response.json();
            const loadedOrders = [];
           
            for (const key in resData) {
              loadedOrders.push(
                new Order(
                  key,
                  resData[key].cartItems,
                  resData[key].totalAmount,
                  resData[key].description,
                  new Date(resData[key].date)
                )
              );
            }
      
        dispatch({
            type: SET_ORDER,
            orders: loadedOrders
        })
     }catch(e){
         throw e
     }
    }

   

}

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch) => {
    const date= new Date()
    const response = await fetch(
        `https://shop-app-3a7e4-default-rtdb.firebaseio.com/orders/u1.json`,
        {
          method: "POST",
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date: date.toISOstring()
          }),
        }
      );
     
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {id: resData.name, items: cartItems, amount: totalAmount,  date: date},
    });
  };
};
