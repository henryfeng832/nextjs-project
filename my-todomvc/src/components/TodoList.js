import React, { useState, useCallback, useMemo } from 'react';
import useTodos from '../hooks/useTodos';
import { useParams, NavLink } from 'react-router-dom';
import TodoItem from './TodoItem';


export default function TodoList() {
    const [todos, {addTodo, deleteTodo, setDone, setLabel, toggleDone}] = useTodos();
    const [newValue, setNewValue] = useState('');
    const { filter } = useParams();
    
    const onNewValueChange = useCallback(e => setNewValue(e.target.value), []);

    const onAddTodo = useCallback(e => {
        if (newValue && e.key === 'Enter') {
            addTodo(newValue);
            setNewValue('');
        }
    }, [newValue]);

    const visibleTodos = useMemo(() => {
        return filter ? todos.filter(i => filter === 'active' ? !i.done : i.done) : todos;
    }, [todos, filter]);

    const onClearCompleted = useCallback(() => {
        todos.filter(i => i.done).map(i => i.id).forEach(deleteTodo);
    }, [todos]);

    const allSelected = useMemo(() => visibleTodos.every(i => i.done), [
        visibleTodos
    ]);

    const onToggleAll = useCallback(
        () => {
          visibleTodos.forEach(i => setDone(i.id, !allSelected));
        },
        [visibleTodos, allSelected]
      );

    const left = useMemo(() => todos.filter(i => !i.done).length, [todos]);

    const anyDone = useMemo(() => todos.some(i => i.done), [todos]);

    return (
        <React.Fragment>
            <header className="header">
                <h1>todos</h1>
                <input
                className="new-todo"
                placeholder="What needs to be done?"
                onKeyPress={onAddTodo}
                value={newValue}
                onChange={onNewValueChange}
                />
            </header>

            <section className="main">
                
                <input
                    id="toggle-all"
                    type="checkbox"
                    className="toggle-all"
                    checked={allSelected}
                    onChange={onToggleAll}
                />
                <label htmlFor="toggle-all" />
                <ul className="todo-list">
                    {visibleTodos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} toggleDone={toggleDone} deleteTodo={deleteTodo} setLabel={setLabel} />
                    ))}
                </ul>
            </section>

            <footer className="footer">
                <span className="todo-count">
                <strong>{left}</strong> items left
                </span>
                <ul className="filters">
                    <li>
                        <NavLink exact={true} to="/" activeClassName="selected">
                        All
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/active" activeClassName="selected">
                        Active
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/completed" activeClassName="selected">
                        Completed
                        </NavLink>
                    </li>
                </ul>
                {anyDone && (
                <button className="clear-completed" onClick={onClearCompleted}>
                    Clear completed
                </button>
                )}
            </footer>
        </React.Fragment>
    )
}   