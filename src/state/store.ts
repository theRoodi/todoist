import {AnyAction, applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {appReducer} from '../AppWithRedux/app-reducer';
import {taskReducer} from './task-reducer';
import {todolistsReducer} from './todolists-reducer';
import {authReducer} from './auth-reducer';

export type RootStateType = ReturnType<typeof rootReducer>

export const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type ThunkType = ThunkDispatch<RootStateType, any, AnyAction>
export const useAppDispatch = useDispatch<ThunkType>;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

// @ts-ignore
window.store = store
