export class Item {
    titulo = '';
    ativar() { }
}
export class CreateElement {
    taskList(taskList) { }
    task(task){}
    #menuConfig(item){ }
    #checkBox(concluido){ }
    #titulo(titulo){ }
}
export class Tela {
    historicoNavegacao = [];
    abrir(taskList){}
    voltar(index){}
    #exibir(){}
    #defineTitulo(titulo){}
    defineTasks(taskList) {}
}
export class acao {
    descricao = '';
    estado = '';
    constructor(descricao, estado){
        this.descricao = descricao;
        this.estado = estado;
    }
}