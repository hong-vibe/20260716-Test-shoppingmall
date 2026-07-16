import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';

// 전체 앱에서 공유할 공용 보관함(Store)을 생성합니다.
export const store = configureStore({
  reducer: {
    // 장바구니 서랍(cart)을 등록합니다.
    cart: cartReducer,
  },
});
