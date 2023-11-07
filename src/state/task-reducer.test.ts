import { TaskStateType } from "../AppWithRedux/AppWithRedux";
import { tasksThunks } from "state/task-reducer";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todoId: [
      // {id: 'taskId', title: 'HTML&CSS', completed: false},
      // {id: 'taskId2', title: 'JS', completed: false}
    ],
    todoId2: [
      // {id: 'taskId3', title: 'bread', completed: false},
      // {id: 'taskId4', title: 'milk', completed: false}
    ],
  };
});

test("task removed", () => {
  // const endState = taskReducer(startState, removeTaskAC('taskId', 'todoId'))
  //
  //
  // expect(endState['todoId'].length).toBe(1)
});

test("task added", () => {
  // const action = tasksThunks.getTasks.fulfilled("title", "todoId");
  // const endState = taskReducer(startState, action);
  // expect(endState["todoId2"].length).toBe(2);
  // expect(endState["todoId"].length).toBe(3);
});

test("task changed title", () => {
  // const endState = taskReducer(startState, changeTaskTitleAC('todoId','taskId', 'title'))
  //
  //
  // expect(endState['todoId'][0].title).toBe('title')
});
test("task changed status", () => {
  // const endState = taskReducer(startState, changeTaskStatusAC('todoId','taskId', true))
  // expect(endState['todoId'][0].completed).toBe(true)
});
test("new array with new task added", () => {
  // const action = addTodolistAC('titles')
  // const endState = taskReducer(startState, action)
  //
  // const keys = Object.keys(endState)
  // const newKey = keys.find(k => k != 'todoId' && k != 'todoId2')
  // if (!newKey){
  //     throw new Error('brhaaaaa')
  // }
  //
  // expect(keys.length).toBe(3)
  // expect(endState[newKey]).toEqual([])
});

test("todolist removed", () => {
  // const action = removeTodolistAC('todoId2')
  // const endState = taskReducer(startState, action)
  //
  // const keys = Object.keys(endState)
  //
  // expect(keys.length).toBe(1)
  // expect(endState['todoId2']).not.toBeDefined()
});
