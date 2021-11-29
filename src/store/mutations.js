import {
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation-types";

export default {
  // mutations 唯一的目的就是修改 state里面的状态
  // mutations 中的每个方法尽可能完成的事件比较单一，一个函数就只做一件事情，并且这个事情很明确
  //   一般函数有复杂的逻辑，或者是异步操作，就放在 actions 里面

  // 该商品的数量加一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  // 将商品加入购物车
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}
