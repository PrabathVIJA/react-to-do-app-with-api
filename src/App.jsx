import "./App.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/7");
  }, []);
  return <></>;
}

export default App;
