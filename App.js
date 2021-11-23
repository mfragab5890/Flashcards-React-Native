import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import middleware from './middleware'
import NewCard from './components/NewCard'
import NoCards from './components/NoCards'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

export default class App extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }
  render(){
    return (
      <SafeAreaProvider>
        <Provider store={createStore(reducer, middleware)}>
          <SafeAreaView style={styles.container} >
            <StatusBar style="auto" animated={true} backgroundColor={'#75654c'} translucent={false} />
            <AppContainer />
          </SafeAreaView>
        </Provider>
      </SafeAreaProvider>

    );
  }

}

const TabNavigator = Platform.OS !== 'ios'
  ?createMaterialTopTabNavigator(
    {
      Decks: {
        screen: Decks,
        navigationOptions:{
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const iconName = focused
              ? 'cards'
              : 'cards-outline';

            return <MaterialCommunityIcons name={iconName} size={24} color={tintColor} />
            }
        }
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions:{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const iconName = focused
              ? 'card-plus'
              : 'card-plus-outline';
            return <MaterialCommunityIcons name={iconName} size={24} color={tintColor} />
            }
        }
      }
    },
    {
    initialRouteName: 'Decks',
    NavigationOptions: {
      headerStyle: {
        backgroundColor: '#75654c',
      },
      headerTintColor: 'black',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeTintColor: '#BB8644',
      inactiveTintColor: 'white',
      showIcon:true,
      showLabel: true,
      style: {
        backgroundColor: '#30271E'
      }
    }
    }

  )
  : createBottomTabNavigator(
    {
    Decks: Decks,
    NewDeck: NewDeck,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Decks') {
            iconName = focused
              ? 'cards'
              : 'cards-outline';
            // Sometimes we want to add badges to some icons.
            // You can check the implementation below.
          } else if (routeName === 'NewDeck') {
            iconName = focused
              ? 'card-plus'
              : 'card-plus-outline';
          }

          // You can return any component that you like here!
          return <MaterialCommunityIcons name={iconName} size={24} color={tintColor} />;
        },
      }),
    initialRouteName: 'Decks',
    NavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeTintColor: '#BB8644',
      inactiveTintColor: 'white',
      showIcon:true,
      showLabel: true,
      style: {
        backgroundColor: '#30271E'
      }
    }
    }
  );

const StackNavigator = createStackNavigator(
  {
    home: {
      screen: TabNavigator,
      navigationOptions: {
         headerShown: false,
       },
     },
    Deck: {
      screen: Deck,
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.deckId,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#302718',

         },
       }),
     },
     NewCard: {
       screen: NewCard,
       navigationOptions: ({ navigation }) => ({
         title: navigation.state.params.deckId,
         headerTintColor: 'white',
         headerStyle: {
           backgroundColor: '#302718',

          },
        }),
      },
      NoCards: {
        screen: NoCards,
        navigationOptions: ({ navigation }) => ({
          title: 'Empty Deck',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#302718',

           },
         }),
       },
       Quiz: {
         screen: Quiz,
         navigationOptions: ({ navigation }) => ({
           title: 'Quiz',
           headerTintColor: 'white',
           headerStyle: {
             backgroundColor: '#302718',

            },
          }),
        },
      });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1FF',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});

const AppContainer = createAppContainer(StackNavigator);
