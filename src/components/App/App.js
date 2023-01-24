import './styles/App.css';
import { ApolloProvider } from '@apollo/client';
import { client } from '../../apolloClient/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DeckList from '../DeckList/DeckList';
import DeckDetails from '../DeckDetails/DeckDetails';
import DeckGenerator from '../DeckGenerator/DeckGenerator';

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeckList client={client}/>}/>
          <Route path="/deck/:deckId" element={<DeckDetails client={client}/>}/>
          <Route path="/new" element={<DeckGenerator client={client}/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
