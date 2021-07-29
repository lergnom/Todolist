import {FilterValueType, TodoListPropsType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTodolist | AddTodolist | ChangeTodolistTitle | ChangeTodolistFilter

export type RemoveTodolist = {
    type: 'REMOVE-TODOLIST-ID'
    id: string
}

export type AddTodolist = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}
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
            // throw new Error("I don't understand this type")
            return state

    }
}

export const removeTodolistAC = (todolistid: string): RemoveTodolist => {
    return {type: 'REMOVE-TODOLIST-ID', id: todolistid}

}

export const addedTodolistAC = (title: string): AddTodolist => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}


export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}