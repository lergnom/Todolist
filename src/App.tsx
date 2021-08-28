import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

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

function App() {

    let todoListId_1 = v1()
    let todoListId_2 = v1()

    let [todoLists, setTodolists] = useState<Array<TodoListPropsType>>([
        {id: todoListId_1, title: "What to learn", filter: 'all'},
        {id: todoListId_2, title: "What to buy", filter: 'active'}
    ])

    let [tasks, setTasks] = useState<TodoListTaskTypeProps>({
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
        let filteredtasks = tasks[tlID]
        tasks[tlID] = filteredtasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }


    function addTask(title: string, tlID: string) {
        let filteredtasks = tasks[tlID]
        let task = {id: v1(), title: title, isDone: false}
        tasks[tlID] = [task, ...filteredtasks]
        setTasks({...tasks})
    }

    function checkBox(id: string, isDone: boolean, tlID: string) {
        let filteredtasks = tasks[tlID]
        tasks[tlID] = filteredtasks.map(t => t.id === id ? {...t, isDone} : t)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValueType, tlID: string) {
        let todoList = todoLists.find(tl => tl.id === tlID)
        if (todoList) {
            todoList.filter = value
            setTodolists([...todoLists])
        }
    }

    function removeList(tlID: string) {
        setTodolists(todoLists.filter(tl => tl.id !== tlID))
        delete tasks[tlID]
        setTasks({...tasks})

    }

    const addTodoList = (title: string) => {
        let newTodolist_id = v1()
        let newTodoList: TodoListPropsType = {id: newTodolist_id, title: title, filter: 'all'}
        setTodolists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodolist_id]: []})
    }

    const onChangeTitle = (id: string, title: string, tlID: string) => {
        let todoListsTasks = tasks[tlID];
        let task = todoListsTasks.find(t => t.id === id)
        if (task) {
            if (title !== '')
                task.title = title
            setTasks({...tasks})
        }

    }

    const onChangeTodoListTitle = (newTitle: string, tlID: string) => {
        let todoList = todoLists.find(tl => tl.id === tlID)
        if (todoList) {
            todoList.title = newTitle
            setTodolists([...todoLists])
        }
    }

    let todoListJsxElement = todoLists.map(tl => {

        return (
            <Grid item>
                <Paper style={{padding: "10px"}}>
                    <Todolist key={tl.id} tlID={tl.id} title={tl.title} tasks={tasks[tl.id]} removeTask={removeTask}
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

export default App;

