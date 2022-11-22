import React,{useState} from 'react'
import {TextInput, StyleSheet } from 'react-native';


const phonenumber =(props)=>{
    const [entervalue,setentervalue]=useState('');
    const numberinputhandler=textvalue=>{
        setentervalue(textvalue.replace(/[^0-9]/g,''))
    }
   const consfirmnumber=()=>{
    const chosenumber=parseInt(entervalue)
    if(chosenumber===NaN){
     Alert.alert('Invalid Number !','Number should be Between 0-99',[{text:'Okay',style:'destructive',}])
      return;
    }
   }

    return  <TextInput keyboardType='number-pad' onChangeText={numberinputhandler} value={entervalue} maxLength={12}  style={styles.InputFieldsStyle}/>
        
}

const styles=StyleSheet.create({
    InputFieldsStyle:{
        fontFamily: 'Agency',
         marginTop:5,
         borderWidth:1,
         borderRadius:5,
         borderColor:'#044355',
         padding:5,
         paddingHorizontal:15,
         marginBottom:10,
      },
})
  export default phonenumber;
  