import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

type  TaskType = {
    id: number
    title: string
    isDone: boolean
}
type FilterValueType = "all" | "completed" | "active"


export type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value:FilterValueType) => void
}


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Rest api", isDone: false},
        {id: 6, title: "graphQL", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>('all')
    let tasksForTodoList = tasks
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone)
    }

    function removeTask(id: number) {
        let filteredtasks = tasks.filter(t => t.id !== id);
        setTasks(filteredtasks)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }

    // const task2 = [
    //     {id:1, title: "Hello world", isDone: true},
    //     {id:2, title: "I'm happy", isDone: false},
    //     {id:3, title: "Yo", isDone: false}
    // ]
    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter}/>
            {/*<Todolist title={"Songs"} tasks={task2}/>*/}
        </div>
    );
}

export default App;

