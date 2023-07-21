import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/navigations/Route';
import FlashMessage from 'react-native-flash-message';

import {Provider} from 'react-redux'
import store from './src/Redux/store/store'


export default function App() {
  return (
    <>
     <Provider store={store}>
      <Routes/>
      <FlashMessage position='top'/>
     </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
