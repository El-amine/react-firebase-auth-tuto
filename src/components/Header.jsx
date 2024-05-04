import { NavLink } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";

function Header({pageTitle}) 
{   const dispatch=useDispatch();
    function handleSignOut(){
      if(confirm("Are you sure you want to log out ?"))
      {
        const auth = getAuth();
          signOut(auth).then(() => {
            alert("log out successfully!");// Sign-out successful.
            dispatch(setUser(null))
          }).catch((error) => {
            // An error happened.
          });
      }
    }
    return (
      <>

            <h1>{pageTitle}</h1>

            <div className="header-btns">

                    <NavLink to="/">
                      <button className="btn">
                          Books
                      </button>
                    </NavLink>

                    <NavLink to="/add-book">
                      <button className="btn">
                          Add Book +
                      </button>
                    </NavLink>

                    <button onClick={handleSignOut} className="btn transparent">
                      Logout
                    </button>

               
            </div>
    
      </>
    )
  }
  
  export default Header
  