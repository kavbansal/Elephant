import React, { useContext } from 'react'
import { AuthContext } from '../helper/AuthContext';
import { Redirect } from 'react-router';

const Signout = () => {
  const {
		setName,
		setEmail,
		userID,
		setUserID,
		setMentor
	} = useContext(AuthContext)

	const Signout = () => {
		// log out
		setName(null);
		setEmail(null);
		setUserID(null);
		setMentor(false);
		window.location.reload(false);

	}
	
	if (userID !== 'null' && userID !== 'undefined') {
		Signout()
		return (
			<Redirect to="/" />
		);
	} else {
		return ( 
			<Redirect to="/" />
		);
	}
	
};

export default Signout;