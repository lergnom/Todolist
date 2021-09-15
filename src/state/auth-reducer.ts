import {SetAppErrorType, setAppStatusAC, SetAppStatusType} from "./app-reducer";
import {authAPI, LoginParamsType, ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState;

type ActionTypes = ReturnType<typeof setLoggedIn> | SetAppStatusType | SetAppErrorType;

export const authReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.value};
        }
        case "APP/SET-STATUS": {
            return state;
        }
        case "APP/SET-ERROR": {
            return state;
        }
        default:
            return state
    }
}
//create actions
export const setLoggedIn = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: ResponseType<LoginParamsType>) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(setAppStatusAC('loading'));
    authAPI.login()
        .then(res => {
            if (res.data.resultCode === 0) {
                setLoggedIn(true);
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch);
        })
}
