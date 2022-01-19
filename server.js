const express = require('express');
const connection= require('./config');

const PORT = process.env.PORT || 3001;
// 3306 reserved for mysql

const app = express();

// turn on body-parser
// makes req.body exist 

app.use(express.json());
app.use(express.urlencoded({extended: true})); 

//POST- create todo
//async await
//async declares a functyion as "async" allows us to use "await" syntax inside of that function

app.post('/api/todos', async (req, res) => {

const {task} = req.body;
// If the user does not provide a task, respond with an error
if(!task){
    return res.status(400).json({error: 'You must provide a task'});
}
// if there is a task save it to the database
// JS will "try" to run every single line of code inside of the "try" block
// if any lines of the code throws an error, JS will take that error and 
// put that error in the "catch" block, and then run the code in the "catch block"
try {
    const insertQuery = 'INSERT INTO todos(task) VALUES(?);';
    const getTodoById = 'SELECT * FROM todos WHERE id = ?;';
    const [result] = await connection.query(insertQuery, [task]);
    //whenever we do an INSERT, UPDATE, OR DELETE query in mysql2 or mysql npm package
    // it doesn't give us the data that was interacted with. it instead tells us information about the
    //about how many rows were affected and maybe the inserted id or updated of the regarding data
    //it also gives us an array with 2 elements. The 1st one is an object where we have the information we need 
    //2nd is a null
    const [todosResult] = await connection.query(getTodoById, [result.insertId]);
    res.json(todosResult[0]);
}catch(e){
    res.status(400).json(e);
}

});

app.listen(PORT, ()=> console.log(`Server listening on port ${PORT}`));