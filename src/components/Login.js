import { useRef, useState } from "react"
import Header from "./Header"
import { checkvalidData } from "../utils/validate"

const Login=()=>{
    const [isSignForm,setIsSignInForm]= useState(true)
    const [errorMessage,setErrorMessage]= useState(null)
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
// sign / singup
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