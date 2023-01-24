import { render, cleanup, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import DeckList, { DECK_LIST_QUERY } from './DeckList';

const mock =
  {
    request: {
      query: DECK_LIST_QUERY,
      variables: {
        type: null
      }
    },
    result: {
      data: {
        decks: {
          nodes: [
            {
              name: "first deck",
              id: 1,
              type: "FIRE"
            }
          ]
        }
      }
    }
  }

describe('<DeckList/>', () => {
  afterAll(() => {
    cleanup()
  })

  it("should render the deck name", async () => {
    render(
      <MockedProvider mocks={[mock]}>
        <DeckList/>
      </MockedProvider>
    );

    expect(await screen.findByText("first deck")).toBeInTheDocument();
  })
});
