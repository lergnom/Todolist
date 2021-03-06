import {v1} from "uuid";
import {FilterValueType, TodoListPropsType} from "../App";
import {
    addedTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolists-reducer";
import {Remove} from "@material-ui/icons";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListPropsType>

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be removed', () => {
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
    let newTodolistTitle = "New Todolist"
    const endState = todolistReducer(startState, addedTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'NewTodoListTitle'
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle))
    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('test change todolist filter', () => {
    let newFilter: FilterValueType = "completed"
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId2, newFilter))
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})