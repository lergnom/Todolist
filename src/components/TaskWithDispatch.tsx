import React, {ChangeEvent} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodoListPropsType} from "../AppWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";

type TaskPropsType = {
    tlID: string
    task: TaskType
    // checkBox: (id: string, isDone: boolean, tlID: string) => void
    // onChangeTitle: (id: string, newTitle: string, tlID: string) => void
    // removeTask: (taskId: string, tlID: string) => void
}

export const TaskWithDispatch = React.memo(function (props: TaskPropsType) {
    console.log("TaskWithDispatch")
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[props.tlID].filter(task => task.id === props.task.id)[0])
    const dispatch = useDispatch()

    const changeBox = (e: ChangeEvent<HTMLInputElement>) => {
        // props.checkBox(props.task.id, e.currentTarget.checked, props.tlID)
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, props.tlID))
    }

    const onChangeTitleHandler = (newValue: string) => {
        // props.onChangeTitle(props.task.id, newValue, props.tlID)
        dispatch(changeTaskTitleAC(task.id, newValue, props.tlID))
    }

    return <>

        {/*<div className={props.task.isDone ? 'activeTask' : ''} key={props.task.id}><Checkbox color={"primary"}*/}
        {/*                                                                                     checked={props.task.isDone}*/}
        {/*                                                                                     onChange={changeBox}/>*/}


            <div className={task.isDone ? 'activeTask' : ''} key={task.id}><Checkbox color={"primary"}
                                                                                                 checked={task.isDone}
                                                                                                 onChange={changeBox}/>


                {/*<EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>*/}
                <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>

            <IconButton onClick={() => {
                // props.removeTask(props.task.id, props.tlID)
                dispatch(removeTaskAC(task.id,props.tlID))
            }}>
                <Delete/>
            </IconButton>
        </div>

    </>

})