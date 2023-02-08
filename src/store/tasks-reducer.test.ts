import {TasksStateType} from '../App';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './tasks-reducer';
import {AddTodoListAC, RemoveTodoListAC} from './todolist-reducer';

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = removeTaskAC('2', 'todolistIdTwo')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '3', title: 'fish', isDone: false},
        ]
    })
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = addTaskAC('juice', 'todolistIdTwo')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistIdOne'].length).toBe(3)
    expect(endState['todolistIdTwo'].length).toBe(4)
    expect(endState['todolistIdTwo'][0].id).toBeDefined()
    expect(endState['todolistIdTwo'][0].title).toBe('juice')
    expect(endState['todolistIdTwo'][0].isDone).toBe(false)

})

test('correct task should be changed status to correct array', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = changeTaskStatusAC('2', false , 'todolistIdTwo')

    const endState = tasksReducer(startState, action)

    expect(startState['todolistIdTwo'][1].isDone).toBe(true)
    expect(endState['todolistIdTwo'][1].isDone).toBe(false)

})
test('correct task should be changed title to correct array', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = changeTaskTitleAC('3', 'tea' , 'todolistIdTwo')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistIdTwo'][2].title).toBe('tea')
    expect(endState['todolistIdOne'][2].title).toBe('JS')

})

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = AddTodoListAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistIdOne' && k !== 'todolistIdTwo')
    if (!newKey){
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistIdOne' : [
            {id: '1', title: 'CSS', isDone: true},
            {id: '2', title: 'HTML', isDone: true},
            {id: '3', title: 'JS', isDone: false},
        ],
        'todolistIdTwo' : [
            {id: '1', title: 'milk', isDone: false},
            {id: '2', title: 'bread', isDone: true},
            {id: '3', title: 'fish', isDone: false},
        ]
    }

    const action = RemoveTodoListAC('todolistIdTwo')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistIdTwo']).not.toBeDefined()

})

