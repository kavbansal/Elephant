import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext();

function getCookieValue(a) {
	let b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
	return b ? b.pop() : null;
}

// this component will store the authentication status as well as the 
// authenticated information that we need.
export const AuthContextProvider = ({children}) => {
	// check cookie for auth
	// previous status of authentication
	const prevName = getCookieValue("name") || null;
	
	// previous authentication information
	const prevEmail = getCookieValue("email") || null;

	const prevUserID = getCookieValue("userID") || null;

	const prevMentor = getCookieValue("isMentor") || null;

	
	const [name, setName] = useState(prevName);
	const [email, setEmail] = useState(prevEmail);
	const [userID, setUserID] = useState(prevUserID);
	const [isMentor, setMentor] = useState(prevMentor);

	useEffect(
		// this anonymous function will automatically update the cookies
		() => {
			document.cookie = "name=" + name + "; path=/";
			document.cookie = "email=" + email + "; path=/";
			document.cookie = "userID=" + userID + "; path=/";
			document.cookie = "isMentor=" + isMentor +"; path=/";
		},
		[name, email, userID, isMentor]
	)
	
	const defaultContext = {
		name,
		setName,
		email,
		setEmail,
		userID,
		setUserID,
		isMentor,
		setMentor
	}

	return (
		<AuthContext.Provider value={defaultContext}>
			{children}
		</AuthContext.Provider>
	);
};
