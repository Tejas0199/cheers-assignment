
const validateUser = (user) => {
	const { name , gender , email } = user;
	const error = {};
	if( name.length < 0 || (!/^[A-Z]/.test(name))) error.name = "Invalid username"
	if( email.length < 0 || (!/[.com]$/.test(email)) || ! email.includes("@")) error.email = "Invalid Email ID"
	if(!gender && !(gender === "male" || gender === "female")) error.gender = "Invalid gender"
	return [Object.keys(error).length === 0, error];
}

module.exports = { validateUser }