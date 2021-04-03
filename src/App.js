import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import Header from './Components/HeaderComponent/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

export default App;
