import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core";
import {auth, provider} from "./firebase";
import {actionTypes} from "./reducer";
import {useStateValue} from "./StateProvider";
function Login() {
    const [{},dispatch] = useStateValue();

    const signIn  = () => {
        auth.signInWithPopup(provider).then(result => {
          dispatch({
              type: actionTypes.SET_USER,
              user: result.user,
          })  
        }).catch(error => alert(error.message));
        //will fail at this ONLY level first go and enable the feature for google at forebase console
    };
    return (
        <div>
           <div className="login">
               <div className="login__container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1021px-WhatsApp.svg.png" alt="whatsapp_symbol"/>
                <div className="login__text">
                    <h2>Sign in to Whatsapp</h2>
                </div>

                <Button type="submit" onClick={signIn}>Sign In With Google</Button>
               </div>
           </div> 
        </div>
    )
}

export default Login
