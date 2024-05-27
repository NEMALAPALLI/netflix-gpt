import { useRef, useState } from "react"
import Header from "./Header"
import { checkvalidData } from "../utils/validate"
import { createUserWithEmailAndPassword,updateProfile  } from "firebase/auth";
import {auth} from "../utils/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login=()=>{
    const [isSignForm,setIsSignInForm]= useState(true)
    const [errorMessage,setErrorMessage]= useState(null)
    const navigate= useNavigate()
    const dispath = useDispatch()
   const name= useRef(null);
    const email= useRef(null);
    const password= useRef(null);

//toggle sign/singup
    const toggleSiginForm=()=>{
setIsSignInForm(!isSignForm);
    }



    const handleButtonClick=()=>{
        //validate the form data
        // console.log(email.current.value)
        // console.log(password.current.value)
        const message=checkvalidData(email.current.value,password.current.value)
// console.log(message)
setErrorMessage(message)
 if(message) return;
// sign / singup logic
if(!isSignForm){
    //singup logic
    createUserWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user,{
      displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/99918754?v=4"
    }).then(() => {
      // Profile updated!
      const {uid,email,displayName,photoURL} = auth.currentUser
      dispath(
        addUser({
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL:photoURL,
        })
      )
      navigate("/browse")

    }).catch((error) => {
     setErrorMessage(error.message)
    });
    console.log(user)

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage)
    // ..
  });
}
else{
    //sing in logic
    signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
console.log(user)
navigate("/browse")
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

}

    }

    
    return(
        <div >
            <Header/>
            <div className="absolute">
            <img 
            className="w-screen"
            alt="backgorundimage" src="https://i0.wp.com/bigtechquestion.com/wp-content/uploads/2020/05/netflix.jpg?fit=1200%2C675&ssl=1"/>
            </div>

            <form  onSubmit={(e)=>e.preventDefault()}
            className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 bg-opacity-80  text-white">
               <h1 className="font-bold text-3xl py-4">{isSignForm ? "Sign In": "Sign Up" }</h1>
               {!isSignForm && (
                                <input type="text" placeholder="Full Name" className="p-2 my-4 w-full bg-gray-700"/>

               )}
                <input ref={email} type="text" placeholder="Email Address" className="p-2 my-4 w-full bg-gray-700"/>
                <input ref={password} type="password" placeholder="Password" className="p-2 my-4 w-full bg-gray-700"/>
              <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
                <button className="p-2 my-6 bg-red-600 w-full rounded-lg" onClick={handleButtonClick}>{isSignForm ? "Sign In": "Sign Up" }</button>
            <p className="py-2 cursor-pointer" onClick={toggleSiginForm}>
                {isSignForm ? " New to NetFlix? Sign Up Now" : "Already registerd? Sign In Now"}</p>
            </form>
        </div>
    )
}
export default Login