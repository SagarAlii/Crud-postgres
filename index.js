const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const pool=require('./dbConnect')

app.get('/', async(req, res) => {
    let response= await pool.query('SELECT * FROM todolist')
    console.log(response)
    res.json({info:'Node db connection Successful'})
})
app.get('/update', async(req, res) => {
  let updateuser=`UPDATE todolist
                   SET task = 'Updated Successfully by code'
                   WHERE id = 1`;
  try {
    await pool.connect();   //gets connection
    await pool.query(updateuser);  //update user.
    return true
    let query=
    console.log()
    
  } catch (error) {
    console.log(error.stack)
    return false
  }
  finally{
    res.json({info:'updation successful. Check Console'})
    let query= await pool.query('SELECT * FROM todolist')
    console.log(query);
  }
})
app.get('/delete',async(req,res)=>{
const query=`DELETE FROM todolist where id = 1`;
try {
  await pool.connect(); //connect to db
  await pool.query(query); //delete and update to table
  return true
  
} catch (error) {
  console.log(error.stack)
  return false
}
finally{
  res.json({info:'Deletion Successful'})
  let query= await pool.query('SELECT * FROM todolist')
  console.log(query);
}

})

app.listen(port, () => {
   
  console.log(`Example app listening on port ${port}`)
})