import FullPageLoader from '../components/FullPageLoader.jsx';
import {useState} from 'react';
import{auth} from '../firebase/config.js';
import { createUserWithEmailAndPassword,
         sendPasswordResetEmail,
         signInWithEmailAndPassword,
         onAuthStateChanged  } from "firebase/auth";
import {useDispatch} from 'react-redux';
import {setUser} from '../store/usersSlice.js';



function LoginPage() {
  const dispatch=useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [userCredentials, setUserCredentials]= useState({});
  const [error, setError] = useState('login');
  const [success, setSuccess] = useState('login');
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      dispatch(setUser({id:user.uid, email:user.email}));
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      dispatch(setUser(null));
      // ...
    }
    if(isLoading){
      setIsLoading(false);}
  });
function handleCredentials(e){
  setError("");
  setUserCredentials({...userCredentials, [e.target.name]:e.target.value});
  //console.log(userCredentials);
}
//signup
function handleSignup(e){
    e.preventDefault();
    setError("");
   createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    dispatch(setUser({id:userCredential.user.uid, email:userCredential.user.email}));
    //setSuccess(user.email +'has been created successfully');
    // ...
  })
  .catch((error) => {
    setError(error.message);
  });
}
function handleLogin(e){
  e.preventDefault();
  setError("");
  signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
.then((userCredential) => {
  // Signed up 
  //const user = userCredential.user;
  ConsoleLog(userCredential.user /*email +'has been created successfully'*/);
  dispatch(setUser({id:userCredential.user.uid, email:userCredential.user.email}));
  // ...
})
.catch((error) => {
  setError(error.message);
});
}
function handlePasswordReset(e){
  const email=prompt('Please, enter your email');
  sendPasswordResetEmail(auth,email);
  alert("email sent! check your inbox for password reset instructions!");
}
function ConsoleLog(x){
  console.log(x);
}
  
    return (
      <>
        { isLoading && <FullPageLoader></FullPageLoader> }
        
        <div className="container login-page">
          <section>
            <h1>Welcome to the Book App</h1>
            <p>Login or create an account to continue</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Login
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Signup
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>Email *</label>
                      <input type="text" onChange={(e)=>{handleCredentials(e)}} name="email" placeholder="Enter your email" />
                  </div>
                  <div className="form-control">
                      <label>Password *</label>
                      <input type="password" onChange={(e)=>{handleCredentials(e)}} name="password" placeholder="Enter your password" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button className="active btn btn-block" onClick={(e)=>{handleLogin(e)}}>Login</button>
                    : 
                    <button className="active btn btn-block" onClick={(e)=>{handleSignup(e)}}>Sign Up</button>
                  }
                  {
                    error &&
                    <div className="error">
                      {error}
                    </div>
                  }
                  
                  <p className="forgot-password" onClick={(e)=>{handlePasswordReset(e)}}>Forgot Password?</p>

              </form>
          </section>
        </div>
      </>
    )
  }
  
  export default LoginPage
  