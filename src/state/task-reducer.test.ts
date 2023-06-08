import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, taskReducer} from './task-reducer';
import {TaskStateType} from '../App';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

test('task removed', () => {

    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: true},
            {id: 'taskId2', title: 'JS', isDone: true}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: true},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const endState = taskReducer(startState, RemoveTaskAC('taskId', 'todoId'))


    expect(endState['todoId'].length).toBe(1)
})

test('task added', () => {

    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: false},
            {id: 'taskId2', title: 'JS', isDone: false}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: false},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const action = addTaskAC('todoId', 'title')

    const endState = taskReducer(startState, action)


    expect(endState['todoId2'].length).toBe(2)
    expect(endState['todoId'].length).toBe(3)
})

test('task changed title', () => {

    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: true},
            {id: 'taskId2', title: 'JS', isDone: true}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: true},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC('todoId','taskId', 'title'))


    expect(endState['todoId'][0].title).toBe('title')
})
test('task changed status', () => {

    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: true},
            {id: 'taskId2', title: 'JS', isDone: true}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: true},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const endState = taskReducer(startState, changeTaskStatusAC('todoId','taskId', true))


    expect(endState['todoId'][0].isDone).toBe(true)
})
test('new array with new task added', () => {

    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: true},
            {id: 'taskId2', title: 'JS', isDone: true}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: true},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const action = addTodolistAC('titles')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todoId' && k != 'todoId2')
    if (!newKey){
        throw new Error('brhaaaaa')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('todolist removed', () => {
    const startState: TaskStateType = {
        'todoId': [
            {id: 'taskId', title: 'HTML&CSS', isDone: true},
            {id: 'taskId2', title: 'JS', isDone: true}
        ],
        'todoId2': [
            {id: 'taskId3', title: 'bread', isDone: true},
            {id: 'taskId4', title: 'milk', isDone: false}
        ]
    }

    const action = removeTodolistAC('todoId2')
    const endState = taskReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todoId2']).not.toBeDefined()

})
