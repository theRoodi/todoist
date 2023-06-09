import {combineReducers, createStore} from 'redux';
import {todoListsReducer} from './todo-lists-reducer';
import {taskReducer} from './task-reducer';

export type RootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: taskReducer
    }
)
export const store = createStore(rootReducer)



// @ts-ignore
window.store = store
