const meuInput = document.querySelector('.meuInput');
const btnAdd = document.querySelector('.btnAdd');
const listaTarefas = document.querySelector('.listaTarefas');

function criarLi(){
    const li = document.createElement('li')
    return li
}

meuInput.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        if (!meuInput.value) return
        criarTarefa(meuInput.value)
    };
    // console.log(e)
})

function limparInput() {
    meuInput.value = '';
    meuInput.focus();
}

function criarBtnApagar(li){
    li.innerText += ' '
    const botao = document.createElement('button');
    botao.innerText = 'Apagar';
    botao.setAttribute('class', 'apagar')
    botao.setAttribute('title', 'Apagar está tarefa')
    li.appendChild(botao)
}

function criarTarefa(textoInput){
    const li = criarLi();
    li.innerText = textoInput
    listaTarefas.appendChild(li)
    limparInput()
    criarBtnApagar(li)
    salvarTarefa()
}

btnAdd.addEventListener('click', ()=>{
    if (!meuInput.value) return

    criarTarefa(meuInput.value)
})

document.addEventListener('click', (e)=>{
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
    }
})

function salvarTarefa() {
    const liTarefas = listaTarefas.querySelectorAll('li')
    const listaSalvarTarefas = []

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaSalvarTarefas.push(tarefaTexto)
    }
    const tarefasJSON = JSON.stringify(listaSalvarTarefas)
    localStorage.setItem('tarefas', tarefasJSON)
}

function adicionarTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas')
    const listaDeTarefas = JSON.parse(tarefas)

    for(let tarefa of listaDeTarefas){
        criarTarefa(tarefa)
    }
}

adicionarTarefasSalvas()