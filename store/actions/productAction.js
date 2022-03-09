import Product from "../../models/product";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://shop-app-3a7e4-default-rtdb.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const loadedProducts = [];
      console.log(resData);
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      console.log(loadedProducts);
      dispatch({
        type: SET_PRODUCT,
        products: loadedProducts,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const  response=  await fetch(
    `https://shop-app-3a7e4-default-rtdb.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
        // body: JSON.stringify({
        //   title,
        //   description,
        //   imageUrl,
        //   price,
        // }),
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://shop-app-3a7e4-default-rtdb.firebaseio.com/products.json`,
      {
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
        }),
      }
    );
   
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
      },
    });
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
  const  response=  await fetch(
      `https://shop-app-3a7e4-default-rtdb.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
