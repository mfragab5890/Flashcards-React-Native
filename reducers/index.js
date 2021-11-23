import { RECEIVE_DECKS, ADD_DECK, ADD_DECK_CARD, DELETE_DECK } from '../actions/index'

const decks = (state = {}, action ) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const { deck } = action
      return {
        ...state,
        [deck.title] : deck,
      };
    case ADD_DECK_CARD:
      const { deckId, card } = action.info
      return {
        ...state,
      [deckId]: {
        ...state[deckId],
        questions: state[deckId].questions.concat([card])
      }
      };
    case DELETE_DECK:
      const { title } = action
      const newState = Object.keys(state)
      .filter((deck) => deck !== title)
      .reduce((obj, deck) => {
        obj[deck] = state[deck];
        return obj;
      }, {})

      return {
        ...newState,
      };

    default:
      return state;
  }
}

export default decks
