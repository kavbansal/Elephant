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

	const prevCollege = getCookieValue("college") || null;

	const prevMentID = getCookieValue("mentID") || null;

	
	const [name, setName] = useState(prevName);
	const [email, setEmail] = useState(prevEmail);
	const [userID, setUserID] = useState(prevUserID);
	const [isMentor, setMentor] = useState(prevMentor);
	const [college, setCollege] = useState(prevCollege);
	const [mentID, setMentID] = useState(prevMentID);

	useEffect(
		// this anonymous function will automatically update the cookies
		() => {
			document.cookie = "name=" + name + "; path=/";
			document.cookie = "email=" + email + "; path=/";
			document.cookie = "userID=" + userID + "; path=/";
			document.cookie = "isMentor=" + isMentor +"; path=/";
			document.cookie = "college=" + college +"; path=/";
			document.cookie = "mentID=" + mentID +"; path=/";
		},
		[name, email, userID, isMentor, college, mentID]
	)
	
	const defaultContext = {
		name,
		setName,
		email,
		setEmail,
		userID,
		setUserID,
		isMentor,
		setMentor,
		college,
		setCollege,
		mentID,
		setMentID
	}

	return (
		<AuthContext.Provider value={defaultContext}>
			{children}
		</AuthContext.Provider>
	);
};
