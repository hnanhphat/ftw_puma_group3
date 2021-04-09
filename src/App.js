import logo from './img/logo.png';
import logo_white from './img/logo-white.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import Footer from './components/Footer';

function App() {
  return (
    <div id="home">
      <Header/>
      <main>
        <FirstView />
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
