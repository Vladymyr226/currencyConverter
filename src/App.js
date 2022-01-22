import './App.css';
import { Main } from './components/main.jsx'
import { Provider } from 'react-redux'
import store from '../src/redux/Store/store';

function App() {
  return (
    <Provider store={store}> <Main /></Provider>
  )
}

export default App;
