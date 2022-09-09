import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions';
import Browse from './pages/Browse';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Item from './components/Item'
import { Container } from '@mui/system';
import { itemMock, sitesMock } from './Mocks';

function App() {
  return (
    <Container className="App">
      <Header />
      <Container className="AppContent">
        <Routes >
            <Route exact path="*" element={ <Home /> }/>
            <Route exact path="/browse" element={ <Browse /> }/>
            <Route exact path="/subscriptions" element={ <Subscriptions /> }/>            
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
