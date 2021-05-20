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
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    checkBox: (id: string, isDone: boolean) => void
    filter: FilterValueType
}


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Rest api", isDone: false},
        {id: v1(), title: "graphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function removeTask(id: string) {
        let filteredtasks = tasks.filter(t => t.id !== id);
        setTasks(filteredtasks)
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)

    }

    function checkBox(id: string, isDone: boolean) {
        let updateTasks = tasks.map(t => t.id === id ? {...t, isDone} : t)
        setTasks(updateTasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasksForTodoList} removeTask={removeTask} addTask={addTask}
                      changeFilter={changeFilter} checkBox={checkBox} filter={filter}/>
            {/*<Todolist title={"Songs"} tasks={task2}/>*/}
        </div>
    );
}

export default App;

