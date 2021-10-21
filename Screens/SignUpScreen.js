import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button,Input } from 'react-native-elements';
import {app,db} from '../firebase';
const SignUpScreen = ({navigation}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [photoUrl,setPhotoUrl] = useState('');
    return (
        <View style={styles.container} >
            <Text style={{fontSize:20}} >SignUp</Text>
            <Input  placeholder='Name'  leftIcon={{ type: 'font-awesome', name: 'user' }}
                leftIconContainerStyle={{ marginLeft: 0 }}
                inputContainerStyle={{ borderBottomColor: '#5AC8FA' }}
                value={name}
                onChangeText={(text)=>setName(text)}
            />
            <Input
                placeholder='Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                leftIconContainerStyle={{ marginLeft: 0 }}
                inputContainerStyle={{ borderBottomColor: '#5AC8FA' }}
                value={email}
                onChangeText={(text)=>setEmail(text)}
            />
            <Input
                secureTextEntry={true}
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                leftIconContainerStyle={{ marginLeft: 0 }}
                inputContainerStyle={{ borderBottomColor: '#5AC8FA' }}
                value={password}
                onChangeText={(text)=>setPassword(text)}
            />
            <Input
                placeholder='Photo Url (Optional)'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                leftIconContainerStyle={{ marginLeft: 0 }}
                inputContainerStyle={{ borderBottomColor: '#5AC8FA' }}
                value={photoUrl}
                onChangeText={(text)=>setPhotoUrl(text)}
            />
            <Button title='Sign Up' onPress={()=>{
                app.auth().createUserWithEmailAndPassword(email,password).then(authenticatedUser=>{
                    authenticatedUser.user.updateProfile({
                        photoURL:photoUrl?photoUrl:null,
                        displayName:name
                    }).then(res=>{
                        navigation.replace('Login')
                    }).catch(error=>{
                        alert(error.message)
                    })
                    db.collection('users').add({
                        name:name,
                        photoUrl:photoUrl?photoUrl:null,
                        email:authenticatedUser.user.email
                    })
                }).catch(error=>{
                    alert(error.message)
                })
            }
            }/>
        </View>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
