import React, { useState, useCallback } from 'react';
import useTodos from '../hooks/useTodos';

export default function TodoItem({ todo, toggleDone, deleteTodo, setLabel }) {
    const [editing, setEditing] = useState(false);

    const handleViewClick = useCallback(() => setEditing(true), []);
    
    const onDone = useCallback(e => toggleDone(todo.id), [todo.id]);

    const onDelete = useCallback(() => deleteTodo(todo.id), [todo.id]);

    const onChange = useCallback(e => setLabel(todo.id, e.target.value), [todo.id]);

    const onEnter = useCallback(e => {
        if (e.key === 'Enter') {
            setEditing(false);
        }
    }, []);

    return (
        <React.Fragment>
            <li
                // onDoubleClick={handleViewClick}
                className={`${editing ? "editing" : ""} ${todo.done ? "completed" : ""}`}
            >
            <div className="view">
                <input
                type="checkbox"
                className="toggle"
                checked={todo.done}
                onChange={onDone}
                />
                <label>{todo.label}</label>
                <button className="destroy" 
                onClick={onDelete} 
                />
            </div>
            {editing && (
                <input
                // ref={ref}
                className="edit"
                value={todo.label}
                onChange={onChange}
                onKeyPress={onEnter}
                />
            )}
            </li>
        </React.Fragment>
    )
}
