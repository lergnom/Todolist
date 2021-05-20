import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {PropsType} from "./App";

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")

    const onChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const clickAll = () => {
        props.changeFilter('all')
    }

    const clickActive = () => {
        props.changeFilter('active')
    }

    const clickCompleted = () => {
        props.changeFilter('completed')
    }

    const taskList = props.tasks.map((t) => {
        const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkBox(t.id, e.currentTarget.checked)
        }
        return (<li key={t.id}><input type="checkbox" checked={t.isDone} onChange={changeBox}/> <span>{t.title}</span>
            <button onClick={() => {
                props.removeTask(t.id)
            }}> x
            </button>
        </li>)
    })

    const onKeyPressHandle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && e.ctrlKey) {
            addTask()
            setTitle("")
        }
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={onChangeHandle} value={title} onKeyPress={onKeyPressHandle}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskList}
            </ul>
            <div>
                <button onClick={clickAll}>All
                </button>
                <button onClick={clickActive}>Active
                </button>
                <button onClick={clickCompleted}>Completed
                </button>
            </div>
        </div>

    )
}