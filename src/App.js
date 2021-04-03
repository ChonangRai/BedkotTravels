import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import Header from './Components/HeaderComponent/Header';
import Body from './Components/BodyComponent/Body';
import FooterComponent from './Components/FooterComponent/FooterComponent';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
