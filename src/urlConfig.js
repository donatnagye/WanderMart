const backendBase =
	window.location.hostname === 'localhost'
		? 'http://localhost:5000'
		: process.env.REACT_APP_Url;
export const backend = `${backendBase}/api`;
