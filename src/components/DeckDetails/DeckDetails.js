import React from 'react'
import { Header, Grid, Breadcrumb } from 'semantic-ui-react'
import { useQuery, gql } from "@apollo/client";

import './styles/DeckDetails.css'
import { useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard/PokemonCard';

const DECK_QUERY = gql`
  query GetDeckList($id: Int) {
    decks(id: $id) {
      nodes{
        id
        name
        type
        cards{
          id
          imageUrl
          superType
          evolvesFrom
          name
          rarity
          averagePrice
        }
      }
    }
  }
`;

function DeckDetails({client}){
  const { deckId } = useParams();

  const { data, loading, error } = useQuery(DECK_QUERY, {
    variables: {
      id: parseInt(deckId)
    }
  });

  return (
    <>
      { !loading && !error && 
        <>
          <Header as='h2' className='deck-title-header'>{data.decks.nodes[0].name}</Header>
          <Breadcrumb className='deck-title-header'>
            <Breadcrumb.Section link href="/">List of decks</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>{data.decks.nodes[0].name}</Breadcrumb.Section>
          </Breadcrumb>
        </>
      }
      <div className='container'>
        {
          !loading && !error && 
          <Grid columns={6}>  
            { data.decks.nodes[0].cards.map((card) => {
                return (
                  <Grid.Column>
                    <PokemonCard card={card} key={card.id}/>
                  </Grid.Column>
                )
              })
            }
          </Grid>
        }
      </div>
    </>
  )
}

export default DeckDetails
