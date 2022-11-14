const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const bodyParser=require('body-parser')
const pool=require('./dbConnect')
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', async(req, res) => {
    let response= await pool.query('SELECT * FROM todolist')
    console.log(response)
    res.json({info:'Node db connection Successful'})
})
app.get('/getFilter',async(req,res)=>{
  let response=await pool.query(`SELECT * FROM todolist where done=$1`,[req.body.done])
  console.log(response)
  res.json({"info":"Get all tasks by filter"})
})
//get tasks total sum true and false
app.get('/getSum',async(req,res)=>{
  let gettotal=await pool.query(`SELECT count(id) AS "Total Tasks" FROM todolist`)
  let gettrue=await pool.query(`SELECT count(done) AS "tasks" FROM todolist group by done order by count(done) ASC`)
  // let getfalse=await pool.query(`SELECT count(done) FROM todolist where done=false`)
  // console.log(res.json({
  //   'Total':gettotal,
  //   "done":gettrue,
  //   "False":getfalse})
  //   )
  // const subtotal=JSON.parse(gettotal)
  // const subtrue=JSON.parse(gettrue)
  // const subfalse=JSON.parse(getfalse)
  res.json({
    'Total':gettotal.rows[0],
    "Done" : gettrue.rows[0],
    "Undone" : gettrue.rows[1],
    // "Undone":getfalse.rows[0]
  })
})
//get task
app.get('/getTask',async(req,res)=>{
  let response=await pool.query(`SELECT * FROM todolist where id=$1`,[req.body.id])
  console.log(response)
  res.json({"info":"Got one task"})
})
//get tasks done by filter true
app.post('/create',async(req,res)=>{
  let query=await pool.query(`INSERT INTO todolist (task,done) VALUES($1,$2)`,[req.body.task,req.body.done])
  res.json({"info":"Created Sucessfully"})
})


app.put('/update', async(req, res) => {
  let updateuser = await pool.query(`UPDATE todolist
                   SET task = $2
                   WHERE id = $1`,[req.body.id,req.body.task])
 
    res.json({"info":'updation successful. Check Console'})
    // let query= await pool.query('SELECT * FROM todolist')
})
app.put('/updateDone', async(req, res) => {
  let updateuser = await pool.query(`UPDATE todolist
                   SET done = $2
                   WHERE id = $1`,[req.body.id,req.body.done])
 
    res.json({"info":'updation successful. Check Console'})
    // let query= await pool.query('SELECT * FROM todolist')
})
app.delete('/delete',async(req,res)=>{
const query=await pool.query(`DELETE FROM todolist where id = $1`,[req.body.id]);

  res.json({info:'Deletion Successful'})
  let query2= await pool.query('SELECT * FROM todolist')
  console.log(query2);

})

app.listen(port, () => {
   
  console.log(`Example app listening on port ${port}`)
})