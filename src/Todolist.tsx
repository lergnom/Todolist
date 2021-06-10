import React, {ChangeEvent} from "react";
import {PropsType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


export function Todolist(props: PropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.tlID)
    }

    const clickAll = () => {
        props.changeFilter('all', props.tlID)
    }

    const clickActive = () => {
        props.changeFilter('active', props.tlID)
    }

    const clickCompleted = () => {
        props.changeFilter('completed', props.tlID)
    }

    const taskList = props.tasks.map((t) => {
        const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
            props.checkBox(t.id, e.currentTarget.checked, props.tlID)
        }

        const onChangeTitleHandler = (newValue: string) => {
            props.onChangeTitle(t.id, newValue, props.tlID)

        }

        return (<div className={t.isDone ? 'activeTask' : ''} key={t.id}><Checkbox color={"primary"}
                                                                                   checked={t.isDone}
                                                                                   onChange={changeBox}/>
            <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={() => {
                props.removeTask(t.id, props.tlID)
            }}>
                <Delete/>
            </IconButton>
        </div>)
    })


    const onChangeTitleTodoList = (newTitle: string) => {
        props.onChangeTodoListTitle(newTitle, props.tlID)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={onChangeTitleTodoList}/>
                <IconButton onClick={() => {
                    props.removeList(props.tlID)
                }}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {taskList}
            </ul>
            <div>
                <button className={props.filter === 'all' ? "activeFilter" : ""} onClick={clickAll}>All
                </button>
                <button className={props.filter === 'active' ? "activeFilter" : ""} onClick={clickActive}>Active
                </button>
                <button className={props.filter === 'completed' ? "activeFilter" : ""}
                        onClick={clickCompleted}>Completed
                </button>
            </div>
        </div>

    )
}