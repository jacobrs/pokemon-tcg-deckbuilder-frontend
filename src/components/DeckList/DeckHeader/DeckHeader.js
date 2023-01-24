import React from "react";
import { Form } from "semantic-ui-react"

const options = [
  { key: 'any', text: 'Any', value: 'ANY' },
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

function DeckHeader(props) {
  const onTypeChange = (_, element) => {
    props.typeHandler(element.value);
  }

  return (
    <div className="deck-list-header">
      <h2>List of all generated decks</h2>
      <Form>
        <Form.Group>
          <Form.Select
                fluid
                options={options}
                onChange={onTypeChange}
                placeholder='Filter by deck type...'
                width={16}
              />
          <Form.Button primary width={2} onClick={() => {window.location = "/new"}}>
            Generate new deck
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default DeckHeader;
