import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface Item {
  id: number;
  title: string;
}

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, deleteItem } = itemSlice.actions;

export const selectItems = (state: RootState) => state.items.items;

export default itemSlice.reducer;
