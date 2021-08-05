import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    tlID: string
    task: TaskType
    checkBox: (id: string, isDone: boolean, tlID: string) => void
    onChangeTitle: (id: string, newTitle: string, tlID: string) => void
    removeTask: (taskId: string, tlID: string) => void
}

export const TaskWithDispatch = React.memo(function (props: TaskPropsType) {
    console.log("Task")

    const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
        props.checkBox(props.task.id, e.currentTarget.checked, props.tlID)
    }

    const onChangeTitleHandler = (newValue: string) => {
        props.onChangeTitle(props.task.id, newValue, props.tlID)

    }

    return <>

        <div className={props.task.isDone ? 'activeTask' : ''} key={props.task.id}><Checkbox color={"primary"}
                                                                                             checked={props.task.isDone}
                                                                                             onChange={changeBox}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={() => {
                props.removeTask(props.task.id, props.tlID)
            }}>
                <Delete/>
            </IconButton>
        </div>

    </>

})