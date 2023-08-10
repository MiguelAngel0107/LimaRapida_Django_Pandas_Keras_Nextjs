import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatsState {
  chats: chatProps[] | null;
}
export interface chatProps {
  id_chat: number;
  nombre_chat: string;
  unique_code: string;
  participants: number[];
}
const initialState: ChatsState = {
  chats: null,
};

const chatsSlice = createSlice({
  name: "Chats",
  initialState,
  reducers: {
    GET_CHATS_SUCCESS(state, action) {
      let payload = action.payload;

      return {
        ...state,
        chats: payload,
      };
    },
    GET_CHATS_FAIL() {},
  },
});

export const { GET_CHATS_SUCCESS, GET_CHATS_FAIL } = chatsSlice.actions;
export default chatsSlice.reducer;
