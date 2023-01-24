import { render, cleanup, screen } from '@testing-library/react';
import DeckTile from './DeckTile';

const testDeck = {
  name: "Example Pokemon",
  id: 2,
  type: 'FIRE'
}

describe('<DeckTile/>', () => {
  afterAll(() => {
    cleanup()
  })

  it("should render the deck name", () => {
    render(<DeckTile deck={testDeck} />);

    screen.getByText(testDeck.name);
  })

  it("should render the deck type", () => {
    render(<DeckTile deck={testDeck} />);

    screen.getByText(/FIRE.*/);
  })
});
