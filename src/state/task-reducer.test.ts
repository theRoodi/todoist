import {v1} from 'uuid';
import {RemoveTaskAC, taskReducer} from './task-reducer';

test ('task removed', ()=> {
    const todoId = v1()
    const todoId2 = v1()

    const taskId = v1()
    const taskId2 = v1()
    const taskId3 = v1()
    const taskId4 = v1()


    const startState = {
        [todoId]: [
            {id: taskId, title: 'HTML&CSS', isDone: true},
            {id: taskId2, title: 'JS', isDone: true}
        ],
        [todoId2]: [
            {id: taskId3, title: 'bread', isDone: true},
            {id: taskId4, title: 'milk', isDone: false}
        ]
    }

    const endState = taskReducer(startState, RemoveTaskAC(taskId, todoId))

    if (endState){
        expect(endState[0].length).toBe(1)
        expect(endState[0][1].title).toBe('JS')
    }



})