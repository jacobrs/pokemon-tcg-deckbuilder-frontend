import './styles/App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../apolloClient/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeckList from '../DeckList/DeckList';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeckList client={client}/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
