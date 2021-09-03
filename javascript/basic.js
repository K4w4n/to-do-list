class TaskList {
    #concluido;
    constructor(titulo, tasks) {
        this.titulo = titulo;
        this.tasks = tasks || [];
    }
    addTask(task) {
        this.tasks.unshift(task);
        registrarInfo(mainList);
        renderizarNaTela(rendenrizeTaskList(mainList));
        return true;
    }
    removeTask(task) {
        const indexTask = this.tasks.indexOf(task);

        if (indexTask == -1) {
            return false;
        }

        this.tasks.splice(indexTask, 1);
        registrarInfo(mainList);
        renderizarNaTela(rendenrizeTaskList(mainList));
        return true;
    }
    concluir() {
        return false;
    }
    desConcluir() {
        return false;

    }
    get concluido() {
        return this.tasks.reduce((acumulator, item) => {
            return acumulator && item.concluido;
        }, true);
    }
    set concluido(valor) {
        return valor;
    }
}
class Task {
    constructor(titulo) {
        this.concluido = false;
        this.titulo = titulo;
    }
    concluir() {
        if (!this.concluido) {
            this.concluido = true;
            registrarInfo(mainList);
            renderizarNaTela(rendenrizeTaskList(mainList));
            return true;
        } else {
            return false;
        }
    }
    desConcluir() {
        if (this.concluido) {
            this.concluido = false;
            registrarInfo(mainList);
            renderizarNaTela(rendenrizeTaskList(mainList));
            return true;
        } else {
            return false;
        }
    }
}

/**
 * @param {TaskList} task Instancia da classe TaskList
 * @returns {Element} elemento HTML com a classe task
 */

function rendenrizeTask(task, taskList) {
    const divTask = document.createElement('div');
    divTask.classList.add('task');
    if (task.concluido) {
        divTask.classList.add('checked');
    }
    const checkeboxVisual = document.createElement('div');
    checkeboxVisual.classList.add('checkebox-visual');
    checkeboxVisual.addEventListener('click', event => {
        if (task.concluido) {
            task.desConcluir();
        } else {
            task.concluir();
        }
    })

    const titleArea = document.createElement('div');
    titleArea.classList.add('title-area');

    const tituloTarefa = document.createElement('label');
    tituloTarefa.classList.add('titulo-tarefa');
    tituloTarefa.appendChild(document.createTextNode(task.titulo));

    const config = document.createElement('div');
    config.classList.add('config');

    const bola1 = document.createElement('div');
    bola1.classList.add('bola');

    const bola2 = document.createElement('div');
    bola2.classList.add('bola');

    const bola3 = document.createElement('div');
    bola3.classList.add('bola');

    const menuConfig = document.createElement('div');
    menuConfig.classList.add('menu-config');
    menuConfig.classList.add('disable');

    const labelAbrir = document.createElement('label');
    labelAbrir.appendChild(document.createTextNode('Abrir'));

    const labelEditar = document.createElement('label');
    labelEditar.appendChild(document.createTextNode('Editar'));

    const labelConcluir = document.createElement('label');
    labelConcluir.appendChild(document.createTextNode(task.concluido ? 'Desconcluir' : 'Concluir'));
    labelConcluir.addEventListener('click', event => {
        if (task.concluido) {
            task.desConcluir();
        } else {
            task.concluir();
        }
    })

    const labelExcluir = document.createElement('label');
    labelExcluir.appendChild(document.createTextNode('Excluir'));
    labelExcluir.addEventListener('click', event => {
        if (confirm('Voce deseja mesmo excluir a lista? listas deletadas não podem ser recuperadas')) {
            taskList.removeTask(task);
        }
    });
    menuConfig.appendChild(labelAbrir);
    menuConfig.appendChild(labelEditar);
    if (!task.tasks) {
        menuConfig.appendChild(labelConcluir);
    }
    menuConfig.appendChild(labelExcluir);

    config.appendChild(bola1);
    config.appendChild(bola2);
    config.appendChild(bola3);
    config.appendChild(menuConfig);

    const mostrar = (event) => {
        menuConfig.classList.remove('disable');
        menuConfig.classList.add('ative');
        config.removeEventListener('click', mostrar);
        config.addEventListener('click', ocultar);
        const foraDoElemento = (event) => {
            if (event.target != config && event.target.parentElement != config) {
                menuConfig.classList.remove('ative');
                menuConfig.classList.add('disable');
                config.removeEventListener('click', ocultar);
                config.addEventListener('click', mostrar);
                document.removeEventListener('click', foraDoElemento);
            }
        }
        document.addEventListener('click', foraDoElemento);
    }
    const ocultar = (event) => {
        menuConfig.classList.remove('ative');
        menuConfig.classList.add('disable');
        config.removeEventListener('click', ocultar);
        config.addEventListener('click', mostrar);
    }

    config.addEventListener('click', mostrar);

    titleArea.appendChild(tituloTarefa);
    titleArea.appendChild(config);

    divTask.appendChild(checkeboxVisual);
    divTask.appendChild(titleArea);

    return divTask;
}

/**
 * Essa function deverá renderizar a lista, e retornar o html
 * @param {TaskList} taskList Lista que deverá ser renderizada, é importante que ela seja uma instancia da class TaskList
 * @returns {Array} Um array em que cada item é um elemento HTML com a classe task
 */
function rendenrizeTaskList(taskList) {
    const newTaskAntiga = document.querySelector('.new-task');
    newTaskAntiga.parentNode.replaceChild(newTaskAntiga.cloneNode(true), newTaskAntiga);
    const newTaskButton = document.querySelector('.new-task');
    newTaskButton.cloneNode(true);
    newTaskButton.addEventListener('click', event => {
        const nameTask = prompt('Qual será o nome da sua nova tarefa?');
        if (nameTask) {
            taskList.addTask(new Task(nameTask));
        }
    });
    return taskList.tasks.map(((task) => {
        return rendenrizeTask(task, taskList);
    }));
}

function renderizarNaTela(taskRenderizada) {
    const taskListHTML = document.querySelector('.task-list');
    taskListHTML.innerHTML = '';
    if (Array.isArray(taskRenderizada)) {
        taskRenderizada.forEach((taskHTML) => {
            taskListHTML.appendChild(taskHTML);
        });
    } else {
        taskListHTML.appendChild(taskRenderizada);
    }

    const tituloLista = document.querySelector('.titulo-lista');
    tituloLista.innerText = mainList.titulo;
}

const mainList = carregarInfo();

renderizarNaTela(rendenrizeTaskList(mainList));

const menuHumburguer = document.querySelector('.humburguer');
menuHumburguer.addEventListener('click', (event) => {
    if (menuHumburguer.classList.contains('menu-fechado')) {
        menuHumburguer.classList.remove('menu-fechado');
        menuHumburguer.classList.add('menu-aberto');
    } else {
        menuHumburguer.classList.remove('menu-aberto');
        menuHumburguer.classList.add('menu-fechado');
    }
    /* alert('Menu humburguer não programado, alguma sugestão?\nEntre em contato: \ngithub.com/k4w4n'); */
});

function registrarInfo(info) {
    localStorage.setItem('mainList', JSON.stringify(info));
}
function carregarInfo() {
    const dados = localStorage.getItem('mainList');
    const dadosJson = dados ? JSON.parse(dados) : new TaskList('Suas tarefas');
    const converterDadoEmTask = (taskOrTasks) => {
        if (taskOrTasks.tasks) {//é uma taskList
            return new TaskList(taskOrTasks.titulo, taskOrTasks.tasks.map((task) => {
                const novaTask = converterDadoEmTask(task);
                novaTask.concluido = task.concluido;
                return novaTask;
            }));
        } else {
            return new Task(taskOrTasks.titulo);
        }
    }
    return converterDadoEmTask(dadosJson);
}