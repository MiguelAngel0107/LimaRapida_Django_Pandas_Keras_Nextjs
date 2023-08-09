import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PerfilState {
  profile: profileProps | null;
  profile_public: profilePublicProps | null;
  request_friends: requestFriendProps[] | null;
}

interface profileProps {
  id: number;
  picture: string;
  banner: string;
  verified: string;
  coins: string;
  date_created: string;
  city: string;
  phone: string;
  country_region: string;
  location: null | string;
  url: null | string;
  birthday: null | string;
  bio: null | string;
  user: number;
  friends: profileFriendsProps[] | null;
}

interface profilePublicProps {
  id: number;
  name: string | null;
  picture: string;
  banner: string;
  verified: string;
  url: null | string;
  birthday: null | string;
  bio: null | string;
  user: number;
}

interface profileFriendsProps {
  id: number;
  picture: string;
  banner: string;
  verified: string;
  url: null | string;
  birthday: null | string;
  bio: null | string;
  user: number;
  friends: profileFriendsProps[] | null;
}

interface requestFriendProps {
  id_request: number;
  from_user: string;
  status: string;
  created_at: string;
}

const initialState: PerfilState = {
  profile: null,
  profile_public: null,
  request_friends: null,
};

const perfilSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    GET_DATA_SUCCESS(state, action) {
      let payload = action.payload;

      return {
        ...state,
        profile: payload,
      };
    },
    GET_DATA_FAIL() {},
    GET_PUBLIC_PROFILE_SUCCESS(state, actions) {
      let payload = actions.payload;
      return {
        ...state,
        profile_public: payload,
      };
    },
    GET_PUBLIC_PROFILE_FAIL() {},

    GET_REQUEST_FRIENDS_SUCCESS(state, actions) {
      let payload = actions.payload;
      return {
        ...state,
        request_friends: payload,
      };
    },
    GET_REQUEST_FRIENDS_FAIL() {},
  },
});

export const {
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  GET_PUBLIC_PROFILE_SUCCESS,
  GET_PUBLIC_PROFILE_FAIL,
  GET_REQUEST_FRIENDS_SUCCESS,
  GET_REQUEST_FRIENDS_FAIL,
} = perfilSlice.actions;
export default perfilSlice.reducer;
