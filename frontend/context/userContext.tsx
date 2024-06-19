import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

/**
 * UserContextProvider is a React component that provides a UserContext to its
 * children. The UserContext holds the user's profile data and a function to
 * update the user's profile data.
 *
 * @param {Object} props - The props object containing the children of the component.
 * @param {ReactNode} props.children - The children components to be wrapped by the UserContext.
 * @return {ReactNode} The UserContextProvider component, which wraps the children components.
 */
export function UserContextProvider({ children }) {
  // State hook to hold the user's profile data.
  const [user, setUser] = useState(null);

  // Effect hook that fetches the user's profile data from the server on component mount.
  useEffect(() => {
    // If the user state is still null (i.e., no user data has been fetched yet)
    if (!user) {
      // Send a GET request to the '/profile' endpoint with credentials (cookies) enabled.
      axios.get('/profile', { withCredentials: true })
        .then(({ data }) => {
          // If the request is successful, set the user state to the data returned from the server.
          setUser(data);
        })
        .catch(error => {
          // If there is an error fetching the user's profile, log the error to the console.
          console.error('Error fetching profile:', error);
        });
    }
    // The effect should only run on component mount (i.e., an empty dependency array).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return the UserContextProvider component, which provides the user and setUser functions to its children.
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
