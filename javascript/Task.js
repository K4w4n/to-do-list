export class TaskList {
    titulo = '';
    tasks = [];
    taskList = [];
    constructor(titulo) {
        this.titulo = titulo;
    }
    addTask(task) {
        return true;
    }
    removeTask(task) {
        return true;
    }
    addTaskList(task) {
        return true;
    }
    removeTaskList(task) {
        return true;
    }
    get concluido() {
        return true;
    }
}

export class Task {
    titulo = '';
    concluido = false;
    concluir() { }
    desconcluir() { }
}