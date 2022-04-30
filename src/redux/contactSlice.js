import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const contactSlice = createSlice({
  name: "contacts",
  initialState: { items: [], filter: "" },
  reducers: {
    add(state, action) {
      state.items.push(action.payload);
    },
    deleting(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

const persistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactSlice.reducer
);

export const { add, deleting, setFilter } = contactSlice.actions;

// Selectors

export const getContacts = (state) => state.contacts.items;
export const getFilter = (state) => state.contacts.filter;
