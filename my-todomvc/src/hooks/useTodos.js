import { useReducer, useEffect } from 'react';

// 辅助函数
const guid = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

const newTodo = label => ({
  done: false,
  id: guid(),
  label: (label || "").trim()
});

// 定义 reducer 函数
const todosReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TODO':
      return state.filter(i => i.id !== action.id);
    case 'ADD_TODO':
      return [newTodo(action.label), ...state];
    case 'SET_DONE':
      return state.map(i =>
        i.id === action.id ? { ...i, done: action.done } : i
      );
    case 'SET_LABEL':
      return state.map(i =>
        i.id === action.id ? { ...i, label: action.label } : i
      );
    case 'TOGGLE_DONE':
      return state.map(i =>
        i.id === action.id ? { ...i, done: !i.done } : i
      );
    default:
      return state;
  }
};

// 创建 useTodos 钩子
const useTodos = () => {
  // 从本地存储加载初始状态
  const initialTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  
  const [todos, dispatch] = useReducer(todosReducer, initialTodos);

  // 当 todos 改变时，保存到本地存储
  useEffect(() => {
    console.log('todos', todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 定义操作函数
  const deleteTodo = (id) => dispatch({ type: 'DELETE_TODO', id });
  const addTodo = (label) => dispatch({ type: 'ADD_TODO', label });
  const setDone = (id, done) => dispatch({ type: 'SET_DONE', id, done });
  const setLabel = (id, label) => dispatch({ type: 'SET_LABEL', id, label });
  const toggleDone = (id) => dispatch({ type: 'TOGGLE_DONE', id });

  return [
    todos,
    {
        deleteTodo,
        addTodo,
        setDone,
        setLabel,
        toggleDone
    }
  ];
};

export default useTodos;