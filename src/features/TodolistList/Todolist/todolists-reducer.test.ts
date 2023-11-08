import { v1 } from "uuid";
import {} from "features/TodolistList/Todolist/todolists-reducer";

let todoId: string;
let todoId2: string;
// let startState: Array<TodolistDomainType>;
//
// beforeEach(() => {
//   todoId = v1();
//   todoId2 = v1();
//   startState = [
//     // {id: todoId, title: 'what to learn', filter: 'all',
//     //     addedDate: '',
//     //     order: 0},
//     // {id: todoId2, title: 'what to buy', filter: 'all',
//     //     addedDate: '',
//     //     order: 0}
//   ];
// });
//
// test("todolist removed", () => {
//   const endState = todolistsReducer(startState, removeTodolistAC(todoId));
//
//   expect(endState.length).toBe(1);
//   expect(endState[0].id).toBe(todoId2);
// });
//
// test("todolist added", () => {
//   // const endState = todolistsReducer(startState, addTodolistAC('newTodo'))
//   //
//   // expect(endState.length).toBe(3)
//   // expect(endState[0].title).toBe('newTodo')
// });
//
// test("todolist change title", () => {
//   const endState = todolistsReducer(startState, changeTodolistTitleAC("newTodolistTitle", todoId));
//
//   expect(endState.length).toBe(2);
//   expect(endState[0].title).toBe("newTodolistTitle");
// });
//
// test("todolist change filter", () => {
//   const endState = todolistsReducer(startState, changeTodolistFilterAC("active", todoId));
//
//   expect(endState.length).toBe(2);
//   expect(endState[0].filter).toBe("active");
// });
