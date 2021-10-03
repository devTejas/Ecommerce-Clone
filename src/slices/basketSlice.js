import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  numberOfItems: 0,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // here action will be the object(product) to be pushed
    addToBasket: (state, action) => {
      if (state.items[action.payload.id]?.count === 0) {
        delete state.items[action.payload.id];
        state.numberOfItems = state.numberOfItems - 1;
      } else {
        state.items = { ...state.items, [action.payload.id]: action.payload };

        if (state.items[action.payload.id]?.count === 1) {
          state.numberOfItems = state.numberOfItems + 1;
        }
      }
    },
  },
});

export const { addToBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectNumberOfItems = (state) => state.basket.numberOfItems;

export default basketSlice.reducer;

/*
state
{
  items :
  {
    prod_id :
    {
        prod_id,
        title,
        description,
        price,
        category,
        image,
        rating,
        isPrime,
        count,
    }
  },
  numberOfItems : <numberOfItemsInCart>
}  */
