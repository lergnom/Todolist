import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react"
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";

const changeCheckBox = action('You click on checkbox')
const changeTitle = action('You click on CHANGE_TITLE')
const removeTask = action('You REMOVE TASK')

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        checkBox: changeCheckBox,
        onChangeTitle: changeTitle,
        removeTask: removeTask,
    }
} as ComponentMeta<typeof Task>;


const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;


export const TaskIsDone = Template.bind({});
TaskIsDone.args = {
    task: {id: '1', isDone: true, title: "JS"},
    tlID: 'todo1'
}


export const TaskIsNotDone = Template.bind({});
TaskIsNotDone.args = {
    task: {id: '1', isDone: false, title: "REDUX"},
    tlID: 'todo1'
}
