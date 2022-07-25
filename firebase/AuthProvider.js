import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';

import {auth} from '../firebase'

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          login: (email, password) => {
            try {
              return  signInWithEmailAndPassword(auth,email,password)
            } catch (e) {
              console.log(e);
            }
          },
          register:(email, password,fullname,imgUrl) => {
            try {
              return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    updateProfile(userCredential.user,{
                        displayName: fullname,
                        email: email,
                        photoURL:imgUrl
                    })
                   }).catch((error) => {
                    Alert.alert(error.message)
                   })
            } catch (e) {
              console.log(e);
            }
          },
          logout:() => {
            try{
              return signOut(auth)
            } catch (e) {
              console.error(e);
            }
          }
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };