import { BrowserRouter } from 'react-router-dom';
import './css/App.css';
import Header from './Components/HeaderComponent/Header';
import Body from './Components/BodyComponent/Body';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import ScrollToTop from 'react-scroll-to-top';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <ScrollToTop smooth />
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
