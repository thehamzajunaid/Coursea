import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children}) => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    let location = useLocation();

    if(!currentUser) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }
 return children

};

export default ProtectedRoute;



// import React from 'react';
// import { Route, useNavigate  } from 'react-router-dom';
// import {Navigate, useLocation} from "react-router-dom"


// const ProtectedRoute = ({ isAuthenticated, component: Component, ...rest }) => {
//     const navigate = useNavigate();
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (isAuthenticated) {
//           return <Component/>;
//         } else {
//           // If the user is not authenticated, redirect them to the home page with a warning.
//         //   window.location('/');
//           return (
//             <>
//             <div>You are not authorized to go to this page. go back</div>
//             </>
//           ); // Return null or an appropriate component if needed.
//         //   return (
//         //     <Redirect   
//         //       to={{
//         //         pathname: '/',
//         //         state: { from: props.location },
//         //       }}
//         //     />
//         //   );
//         }
//       }}
//     />
//   );
// };

// export default ProtectedRoute;
