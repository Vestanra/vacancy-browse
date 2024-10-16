import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const selectAccessToken = (state: RootState) => state.auth.loginData.access.accessToken;
export const selectError = (state: RootState) => state.auth.error;
export const selectLoading = (state: RootState) => state.auth.loading;