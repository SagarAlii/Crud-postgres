const pool = require('../dbConnect')

class TodoRepo {

    async getAllTasks() {
        return await pool.query('select * from todolist');
    }

    async createTaskRepo(id, task, done) {
        return await pool.query(`INSERT INTO todolist
        (id, task, done)
        VALUES($1, $2, $3)`,
        [id, task, done]);
    }
    async updateTaskByTask(id, task) {
        return await pool.query(`UPDATE todolist
        SET task=$2
        where id=$1`,
        [id, task]);
    }
    async deleteTask(id){
        return await pool.query(`DELETE FROM todolist where id = $1`,[id]);
    }
}

module.exports = TodoRepo;