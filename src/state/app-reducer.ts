export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type RequestErrorType = string | null;

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as RequestErrorType,
};

type InitialStateType = typeof initialState;
type ActionsType = SetAppStatusType | SetAppErrorType;

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, error: action.error};
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        default:
            return state;
    }
};

 export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const;

export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export const setAppErrorAC = (error: RequestErrorType) => ({type: 'APP/SET-ERROR', error}) as const;
