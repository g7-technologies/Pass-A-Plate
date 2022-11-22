import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Share extends React.Component {

  render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}> 
          <TouchableOpacity >
            <Text>Share</Text>
          </TouchableOpacity>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});