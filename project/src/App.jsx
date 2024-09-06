import { useState } from "react";
import "./App.css";
import Sodoku from "./project";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sodoku />
    </>
  );
}

export default App;
