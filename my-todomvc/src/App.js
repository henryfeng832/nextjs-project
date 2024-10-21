import React from 'react';
import 'todomvc-app-css/index.css';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <React.Fragment>
        <div className="todoapp">
          <Routes>
            <Route path="/:filter?" element={<TodoList />} />
          </Routes>
        </div>
        <Footer />
      </React.Fragment>
    </HashRouter>
  );
}

export default App;
