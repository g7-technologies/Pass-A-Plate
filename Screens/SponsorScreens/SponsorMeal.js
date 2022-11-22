import React from 'react';
import { StyleSheet, Text,Image,ScrollView, View,AsyncStorage,ActivityIndicator,Modal, TouchableHighlight } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons,AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast'
import {BasePath} from '../../config/path'
import Color from '../../constants/Color'
import Font from '../../constants/Font'
export default class SponsorMeal extends React.Component {
  static navigationOptions = {
    title: 'Sponsor Meal',
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="restaurant" size={25} style={{color:tintColor}} />
      )
  };
  constructor(props){
    super(props);
    this.state={
      card: '',
      cvc: '',
      expiry: '',
      myemail:'',
      card_holder:'xyz',
      postal:'2312',
      public_key: "pk_test_JyWtTF6wpanWMgOGw5YGwJPE00fqEH7FE4",
      show_error: false,
      error_message: '',
      status: false,
      value:1,
      user_id:'',
      sponsor_id:'',
      isLoading: false,
      showModal: false,
      modalVisible: false,
    }
    this.set_token();
  }

  show_error_message = () =>{
    if(this.state.show_error){
      if(this.state.status){
        return(
          <Text style={{margin:10,color: 'green',textAlign:'center'}}>{this.state.error_message}</Text>
        )
      }else{
        return(
          <Text style={{margin:10,color: 'red',textAlign:'center'}}>{this.state.error_message}</Text>
        )
      }
    }
  }

  storedate = async (response) =>{
    const { navigate } = this.props.navigation;
    try{
      console.log(response.total_donations)  
      await AsyncStorage.setItem('total_donation', response.total_donations);
    }catch(e){}
  }
  setModalVisible=(visible)=> {
    this.setState({modalVisible: visible});
  }
  cc_format_date = (value) => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (var i=0, len=match.length; i<len; i+=2) {
        parts.push(match.substring(i, i+2))
    }
    if (parts.length) {
      var vv =  parts.join('/')
      this.setState({ expiry: vv })
      return vv
    } else {
      var vv = value
      this.setState({ expiry: vv })
      return vv
    }
  }

  cc_format = (value) => {
    var v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    var matches = v.match(/\d{4,16}/g);
    var match = matches && matches[0] || ''
    var parts = []
    for (var i=0, len=match.length; i<len; i+=4) {
        parts.push(match.substring(i, i+4))
    }
    if (parts.length) {
        var vv =  parts.join(' ')
        console.log(vv)
        this.setState({ card: vv })

        return vv
    } else {
        var vv = value
        console.log(vv)
        this.setState({ card: vv })
        return vv
    }
  }

  payment_submit = () => {
    console.log('Payment Submit');
    if(this.state.card != '' && this.state.expiry != '' && this.state.cvc != '' && this.state.myemail != ''){
      if(this.ValidateEmail(this.state.email)){
        this.setState({isloading: true })
        var cardNum = this.state.card
        cardNum=cardNum.replace(/ +/g, "");
        cardDates = this.state.expiry
        cardDates = cardDates.split('/')
        var month = cardDates[0]
        var year = cardDates[1]
        console.log('month '+month)
        console.log('year '+year)
        console.log('card '+cardNum);
        var stripe_url = 'https://api.stripe.com/v1/tokens?card[number]='+cardNum+'&card[exp_month]='+month+'&card[exp_year]='+year+'&card[cvc]='+this.state.cvc+'&card[name]='+this.state.myemail;
        this.stripePayment(stripe_url)
        console.log('url '+stripe_url);
      }else{
        this.setState({error_message: 'Invalid Email',isLoading:false})
      }
    }else{
      this.setState({error_message: 'All Field are Required',isLoading:false})
    }
  }

  stripePayment = async (url) => {
    console.log('again url '+url)
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Bearer "+this.state.public_key
      }
    });
    let responseJson = await response.json();
    console.log('response from stripe '+responseJson)
    if (responseJson.error){
      this.setState({isloading: false, show_error: true, error_message: responseJson.error.message})
    }else{
      this.charge_request(responseJson.id)
    }
  }

  set_token = async() =>{
    var sponsor_id = await AsyncStorage.getItem('id')
    await this.setState({user_id: sponsor_id})
    console.log('Sponsor_id '+this.state.user_id);
  }

  charge_request = (id) => {
    const formData = new FormData()
    formData.append('sponsor_id', this.state.user_id);
    formData.append('meals', this.state.value);
    formData.append('amount', this.state.value*10);
    formData.append('tax', (this.state.value*0.95).toFixed(2));
    formData.append('token', id);
  
    try{console.log(BasePath)
      fetch(`${BasePath}donate-now`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body:formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('response from server '+responseJson)
         this.setState({isLoading: false})
        if(responseJson.error == true){ 
         
          Toast.show(responseJson.error_msg)
         
        }else{
          Toast.show(responseJson.success_msg)
          AsyncStorage.setItem('total_donation', JSON.stringify(response.total_donations));
          this.setState({modalVisible:false})
        }
      })
      .catch((error) =>{});
    }catch(e){}
  
  }

  incressnumber=(text)=>{
    
      
    if(text<10){this.setState({error_message:''})
    this.setState({value:text+1})
    }else{
      this.setState({error_message:'Maximum Deposit of is 10'})
    }
  }
  checknumber=(text)=>{
    
    if(text>1){
      this.setState({error_message:''})
      this.setState({value:text-1})
      console.log(text)
    }else{
      return this.setState({error_message:'Minimum deposit of 1 '})
    }
  }
  ValidateEmail=(mail)=> 
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
      {
        return (true)
      }
      
        return (false)
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <View style={{backgroundColor:Color.backgroundcolor,height:'60%',borderBottomStartRadius:20,borderBottomEndRadius:20}}>
            <View style={{height:'40%',justifyContent:'center',alignItems:'flex-start',marginLeft:12}}>
                <TouchableOpacity style={{alignItems:'flex-start'}} onPress={()=>this.props.navigation.goBack()}>
                  <AntDesign name="arrowleft" size={25} color={'#fff'}  />
                </TouchableOpacity>
            </View>
              <Text style={{color:Color.HeadingColor,justifyContent:'center',alignSelf:'center',fontSize:Font.headingText,fontFamily:Font.AgencyBold}}>Sponsor Meal</Text>
          </View>
        </View>  
        
        <View style={{justifyContent:'center',alignItems:'center',flex:1,margin:2}}>
          <Text style={{ fontSize:Font.normalText,fontFamily:Font.AgencyBold,margin:10,marginTop:30}}>How you can Help</Text>
          <Text style={{ fontSize:Font.normalText,fontFamily:Font.Agency,padding:10,marginBottom:50}}>About 11 million children as well as 42,000 college students experience hunger nightly.  By sponsoring a $10.95 per meal with .95 going toward taxes and fees.</Text>
        </View>
        
        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
          
            <Text style={{color:'red',fontFamily:Font.Agency}}>{this.state.error_message}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
             <TouchableOpacity onPress={()=>this.incressnumber(this.state.value)}><Text style={{borderBottomLeftRadius:10,borderTopLeftRadius:10,color:'#fff',padding:10,paddingHorizontal:20,borderWidth:1,backgroundColor:'#044355',fontSize:20}}>+</Text></TouchableOpacity>
             <Text style={{padding:11,borderWidth:1,width:'30%',fontFamily:Font.Agency,textAlign:'center',fontSize:Font.normalText,}}>{this.state.value}</Text>
             <TouchableOpacity onPress={()=>this.checknumber(this.state.value)}><Text style={{borderTopRightRadius:10,borderBottomRightRadius:10,color:'#fff',padding:10,paddingHorizontal:20,borderWidth:1,backgroundColor:'#ff0000',fontSize:20}}>-</Text></TouchableOpacity>
            </View>

          <Text style={{ fontSize:Font.normalText,fontFamily:Font.AgencyBold,marginTop:15}}>Total Amount: ${Number((this.state.value*10.95).toFixed(2))}</Text>

          <View style={{flex:1,width:'100%',marginTop:15}}>
            { this.state.isLoading ?
              <View style={{justifyContent: 'center',alignItems: 'center'}}>
                <ActivityIndicator />
              </View>
              :
              <View>
             <Modal
              animationType='fade'
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
              
              }}>
              <View style={{marginTop: 22,}}>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image source={require('../../assets/logo.jpg')} style={{alignSelf:'center',width:'40%',height:'40%'}} />
              <Text style={{fontWeight:'bold'}}>Amount : 30.98</Text>
              </View>

                <ScrollView style={{width:'90%',alignSelf:'center'}}>
                  <TextInput placeholder='Card Number' value={this.state.card} maxLength={19} keyboardType = 'numeric' onChangeText={(text) => this.cc_format(text)} style={{marginVertical:10,borderBottomWidth:1,borderColor:'#dddddd'}} />
                  <TextInput placeholder='CVC' keyboardType = 'numeric'  maxLength={4} onChangeText={(text) => this.setState({ cvc: text })} style={{marginVertical:10,borderBottomWidth:1,borderColor:'#dddddd'}} />
                  <TextInput placeholder='Expiry' value={this.state.expiry} maxLength={5} keyboardType = 'numeric' onChangeText={(text) =>  this.cc_format_date(text)} style={{marginVertical:10,borderBottomWidth:1,borderColor:'#dddddd'}} />
                  <TextInput placeholder='Email' value={this.state.myemail}  keyboardType = 'email-address' onChangeText={(text) =>  this.setState({myemail:text})} style={{marginVertical:10,borderBottomWidth:1,borderColor:'#dddddd'}} />
                  {this.state.isLoading?<View><ActivityIndicator/></View>:
                  <View style={{flexDirection:'row',justifyContent:'space-around'}}>

                  <View style={{width:'30%',marginTop:40}}>
                    <TouchableHighlight style={{borderRadius:5,borderWidth:1,padding:15,}}
                    onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={{fontSize:Font.normalText,fontFamily: Font.AgencyBold,textAlign:'center',color:Color.textcolor}}>Cancel</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={{width:'30%',marginTop:40}}>
                  <TouchableHighlight style={{borderRadius:5,borderWidth:1,padding:15,}} onPress={()=>this.payment_submit()}> 
                    <Text style={{fontSize:Font.normalText,fontFamily: Font.AgencyBold,textAlign:'center',color:Color.textcolor}}>Ok</Text>
                  </TouchableHighlight>
                  </View>


                    </View>
                  
                  }
                
                </ScrollView>

                
              </View>
            </Modal>
                <TouchableOpacity   onPress={() => this.setModalVisible(true)} style={{borderWidth:1,borderColor:Color.bordercolor,borderRadius:10,padding:10,margin:10}} >
                <Text style={{textAlign:'center',fontFamily:Font.Agency,color:Color.textcolor,fontSize:Font.normalText}}>Proceed to Payment</Text>
                </TouchableOpacity>
              </View>
              
            }
          </View>
          <View style={{flex:0.3}}/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});