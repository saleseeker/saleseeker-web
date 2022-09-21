import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions';
import PriceCheck from './pages/PriceCheck';
import Browse from './pages/Browse';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Item from './components/Item'
import { Container } from '@mui/system';
import { itemMock, sitesMock } from './Mocks';
import Settings from './pages/Settings';

function App() {
  return (
    <Container className="App">
      <Header />
      <Container className="AppContent">
        <Routes >
            <Route exact path="*" element={ <Home /> }/>
            <Route exact path="/browse" element={ <Browse /> }/>
            <Route exact path="/subscriptions" element={ <Subscriptions /> }/>            
            <Route exact path="/subscriptions/:itemID" element={ <Subscriptions /> }/> 
            <Route exact path="/pricecheck/:itemID" element={ <PriceCheck /> }/>    
            <Route exact path="/settings" element={ <Settings /> }/>   
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
