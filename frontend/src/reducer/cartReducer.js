const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
      let { id, flavour,wt, amount,bname, product,customize,detail } = action.payload;
        // tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem.id ==   id + flavour + wt,
    );
    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id ==   id + flavour + wt) {
          let newAmount = curElem.amount + amount;
          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,

            amount: newAmount,
          };
        } else {
          return curElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        id: id + flavour + wt,
        cakeid:id,
        name: product.name,
        flavour,
        wt,
        amount,
        bname,
        customize,
        detail,
        isConfirmed:"processing",
        image: product.image,
        price: product.category!=="pestry"? product.price * wt: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }
  // to set the increment and decrement
  if (action.type === "SET_DECREMENT") {
    
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        
        let decAmount = curElem.amount - 1;
        if (decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount: decAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;
       
        return {
          ...curElem,
          amount: incAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }
  
    if (action.type === "REMOVE_ITEM") {
      let updatedCart = state.cart.filter(
        (curItem) => curItem.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
    }
  

      // to empty or to clear to cart
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }
  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
      let { amount } = curElem;
      initialVal = initialVal + amount;
      return initialVal;
    }, 0);
    return {
      ...state,
      total_item: updatedItemVal,
    };
  }
  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((initialVal, curElem) => {
      let { price, amount } = curElem;
      initialVal = initialVal + price * amount;
      
      return initialVal;
    }, 0);
    return {
      ...state,
      total_price,
    };
  }
    return state;
  };
  
  export default cartReducer;