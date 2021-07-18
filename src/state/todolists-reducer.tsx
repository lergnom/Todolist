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

export const todolistReducer = (state: Array<TodoListPropsType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST-ID':
            return [...state].filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return [...state].map(tl => tl.id === action.id ? {...tl, title: action.title} : {...tl})
        case 'CHANGE-TODOLIST-FILTER':
            return [...state].map(tl => tl.id === action.id ? {...tl, filter: action.filter} : {...tl})
        default:
            throw new Error("I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistid: string): RemoveTodolist => {
    return {type: 'REMOVE-TODOLIST-ID', id: todolistid}

}

export const AddedTodolistAC = (title: string): AddTodolist => {
    return {type: 'ADD-TODOLIST', title}
}


export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitle => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, id}
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeTodolistFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter, id}
}