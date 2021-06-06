import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';

type  TaskType = {
    id: string
    title: string
    isDone: boolean
}
type FilterValueType = "all" | "completed" | "active"


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
}

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValueType
}

type TodoListTaskTypeProps = {
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
        setTodolists(todoLists.filter(tl => tl.id != tlID))
        delete tasks[tlID]
        setTasks({...tasks})

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
            <Todolist key={tl.id} tlID={tl.id} title={tl.title} tasks={tasksForTodoList} removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter} checkBox={checkBox} filter={tl.filter} removeList={removeList}/>
        )


    })

    return (
        <
            div
            className="App">
            {todoListJsxElement}
        </div>
    );
}

export default App;

