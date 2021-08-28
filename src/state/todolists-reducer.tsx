import {FilterValueType, TodoListPropsType} from "../App";
import {v1} from "uuid";
import {Dispatch} from "redux";
import {TodolistAPI, TodoType} from "../api/todolist-api";

type ActionType = RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter

const initialState: Array<TodoListPropsType> = []

export const todolistReducer = (state: Array<TodoListPropsType> = initialState, action: ActionType): Array<TodoListPropsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST-ID':
            return [...state].filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
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
export const addedTodolistAC = (title: string) => ({type: 'ADD-TODOLIST', title, todolistId: v1()}) as const;

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

type SetTodolistsType = ReturnType<typeof setTodolists>;
export const setTodolists = (todolists: Array<TodoType>) => ({type: 'SET_TODOLISTS', todolists}) as const;


export const fetchTodolists = () => (dispatch: Dispatch) => {
    TodolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolists(res.data))
        })
}