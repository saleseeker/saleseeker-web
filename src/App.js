import Home from './pages/Home';
import Subscriptions from './pages/Subscriptions';
import Browse from './pages/Browse';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <Container className="App">
      <Header />
      <Container className="AppContent">
        <Routes >
            <Route exact path="*" element={ <Home /> }/>
            <Route exact path="/subscriptions" element={ <Subscriptions /> }/>
            <Route exact path="/browse" element={ <Browse /> }/>
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
