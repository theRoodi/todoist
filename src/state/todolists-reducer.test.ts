import {v1} from 'uuid';
import {TodoListType} from '../AppWithRedux/AppWithRedux';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
} from './todo-lists-reducer';

let todoId: string
let todoId2: string
let startState:Array<TodoListType>

beforeEach(()=> {
    todoId = v1()
    todoId2 = v1()
    startState = [
        {id: todoId, title: 'what to learn', filter: 'all'},
        {id: todoId2, title: 'what to buy', filter: 'all'}
    ]
})


test ('todolist removed', ()=> {
    const endState = todoListsReducer(startState, removeTodolistAC(todoId))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)

})

test ('todolist added', ()=> {
    const endState = todoListsReducer(startState, addTodolistAC('newTodo'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('newTodo')

})

test ('todolist change title', ()=> {
    const endState = todoListsReducer(startState, changeTodolistTitleAC( 'newTodolistTitle', todoId))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('newTodolistTitle')

})

test ('todolist change filter', ()=> {
    const endState = todoListsReducer(startState, changeTodolistFilterAC('active', todoId))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')

})