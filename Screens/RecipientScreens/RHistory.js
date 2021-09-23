import React from 'react';
import { StyleSheet, Text, View,ScrollView,Image, AsyncStorage, ActivityIndicator } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { AntDesign,FontAwesome,MaterialIcons,MaterialCommunityIcons} from '@expo/vector-icons'; 
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'
import Color from '../../constants/Color'
import Font from '../../constants/Font'
export default class History extends React.Component {
    static navigationOptions = {
        title: 'History',
          drawerIcon: ({ tintColor }) => (
            <FontAwesome name="history" size={20} style={{color:tintColor}} />
          )
    };
    constructor(props){
        super(props);
        this.state={
          value:1,
          show_error: false,
          error_message: '',
          isLoading: true,
            errorImage:false,
        }
        this.set_token()

      }
    
    set_token = async() =>{
        var tokken = await AsyncStorage.getItem('id')
        await this.setState({token: tokken})
        await this.gethistory()
    }

      
    gethistory=()=>{
        const formData = new FormData()
                    formData.append('user_id',this.state.token);
               
                    try{
                    fetch(`${BasePath}recepient_history.php`, {
                        
                        method: 'POST',
                        headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                        },
                        body:formData
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        
                        
                        this.setState({isLoading: false})
                        if(responseJson.error == true){
                        Toast.show(responseJson.error_msg)
                        this.setState({errorImage:true})
                        }else{
                            this.setState({dataSource: responseJson.history})
                            
                        }
                    })
                    .catch((error) =>{});
                    }catch(e){}
    }


    // componentDidMount(){
    //     return fetch('https://facebook.github.io/react-native/movies.json')
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    
    //         this.setState({
    //           isLoading: false,
    //           dataSource: responseJson.movies,
    //         }, function(){
    
    //         });
    
    //       })
    //       .catch((error) =>{
    //         console.error(error);
    //       });
    //   }
    
    
    
    
    
 

    render() {
        

        return (
            
            <View style={ styles.container }>
                
                <View style={{backgroundColor:Color.backgroundcolor,height:'20%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
                    <View style={{height:'40%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
                        <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                            <AntDesign name="arrowleft" size={25} color={'#fff'}  />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={{color:Color.HeadingColor,justifyContent:'center',textAlign:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold}}>History</Text>
                </View>
                
                    {/* Row 1 Start Here*/}
                    {this.state.isLoading? <View style={{marginTop:'50%',justifyContent: 'center',alignItems: 'center'}}><ActivityIndicator size={'large'} /></View>
                    :
                    <View style={{flex: 1, }}>
                        {this.state.errorImage?<View style={{flex:1,alignItems:'center'}}><Image style={{width:'100%',height:'100%'}} source={require('../../assets/nofound.jpg')}/></View>
                        :
                        <FlatList
                       keyExtractor={(item, index) => item.id}
                            data={this.state.dataSource}
                            renderItem={({item}) =>  <View style={{flexDirection:'row',margin:5,}}>
                            <View style={{width:'80%',backgroundColor:'#fff',padding:10,borderTopLeftRadius:10,borderBottomLeftRadius:10}}>
                                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Coupon {item.coupon}</Text>
                                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Meals Consumed {item.no_of_meals}</Text>
                                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Date : {item.date}</Text>
                                <Text style={{fontFamily:Font.Agency,fontSize:Font.normalText,}}>Status : {item.status}</Text>
                            </View>
                            <View style={{width:'20%',backgroundColor:'#fff',justifyContent:'center',padding:10,borderBottomRightRadius:10,borderTopRightRadius:10,}}>
                                {item.complete ?<MaterialIcons name='cloud-done' color='#3E991C' size={25}/>:
                                <MaterialCommunityIcons name='progress-clock' color='yellow' size={25}/>}    
                            </View>
                            
                        </View>  }
                            
                            />    
                    
                    }
                     </View>
                    }
            </View>
        );
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6e6ea',

    },
});