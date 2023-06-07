import {TasksType} from '../Todolist';
import {TaskStateType} from '../App';

type RemoveTaskType = {
    type: string
    idTask: string
    idTodo: string
}

type ActionType = RemoveTaskType;


export const taskReducer = (state: TaskStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let newTasks = state[action.idTodo]
            const ftasks = newTasks.filter(ft => ft.id !== action.idTask)
            newTasks = ftasks
            return [newTasks]
        }
    }
}

export const RemoveTaskAC = (idTask: string, idTodo:string): RemoveTaskType => {
    return {type: 'REMOVE-TASK', idTask, idTodo}
}