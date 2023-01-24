import { render, cleanup, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

const testCard = {
  name: "Example Pokemon",
  imageUrl: "http://localhost/myimage.png",
  superType: "Pokemon",
  averagePrice: 19.99,
  rarity: "Uncommon",
  id: 3,
  evolvesFrom: "Pikachu"
}

describe('Pokemon Card', () => {
  afterAll(() => {
    cleanup()
  })

  it("should render the card image", () => {
    render(<PokemonCard card={testCard} />);

    const image = screen.getByAltText('card-image');
    expect(image.src).toBe(testCard.imageUrl);
  })

  it("should render the card name", () => {
    render(<PokemonCard card={testCard} />);

    screen.getByText(testCard.name);
  })

  it("should render the card rarity and price", () => {
    render(<PokemonCard card={testCard} />);

    screen.getByText(/Uncommon.*\$19\.99 USD/i);
  })

  it("should render the card evolution details", () => {
    render(<PokemonCard card={testCard} />);

    screen.getByText("Evolves from Pikachu");
  })

  it("should render the card supertype", () => {
    render(<PokemonCard card={testCard} />);

    screen.getByText("Pokemon");
  })
});
