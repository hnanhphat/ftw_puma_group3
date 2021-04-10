import logo from './img/logo.png';
import "./App.css";
import Header from './components/Header';
import FirstView from './components/FirstView';
import ItemList from './components/ItemList';
import Footer from './components/Footer';

function App() {
  return (
    <div id="home">
      <Header/>
      <main>
        <FirstView />
        <ItemList />
      </main>
      <Footer logo={logo} />
    </div>
  );
}

export default App;
