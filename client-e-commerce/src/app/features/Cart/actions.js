import { ADD_ITEM, CLEAR_ITEMS, REMOVE_ITEM, SET_ITEMS } from "./constants";

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: {
    item: {
      ...item,
      product: item.product || item,
    },
  },
});

export const removeItem = (item) => ({
  type: REMOVE_ITEM,
  payload: {
    item: item,
  },
});

export const clearItems = () => ({
  type: CLEAR_ITEMS,
});

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: { items },
});
