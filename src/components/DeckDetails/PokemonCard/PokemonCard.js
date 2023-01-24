import React from "react";
import {Card, Image} from "semantic-ui-react";

function PokemonCard({card}) {
  return (
    <Card className="pokemon-card">
      <Image src={card.imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header className="no-text-wrap">{card.name}</Card.Header>
        <Card.Meta className="no-text-wrap">
          <span className='super-type'>{card.superType}</span>
        </Card.Meta>
        <Card.Description className="no-text-wrap">
          {card.rarity}&nbsp;
          {card.averagePrice !== null && `$${card.averagePrice} USD`}
        </Card.Description>
      </Card.Content>
      <Card.Content className="no-text-wrap" extra>
        {card.evolvesFrom === null ? "Not an evolution" : `Evolves from ${card.evolvesFrom}`}
      </Card.Content>
    </Card>
  )
}

export default PokemonCard
