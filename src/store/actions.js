import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default  {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // payload 是新添加的商品
      let oldProduct = null;
      for (let item of context.state.cartList) {
        if (item.iid === payload.iid) {
          oldProduct = item;
        }
      }

      // 2 判断 oldProduct
      if (oldProduct) {
        // oldProduct.count += 1
        // 必须要通过 mutations 来修改 state
        context.commit(ADD_COUNTER,oldProduct)
        resolve('数量加一')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART,payload)
        resolve('添加新的商品')
      }
    })
  }
}
