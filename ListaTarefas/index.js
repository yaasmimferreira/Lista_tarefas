const texto = document.querySelector('input')
const inserir = document.querySelector('.inserir button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')

var itensDB = []

btnDeleteAll.onclick = () => {
    itensDB = []
    updateDB()
}

texto.addEventListener('keypress', e => {
    if (e.key == 'Enter' && texto.value != '') {
        setItemDB()
    }
})

inserir.onclick = () => {
    if (texto.value != '') {
        setItemDB()
    }
}

function setItemDB() {
    if (itensDB.length >= 20) {
        alert('Limite máximo de 20 itens atingido!')
        return
    }

    itensDB.push({ 'item': texto.value, 'status': '' })
    updateDB()
}

function updateDB() {
    /*LocalStorage: é uma forma de armazenar os dados na web
    JSON: é um forma de notação de objeto, ou seja, ele apresenta os dados */ 
    localStorage.setItem('todolist', JSON.stringify(itensDB))
    loadItens()
}

function loadItens() {
    ul.innerHTML = "";
    itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
    itensDB.forEach((item, i) => {
        insertItemTela(item.item, item.status, i)
    })
}

function insertItemTela(text, status, i) {
    const li = document.createElement('li')

    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>
    `
    ul.appendChild(li)

    if (status) {
        document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
    } else {
        document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
    }
    /*$: chama a variavel*/ 
    texto.value = ''
}

function done(chk, i) {

    if (chk.checked) {
        itensDB[i].status = 'checked'
    } else {
        itensDB[i].status = ''
    }

    updateDB()
}

function removeItem(i) {
    itensDB.splice(i, 1)
    updateDB()
}

loadItens()

