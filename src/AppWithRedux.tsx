import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    changeTodolistFilterAC,
    changeTodolistTitle,
    createTodolist,
    deleteTodolist,
    fetchTodolists,
    TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskTC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./App";

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

function AppWithRedux() {
    console.log("AppWithReduX")


    let todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolists());
    }, []);

    const removeTask = useCallback((id: string, tlID: string) => {
        dispatch(removeTaskAC(id, tlID))
    }, [dispatch])

    const addTask = useCallback((title: string, tlID: string) => {
        // dispatch(addTaskAC(title, tlID))
        dispatch(addTaskTC(tlID, title));
    }, [dispatch])


    const checkBox = useCallback((id: string, isDone: boolean, tlID: string) => {
        dispatch(changeTaskStatusAC(id, isDone, tlID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValueType, tlID: string) => {
        dispatch(changeTodolistFilterAC(tlID, value))
    }, [dispatch])

    const removeList = useCallback((tlID: string) => {
        dispatch(deleteTodolist(tlID));
    }, [dispatch, tasks])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch])

    const onChangeTitle = useCallback((id: string, title: string, tlID: string) => {
        dispatch(changeTaskTitleAC(id, title, tlID))
    }, [dispatch])

    const onChangeTodoListTitle = useCallback((newTitle: string, tlID: string) => {
        // dispatch(changeTodolistTitleAC(tlID, newTitle))
        dispatch(changeTodolistTitle(tlID, newTitle));
    }, [dispatch])

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

export default AppWithRedux;

