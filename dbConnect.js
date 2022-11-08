
const {Pool} = require('pg')
const pool = new Pool({
    user:'nokjxzexgiddbc',
    host:'ec2-18-215-41-121.compute-1.amazonaws.com',
    database:'db741pj5ar6i8a',
    password:'80fa1904058f93e42870f5077e528136a2de9d1ca1ce8cf8903f944f53cad0c0',
    port:5432,
    ssl:{
        rejectUnauthorized:false
    }
});
module.exports = pool;