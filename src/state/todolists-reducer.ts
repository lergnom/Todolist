import {Dispatch} from 'redux';
import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodoListType
    | ChangeTodolistEntityStatusType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.entityStatus = action.entityStatus;
            }
            return [...state]
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            // const todolist: TodolistDomainType = {...action.todolist, filter: 'all'};
            return [{...action.todolist, filter: 'all', entityStatus: 'succeeded'}, ...state];
        }
        case  'CHANGE-TODOLIST-TITLE' : {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case
        'CHANGE-TODOLIST-FILTER'
        : {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case
        'SET_TODOLIST'
        :
            return action.todoLists.map(tl => ({...tl, filter: 'all', entityStatus: 'succeeded'}));

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export type SetTodoListType = {
    type: 'SET_TODOLIST',
    todoLists: Array<TodolistType>
}
export const setTodolist = (todoLists: Array<TodolistType>): SetTodoListType => ({type: 'SET_TODOLIST', todoLists});

export const fetchTodolists = () => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'));
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolist(res.data));
                dispatch(setAppStatusAC('succeeded'));
            })
            .catch(error => {
                dispatch(setAppErrorAC(error.message));
                dispatch(setAppStatusAC('failed'));
            });
    }
}
export const removeTodolistTC = (id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(changeTodolistEntityStatusAC(id, 'loading'));
    todolistsAPI.deleteTodolist(id)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(id));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))

            }

        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message));
            dispatch(setAppStatusAC('failed'));
        });
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))

            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message));
            dispatch(setAppStatusAC('failed'));
        });
}

export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'));

    todolistsAPI.updateTodolist(id, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC('succeeded'));

            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC('Some error occurred'))
                }
                dispatch(setAppStatusAC('failed'))
            }
        })
        .catch(error => {
            dispatch(setAppErrorAC(error.message));
            dispatch(setAppStatusAC('failed'));
        });
}


type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>;
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
}) as const;