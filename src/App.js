import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Item from './components/Item'
import { Container } from '@mui/system';
import { itemMock, sitesMock } from './Mocks';

function App() {
  return (
    <div className="App">
      <Header />
      <Container sx={{ paddingTop: '80px' }}>
        <Item item={itemMock} sites={sitesMock} />
      </Container>
    </div>
  );
}

export default App;
