import { v1 } from "uuid"
import {TodoListType} from '../App';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListReducer
} from './todolist-reducer';

test('correct todolist should be removed', () => {
    let todolistid1 = v1()
    let todolistid2 = v1()
    const startState: Array<TodoListType> = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, RemoveTodoListAC(todolistid1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistid2)

})

test('correct todolist should be added', () => {
    let todolistid1 = v1()
    let todolistid2 = v1()
    const startState: Array<TodoListType> = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, AddTodoListAC('What to do'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to do')

})

test('correct todolist should be changed title', () => {
    let todolistid1 = v1()
    let todolistid2 = v1()
    const startState: Array<TodoListType> = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, ChangeTodoListTitleAC('What to do', todolistid1))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to do')
    expect(endState[1].title).toBe('What to buy')

})

test('correct todolist should be changed filter', () => {
    let todolistid1 = v1()
    let todolistid2 = v1()
    const startState: Array<TodoListType> = [
        {id: todolistid1, title: 'What to learn', filter: 'all'},
        {id: todolistid2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListReducer(startState, ChangeTodoListFilterAC('active', todolistid1))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')

})