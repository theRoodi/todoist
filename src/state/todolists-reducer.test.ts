import {v1} from 'uuid';
import {TodoListType} from '../App';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './todolists-reducer';


test ('todolist removed', ()=> {
    const todoId = v1()
    const todoId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoId, title: 'what to learn', filter: 'all'},
        {id: todoId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todoId))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)

})

test ('todolist added', ()=> {
    const todoId = v1()
    const todoId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoId, title: 'what to learn', filter: 'all'},
        {id: todoId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC('newTodo'))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('newTodo')

})

test ('todolist change title', ()=> {
    const todoId = v1()
    const todoId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoId, title: 'what to learn', filter: 'all'},
        {id: todoId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC( 'newTodolistTitle', todoId))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('newTodolistTitle')

})

test ('todolist change filter', ()=> {
    const todoId = v1()
    const todoId2 = v1()

    const startState: Array<TodoListType> = [
        {id: todoId, title: 'what to learn', filter: 'all'},
        {id: todoId2, title: 'what to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC('active', todoId))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')

})