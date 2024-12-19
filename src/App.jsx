import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


import Register from './components/Register';
import VantaRings from './components/VantaRings';
import UserProfile from './components/UserProfile';

function App() {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);

	const fetchUsers = async () => {
		try {
			const response = await axios.get('https://authback-jxx5.onrender.com/api/users');
			setUsers(response.data);
		} catch (error) {
			console.error("Error fetching users:", error);
		}
	};

	const addUser = async (userData) => {
		try {
			const response = await axios.post('https://authback-jxx5.onrender.com/api/users', userData);

			if (response.status === 201) {
				fetchUsers();
				alert("Registered Successfully !");
			}
		} catch (error) {
			if (error.response && error.response.status === 400) {
				// alert("User already exists!");
			} else {
				console.error("Error adding user:", error);
				// alert("Something went wrong. Please try again.");
			}
		}
	};


	useEffect(() => {
		fetchUsers();

		// Check token on app load
		const token = localStorage.getItem("authToken");
		// console.log(token);  // Log the JWT token before sending it back in the response

		if (token) {
			const decoded = jwt_decode(token);
			// console.log(decoded);
			setCurrentUser(decoded);
		}
	}, []);

	return (
		<div className='w-screen h-screen overflow-hidden '>
			<VantaRings />
			<div className='absolute z-40 top-0 h-screen w-screen py-0 flex items-center p-2 md:p-20 lg:p-60  ' >
				<Register addUser={addUser} />
			</div>
			<UserProfile currentUser={currentUser} />
			{/* <UserList users={users} /> */}
		</div>
	);
}

export default App;
