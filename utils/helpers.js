import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications';

export const FLASHCARDS_KEY = 'Flachcards:cards'

export const formatNewDeck = (title) => {
  return {
    title: title,
    questions: [],
  }
}

export const setDummyData = () => {
  const data = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  return AsyncStorage.getItem(FLASHCARDS_KEY)
  .then((res) => {
    if (!res) {
      const newData = JSON.stringify(data)
      return AsyncStorage.setItem(FLASHCARDS_KEY,newData)
      .then((res) => {
        return data
      });
    }
  })
}

const NOTIFICATION_KEY = 'FLASHCARDS_NOTIFICATIONS'

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(() => {
          Notifications.cancelAllScheduledNotificationsAsync()
          .catch(err => {console.warn('cancelAllScheduledNotificationsAsync error :', err);})
        })
        .catch(err => {console.warn('clearLocalNotificatio error :', err);})
}
const createNotification = () => {
  return {
    title: 'Log Your Stats!',
    body: "👋 Don't forget to take your quiz for today",
    ios: {
      sound:true
    },
    android:{
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then( (res) => JSON.parse(res) )
  .then(data => {
    if (data === null) {
      Notifications.requestPermissionsAsync()
      .then(({status}) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync().catch(err => {console.warn('cancelAllScheduledNotificationsAsync',err);})
          Notifications.scheduleNotificationAsync({
            content: createNotification(),
            trigger: {
              channelId: 'default',
              seconds: (24 * 60 * 60),
              repeats: true,
            }
          }).catch(err => {console.warn('scheduleNotificationAsync',err);})
          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          .catch(err => {console.warn('AsyncStorage set Item error');})
        }
      })
      .catch(err => {console.warn("error requestPermissionsAsync");})
    }
  }).catch(err => {console.warn('requestPermissionsAsync',err);})
}
