import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import Footer from './components/Footer';
import {useState, useEffect} from 'react';

function App() {
  const [headerStatus, setHeaderStatus] = useState('');

  useEffect(() => {
    window.onscroll = () => {
      if(window.scrollY > 100) {
        setHeaderStatus('active');
      } else {
        setHeaderStatus('');
      }
    }
  }, []);

  return (
    <div id="home">
      <Header status={headerStatus}/>
      <main>
        <FirstView />
        <ItemList />
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
