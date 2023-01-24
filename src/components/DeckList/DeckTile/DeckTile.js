import React from "react";
import { List } from "semantic-ui-react";

function DeckTile(props) {
  return (
    <List.Item>
      <List.Icon name='clone' size='large' verticalAlign='middle' />
      <List.Content>
        <List.Header as='a' href={`/deck/${props.deck.id}`}>{props.deck.name}</List.Header>
        <List.Description as='a' href={`/deck/${props.deck.id}`}>{props.deck.type} type deck</List.Description>
      </List.Content>
    </List.Item>
  )
}

export default DeckTile;
