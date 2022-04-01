import './App.scss';
import Header from "./components/header/header";
import Main from "./components/main/main";
import Slider from "./components/slider/slider";

function App() {
    return (
        <div className="App">
            <Header/>
            <Slider/>
            <Main/>
        </div>
    );
}

export default App;
