import React from 'react';


export type TasksType = {
    id : number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TasksType>
}

export const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/>{props.tasks[0].title}</li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/>{props.tasks[1].title}</li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/>{props.tasks[2].title}</li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};