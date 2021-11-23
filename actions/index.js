import { fetchDecks, removeDeck, submitDeckCard } from '../utils/api'
import { setDummyData } from '../utils/helpers'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_DECK_CARD = 'ADD_DECK_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export const receiveDecks = (decks) => {
  return {
    type : RECEIVE_DECKS,
    decks
  };
}

export const addDeck = (deck) => {
  return {
    type : ADD_DECK,
    deck,
  };
}
export const addDeckCard = (info) => {
  return {
    type : ADD_DECK_CARD,
    info,
  };
}

export const deleteDeck = (title) => {
  return {
    type : DELETE_DECK,
    title,
  };
}

export const handleInitialData = () => {
  return (dispatch) => {
    return fetchDecks()
    .then(decks => {
      decks = JSON.parse(decks)
      if (decks === null) {
        return dispatch(receiveDecks(setDummyData()));
      }
      return dispatch(receiveDecks(decks))
    })
    .catch(err => {console.warn(err)})
  }
}

export const handleDeleteDeck = (title) => {
  return (dispatch) => {
    return removeDeck(title).then(() => {
      return dispatch(deleteDeck(title));
    })
    .catch(err => {console.warn('delete error', err);})

  }
}

export const handleAddDeckCard = (deckId,card) => {
  return (dispatch) => {
    return submitDeckCard(deckId,card).then(() => {
      return dispatch(addDeckCard( {deckId, card} ));
    })
    .catch(err => {console.warn('add card error', err);})

  }
}
