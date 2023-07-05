import logo from "./logo.svg";
import "./App.css";
import HeaderComponent from "./components/header/HeaderComponent";
import NoteBody from "./components/noteBody";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <NoteBody />
    </div>
  );
}

export default App;
