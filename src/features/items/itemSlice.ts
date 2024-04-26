// src/features/items/itemSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchItems as fetchItemsAPI } from '../../api/api';

interface Item {
  id: number;
  title: string;
}

interface ItemState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ItemState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await fetchItemsAPI();
    return response.data;
  }
);

const itemSlice = createSlice({
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
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// Export actions
export const { addItem, updateItem, deleteItem } = itemSlice.actions;

export const selectItems = (state: RootState) => state.items.items;
export const selectItemsStatus = (state: RootState) => state.items.status;

export default itemSlice.reducer;


/*
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { fetchItems as fetchItemsAPI } from '../../api/api';

interface Item {
  id: number;
  title: string;
}

interface ItemState {
  items: Item[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: ItemState = {
  items: [],
  status: 'idle',
};

export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await fetchItemsAPI();
    return response.data;
  }
);

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // existing reducers can remain here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectItems = (state: RootState) => state.items.items;
export const selectItemsStatus = (state: RootState) => state.items.status;

export default itemSlice.reducer;

*/

/*
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
*/