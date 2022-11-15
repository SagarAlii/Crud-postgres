const TodoRepo = require('../repository/todoRepo')

class TodoController {
    async getAll(request, response) {
        const todoRepo = new TodoRepo();
        let res = await todoRepo.getAllTasks();
        response.json({
            todo: res.rows
        });
    }

    async createTask(request, response) {
        const todoRepo = new TodoRepo();
        let res = await todoRepo.createTaskRepo(request.body.id,request.body.task, request.body.done);

        response.json({
            "status": "Task created"
            })
    }
    async updatetask(request,response){
        const todoRepo=new TodoRepo();
        let res=await todoRepo.updateTaskByTask(request.body.id,request.body.task);
        response.json({
            "status": "Task Updated"
            })
    }
    async deleteOneTask(request,response){
        const todoRepo=new TodoRepo();
        let res=await todoRepo.deleteTask(request.body.id);
        response.json({
            "status": "Task Deleted Sucessfully"
            })
    }
}

module.exports = TodoController;