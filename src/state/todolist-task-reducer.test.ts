import {TaskStateType, TodoListType} from '../App';
import {addTodolistAC, todolistsReducer} from './todolists-reducer';
import {taskReducer} from './task-reducer';

test('ids equals', () => {

    const startTaskState: TaskStateType = {}
    const startTodolistState: Array<TodoListType> = []

    const action = addTodolistAC('titles')
    const endTaskState = taskReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.idTodoList)
    expect(idFromTodolists).toBe(action.idTodoList)
})