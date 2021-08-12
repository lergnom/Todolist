import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addedTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "completed" | "active"


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, tlID: string) => void
    changeFilter: (value: FilterValueType, tlID: string) => void
    addTask: (title: string, tlID: string) => void
    checkBox: (id: string, isDone: boolean, tlID: string) => void
    filter: FilterValueType
    tlID: string
    removeList: (tlID: string) => void
    onChangeTitle: (id: string, newTitle: string, tlID: string) => void
    onChangeTodoListTitle: (newTitle: string, tlID: string) => void
}

export type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TodoListTaskTypeProps = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    console.log("AppWithReducer")

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    let [todoLists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'active'}
    ])


    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Rest api", isDone: false},
            {id: v1(), title: "graphQL", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "MILK", isDone: true},
            {id: v1(), title: "BRAD", isDone: true},
            {id: v1(), title: "CHEEZE", isDone: true},
        ]
    })

    function removeTask(id: string, tlID: string) {
        dispatchToTasks(removeTaskAC(id, tlID))
    }

    function addTask(title: string, tlID: string) {
        dispatchToTasks(addTaskAC(title, tlID))
    }

    function checkBox(id: string, isDone: boolean, tlID: string) {
        dispatchToTasks(changeTaskStatusAC(id, isDone, tlID))
    }

    function changeFilter(value: FilterValueType, tlID: string) {
        dispatchToTodolists(changeTodolistFilterAC(tlID, value))
    }

    function removeList(tlID: string) {
        dispatchToTodolists(removeTodolistAC(tlID))
        delete tasks[tlID]
    }

    const addTodoList = (title: string) => {
        const action = addedTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const onChangeTitle = (id: string, title: string, tlID: string) => {
        dispatchToTasks(changeTaskTitleAC(id, title, tlID))
    }

    const onChangeTodoListTitle = (newTitle: string, tlID: string) => {
        dispatchToTodolists(changeTodolistTitleAC(tlID, newTitle))
    }

    let todoListJsxElement = todoLists.map(tl => {

        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
        }

        return (
            <Grid item key={tl.id}>
                <Paper style={{padding: "10px"}}>
                    <Todolist key={tl.id} tlID={tl.id} title={tl.title} tasks={tasksForTodoList} removeTask={removeTask}
                              addTask={addTask}
                              changeFilter={changeFilter} checkBox={checkBox} filter={tl.filter} removeList={removeList}
                              onChangeTitle={onChangeTitle} onChangeTodoListTitle={onChangeTodoListTitle}/>
                </Paper>
            </Grid>

        )


    })

    return (
        <div
            className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm
                        addItem={addTodoList}
                    />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoListJsxElement
                    }
                </Grid>

            </Container>

        </div>
    )
        ;
}

export default AppWithReducers;

