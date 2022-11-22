import React from 'react';
import { StyleSheet, Text, View,} from 'react-native';
import { AntDesign} from '@expo/vector-icons'; 
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import Color from '../../constants/Color'
import Font from '../../constants/Font'

export default class Dashboard extends React.Component {
    static navigationOptions = {
      title: 'Meal Status',
        drawerIcon: ({ tintColor }) => (
          <AntDesign name="checkcircle" size={20} style={{color:tintColor}} />
        )
    };
  

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {/*-----------Meal Status-------------*/}
        <View style={{backgroundColor:Color.backgroundcolor,height:'30%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
          <View style={{height:'25%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
            <TouchableOpacity  style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
              <AntDesign name="arrowleft" size={25} color={Color.defaultIconColor}  />
            </TouchableOpacity>
          </View>
            <Text style={{color:Color.HeadingColor,justifyContent:'center',textAlign:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold}}>Coupon Status</Text>
        </View>
        {/*-----------Meal Status Buttons-------------*/}
        <View style={{height:'10%',flexDirection:'row',padding:10,marginTop:'-20%',justifyContent:'space-evenly',}}>
          <TouchableOpacity>
            <View style={{width:150,height:150,elevation:3,justifyContent:'center',backgroundColor:'#fff',borderRadius:15}}>
              <Text style={{padding:10,textAlign:'center',fontSize:Font.normalText,fontFamily:Font.AgencyBold}}>Active Coupon</Text>
              <Text style={{padding:10,fontSize:Font.normalText,textAlign:'center',fontFamily:Font.AgencyBold}}>22</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{width:150,height:150,elevation:3,justifyContent:'center',backgroundColor:'#fff',marginLeft:10,borderRadius:15}}>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>Consumed Coupon</Text>
              <Text style={{fontSize:Font.normalText,padding:10,textAlign:'center',fontFamily:Font.AgencyBold}}>10</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/*-----------Meal Status List -------------*/}
        <View style={{height:'60%',marginTop:110,alignItems:'center',justifyContent:'center',padding:10}}>
          <Text style={{fontFamily:Font.AgencyBold,fontSize:Font.normalText}}>Empty</Text>
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#e6e6ea',

  },
});



