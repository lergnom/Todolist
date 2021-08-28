import {FilterValueType} from "../App";
import {Dispatch} from "redux";
import {TodolistAPI, TodolistType, TodoType} from "../api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


type ActionType = RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter | SetTodolistsType

const initialState: Array<TodolistDomainType> = []

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "SET_TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all'}));
        case 'REMOVE-TODOLIST-ID':
            return [...state].filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST': {
            return [{...action.todolist, filter: 'all'}, ...state];

        }
        case 'CHANGE-TODOLIST-TITLE':
            return [...state].map(tl => tl.id === action.id ? {...tl, title: action.title} : {...tl})
        case 'CHANGE-TODOLIST-FILTER':
            return [...state].map(tl => tl.id === action.id ? {...tl, filter: action.filter} : {...tl})
        default:
            return state

    }
}

export type RemoveTodolist = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistid: string) => {
    return {type: 'REMOVE-TODOLIST-ID', id: todolistid} as const;
}

export type AddTodolist = ReturnType<typeof addedTodolistAC>;
export const addedTodolistAC = (todolist: TodoType) => ({type: 'ADD-TODOLIST', todolist}) as const;

type ChangeTodolistTitle = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    title,
    id
}) as const;

type ChangeTodolistFilter = ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    filter,
    id
}) as const;

export type SetTodolistsType = ReturnType<typeof setTodolists>;
export const setTodolists = (todolists: Array<TodoType>) => ({type: 'SET_TODOLISTS', todolists}) as const;


export const fetchTodolists = () => (dispatch: Dispatch) => {
    TodolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    TodolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const todo = res.data.data;
                dispatch(addedTodolistAC(todo));
            }
        })
}

export const deleteTodolist = (todolistId: string) => (dispatch: Dispatch) => {
    TodolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId));
        })
}

export const changeTodolistTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    TodolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            res.data.resultCode === 0 && dispatch(changeTodolistTitleAC(todolistId, title));
        })

}