import {TasksStateType, TodoListType} from '../App';
import {tasksReducer} from './tasks-reducer';
import {AddTodoListAC, todoListReducer} from './todolist-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistState: Array<TodoListType> = []

    const action = AddTodoListAC('new todo')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodolistState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todoListId)
    expect(idFromTodoLists).toBe(action.todoListId)


})