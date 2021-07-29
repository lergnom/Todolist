import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>