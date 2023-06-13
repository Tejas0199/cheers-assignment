const express = require('express');
const cors = require('cors');
const path = require('path');
const { readFileSync , writeFileSync} = require('fs');

const { validateUser } = require('./helper');

const PORT = 4050;
const hostName = '127.0.0.8'

const app = express();
app.use(express.json());
app.use(cors({
	origin : "http://localhost:3000"
}))
//get api for Assignment 1
app.get('/movies',(request,response) => {
	response.status(200).sendFile(path.join(__dirname,"model.json"))
})
//get api for Assignment 2
app.get('/user/:id',(request,response) => {
	const { id } = request.params;
	const users = JSON.parse(readFileSync(path.join(__dirname,"user.json"),'utf-8'))
	const user = users.find((user) => user === id);
	if(user) {
		response.status(200).send({ message : "user existed" , user});
	} else {
		response.status(400).send({ message : "user dosn't exist"});
	}	
})
//post api for Assignment 2
app.post('/user',(request,response) => {
	const userData = request.body;
	const [isValid, errors] = validateUser(userData);
	if(isValid) {
		const users = JSON.parse(readFileSync(path.join(__dirname,"user.json"),'utf-8'))
		const id = users[users.length]?.id || 101;
		users.push({...userData,id : id + 1});
		writeFileSync(path.join(__dirname,"user.json"),JSON.stringify(users),"utf-8");
		response.status(201).send({ message : "successfully stored user data"})
	} else {
		response.status(400).send({ message : "something went wrong" , errors})
	}
})

app.listen(PORT,hostName,() => {
	console.log(`server is live in http://${hostName}:${PORT}`)
})