import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "./store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const selectUserData = (state: RootState) => state.auth.userData;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectLoading = (state: RootState) => state.auth.loading;