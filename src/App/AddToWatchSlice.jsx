import { createSlice} from '@reduxjs/toolkit';
import { AddMovieToWatch } from '../Utils';

const initialState = {
  watches: [],
  
};


const WatchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
  AddToWatch:(state,action)=>{
    state.watches=AddMovieToWatch(action.payload,state.watches)
  },
 remove:(state,action)=>{
    state.watches=state.watches.filter(item => item.id !== action.payload )
  },
 clear:(state)=>{
    state.watches=[]
  },
  },
 
});

export const {AddToWatch,remove,clear} = WatchSlice.actions;
export const selectWatch = ({watch}) => watch;
export default WatchSlice.reducer;