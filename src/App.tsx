import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Outlet,
} from "react-router-dom";

import "./App.css";
import CountPage from "./pages/CountPage";
import TodoList from "./pages/TodoList";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="count" element={<CountPage />} />
            <Route path="todoList" element={<TodoList />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <div className="border">
      <Link to="/count">count</Link>
      <Link to="/todoList">todoList</Link>
      <Outlet />
    </div>
  );
}
