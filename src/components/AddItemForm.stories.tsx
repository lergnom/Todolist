import React from "react";
import {AddItemForm} from "./AddItemForm";
import {ComponentStory, ComponentMeta} from "@storybook/react"
import {action} from "@storybook/addon-actions";


export default {
    title: 'TODOLIST/AddItemForm',
    component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>;

export const AddItemFormStories = Template.bind({});
AddItemFormStories.args = {
    addItem: action("Add item  click")
}
