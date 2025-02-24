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
import TimerPage from "./pages/TimerPage";
import ProviderPage from "./pages/ProviderPage";
import InjectPage from "./pages/InjectPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="count" element={<CountPage />} />
            <Route path="todoList" element={<TodoList todoList="TodoList" />} />
            <Route path="timer" element={<TimerPage />} />
            <Route path="provider" element={<ProviderPage />} />
            <Route path="injectPage" element={<InjectPage />} />
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
      <Link to="/timer">timer</Link>
      <Link to="/provider">provider</Link>
      <Link to="/injectPage">injectPage</Link>
      <Outlet />
    </div>
  );
}
