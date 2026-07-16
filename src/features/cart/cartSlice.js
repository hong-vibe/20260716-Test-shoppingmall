import { createSlice } from '@reduxjs/toolkit';

// 장바구니 초기 상태 (처음에는 아무것도 담겨있지 않은 상태)
const initialState = {
  items: [], // [{ id, title, price, image, quantity }]
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. 장바구니에 상품 담기
    addToCart: (state, action) => {
      const product = action.payload;
      // 추가할 수량을 정합니다. payload에 quantity가 적혀있으면 그 값을 쓰고, 없으면 기본값 1을 씁니다.
      const addQty = product.quantity || 1;
      
      // 이미 장바구니에 똑같은 상품이 들어있는지 확인합니다.
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        // 이미 들어있다면, 수량을 지정한 만큼 더 늘립니다.
        existingItem.quantity += addQty;
      } else {
        // 처음 담는 상품이라면, 상품 정보에 수량을 지정해서 장바구니 목록에 추가합니다.
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: addQty,
        });
      }
    },
    // 2. 장바구니 물건 수량 직접 조작하기 (+, - 버튼이나 직접 입력)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        // 최소 수량은 1개로 제한합니다. (1보다 작아질 수 없음)
        existingItem.quantity = Math.max(1, quantity);
      }
    },
    // 3. 특정 상품 장바구니에서 삭제하기
    removeFromCart: (state, action) => {
      const id = action.payload;
      // 해당 상품을 제외한 나머지 상품들만 필터링해서 남깁니다.
      state.items = state.items.filter(item => item.id !== id);
    },
    // 4. 장바구니 완전히 비우기
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// 외부에서 이 주문서(Action)들을 호출할 수 있도록 내보냅니다.
export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;

// 돋보기(Selectors): 상태창에서 필요한 정보만 조작해서 가져오는 헬퍼 함수들
// 장바구니 목록 가져오기
export const selectCartItems = (state) => state.cart.items;

// 장바구니에 담긴 물건들의 총 개수 세기 (배지 표시용)
export const selectCartCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

// 장바구니 물건들의 실시간 총 결제금액 계산하기 (단가 * 수량 의 총합)
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;
