import React, { useState } from "react";
import { List, Loader, Header, Segment, Icon, Button, Message } from 'semantic-ui-react';
import { useQuery, gql } from "@apollo/client";

import './styles/DeckList.css';
import DeckTile from './DeckTile/DeckTile';
import DeckHeader from './DeckHeader/DeckHeader';

const DECK_LIST_QUERY = gql`
  query GetDeckList($type: PokemonType) {
    decks(type: $type) {
      nodes{
        id
        name
        type
      }
    }
  }
`;

function DeckList({client}) {
  const [selectedType, setSelectedType] = useState("ANY");

  const { data, loading, error } = useQuery(DECK_LIST_QUERY, {
    variables: {
      type: selectedType === "ANY" ? null : selectedType
    }
  });

  return (
    <>
      <DeckHeader typeHandler={setSelectedType}/>
      <div className="container">
        {
          (loading) &&
          <div className="loading-container">
            <Loader active inline />
          </div>
        }
        {
          (!loading && error) &&
          <div>
            <Message
              header="Error fetching decks"
              content={error.message}
            />
          </div>
        }
        { (!error && !loading && data.decks.nodes.length > 0) &&
          <List divided relaxed>
              { data.decks.nodes.map((deck) => (
                  <DeckTile deck={deck} key={deck.id}/>
              ))
              }
          </List>
        }
        {
          (!error && !loading && data.decks.nodes.length < 1) &&
          <Segment placeholder>
            <Header icon>
              <Icon name='clone outline' />
              No decks found for this type.
            </Header>
            <Button primary href="/new">Generate a new deck</Button>
          </Segment>
        }
      </div>
    </>
  )
}

export default DeckList;
