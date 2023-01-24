import React, { useState } from "react";
import { Header, Form, Breadcrumb } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";

import './styles/DeckGenerator.css';

const options = [
  { key: 'col', text: 'Colorless', value: 'COLORLESS' },
  { key: 'dar', text: 'Darkness', value: 'DARKNESS' },
  { key: 'dra', text: 'Dragon', value: 'DRAGON' },
  { key: 'fai', text: 'Fairy', value: 'FAIRY' },
  { key: 'fig', text: 'Fighting', value: 'FIGHTING' },
  { key: 'fir', text: 'Fire', value: 'FIRE' },
  { key: 'gra', text: 'Grass', value: 'GRASS' },
  { key: 'lig', text: 'Lightning', value: 'LIGHTNING' },
  { key: 'met', text: 'Metal', value: 'METAL' },
  { key: 'psy', text: 'Psychic', value: 'PSYCHIC' },
  { key: 'wat', text: 'Water', value: 'WATER' },
]

const poolSizes = [
  { key: 'small', text: 'Small', value: 50 },
  { key: 'medium', text: 'Medium', value: 100 },
  { key: 'large', text: 'Large', value: 250 },
  { key: 'all', text: 'All available', value: null },
]

const DECK_GENERATION_MUTATION = gql`
  mutation CreateDeck($attributes: GenerateDeckInput!){
    generateDeck(input:{
      attributes: $attributes
    }){
      deck{
        id
      }
      errors
    }
  }
`;

function DeckGenerator({client}){
  const [selectedType, setSelectedType] = useState("COLORLESS");
  const [selectedPoolSize, setSelectedPoolSize] = useState(poolSizes[1].value);
  const [deckName, setDeckName] = useState("");

  const redirectToDeck = ({generateDeck}) => {
    window.location.href = `/deck/${generateDeck.deck.id}`;
  }

  const [generate, {loading}] = useMutation(DECK_GENERATION_MUTATION, {
    variables: {
      attributes: {
        type: selectedType,
        name: deckName,
        poolSize: selectedPoolSize
      }
    },
    onCompleted: redirectToDeck
  });

  const onTypeChange = (_, element) => {
    setSelectedType(element.value)
  }

  const onPoolSizeChange = (_, element) => {
    setSelectedPoolSize(element.value)
  }

  const onDeckNameChange = (_, element) => {
    setDeckName(element.value)
  }

  return (
    <>
      <Header as='h2' className='deck-title-header'>Generate a new deck</Header>
      <Breadcrumb className='deck-title-header'>
        <Breadcrumb.Section link href="/">List of decks</Breadcrumb.Section>
        <Breadcrumb.Divider />
        <Breadcrumb.Section active>Generate a new deck</Breadcrumb.Section>
      </Breadcrumb>
      <div className='container'>
        <Form loading={loading}>
          <Form.Group widths='equal'>
            <Form.Input fluid
              label='Deck name'
              placeholder='Name'
              onChange={onDeckNameChange}
            />
            <Form.Select fluid
              options={options}
              label='Deck type'
              onChange={onTypeChange}
              value={selectedType}
              placeholder='Filter by deck type...'
            />
            <Form.Select fluid
              options={poolSizes}
              label='Pool size'
              onChange={onPoolSizeChange}
              value={selectedPoolSize}
            />
          </Form.Group>
          { (selectedPoolSize === 250 || selectedPoolSize == null) && <p><b>Note:</b> Large pool sizes will take longer to generate.</p> }
          <Form.Button primary disabled={deckName.trim().length < 1} onClick={generate}>Generate!</Form.Button>
        </Form>
      </div>
    </>
  )
}

export default DeckGenerator;
