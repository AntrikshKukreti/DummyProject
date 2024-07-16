import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface UserState {
  Search: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  searchResults:SearchResults [];
}
export type SearchResults = {
  category: string;
  description: string;
  image: string;
  price: number | null;
  id: number;
  title: string;
};

// Define the initial state using that type
const initialState: UserState = {
  Search: '',
  status: 'idle',
  error: null,
  searchResults: [],
  // searchResults: {
  //   category: '',
  //   description: '',
  //   image: '',
  //   price: null,
  //   id: 0,
  //   title: '',
  // },
};

// Create an async thunk for the API call
export const fetchSearchResults = createAsyncThunk(
  'user/fetchSearchResults',
  async (searchTerm: string, {rejectWithValue}) => {
    try {
      // in this test API searchTerm is static 'products'
      const response = await fetch(`https://fakestoreapi.com/${searchTerm}`, {
        method: 'GET',
      });
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error);
    }
  },
);

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.Search = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchResults.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Handle the fetched data
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = 'Something went wrong';
        state.searchResults = [];
      });
  },
});

export const {setSearch} = userSlice.actions;
export default userSlice.reducer;
