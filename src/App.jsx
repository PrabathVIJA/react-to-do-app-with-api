import "./App.css";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/7");
  }, []);
  return (
    <>
      <h2>hi</h2>
    </>
  );
}

export default App;
