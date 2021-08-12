import React from "react";
import {ComponentStory, ComponentMeta} from "@storybook/react"
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


const changeTitle = action("Change Title")

export default {
    title: 'TODOLIST/EditableSpan',
    component: EditableSpan,
    args: {
        title: "My title",
        onChange: changeTitle
    }
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;


export const EditableSpanExample = Template.bind({});


// EditableSpanExample.args = {
//     title: 'asd'
// }


