import AsyncStorage from '@react-native-async-storage/async-storage'
import { formatNewDeck, FLASHCARDS_KEY } from './helpers'

export function submitNewDeck(title) {
  const newDeck = JSON.stringify({
    [title] : formatNewDeck(title)
  })
  return AsyncStorage.mergeItem(FLASHCARDS_KEY, newDeck)
  .then(() => {
    return AsyncStorage.getItem(FLASHCARDS_KEY)
      .then(res => JSON.parse(res))
      .then(data => {
        return data[title]
      })
      .catch(err => console.warn('getItem', err))
  })
  .catch(err => {console.warn(err);})
}

export function submitDeckCard( deckId, card ) {
  return AsyncStorage.getItem(FLASHCARDS_KEY)
  .then((res) => {
    const data = JSON.parse(res)
    data[deckId].questions.push(card)
    const newData = JSON.stringify(data)
    return AsyncStorage.setItem(FLASHCARDS_KEY,newData);
  })
}


export const fetchDecks = () => {
  return AsyncStorage.getItem(FLASHCARDS_KEY).then(data => data)
}

export const fetchDeckCards = (deckId) => {
  let data = null
  return AsyncStorage.getItem(FLASHCARDS_KEY)
  .then(JSON.parse)
  .then(res => {
    data = res[deckId]
    return data;
  })
  .catch(err => {console.warn(err)})
}

export const removeDeck = (title) => {
  return AsyncStorage.getItem(FLASHCARDS_KEY).then((res) => {
    const data = JSON.parse(res)
    if (delete data[title]){
      const newData = JSON.stringify(data)
      return AsyncStorage.setItem(FLASHCARDS_KEY,newData)
    }
    else {
      console.warn('not deleted');
    }

  })
}
