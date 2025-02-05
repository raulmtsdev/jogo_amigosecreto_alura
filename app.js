// Jogo de Amigo Secreto 

// variavel para armazenar nome dos participantes

let participantes = [];
let sorteio = {};

// adicionar um novo participante usando uma função 

function adicionarAmigo() {
    const inputNome = document.getElementById('amigo');
    const nome = inputNome.value.trim();

    if (nome === "") {
        alert("Nome inválido. Tente novamente.");
        return;
    }

    if (participantes.includes(nome)) {
        alert("Este nome já foi adicionado.");
        return;
    }

    participantes.push(nome);
    atualizarListaParticipantes();
    inputNome.value = "";
}

// Mostar a lista de participantes na tela - usando função 

function atualizarListaParticipantes() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = "";

    //forEach - permite executar uma função para cada item de um array

    participantes.forEach((nome, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${nome}`;
        lista.appendChild(li);
    });
}

// Função para realizar o sorteio

function sortearAmigo() {
    if (participantes.length < 2) {
        alert("É necessário pelo menos 2 participantes para o sorteio.");
        return;
    }

    let tentativas = 0;
    let sucesso = false;

    //limite de tentativas 

    while (!sucesso && tentativas < 1000) {
        tentativas++;
        let participantesRestantes = [...participantes];
        sucesso = true;

        /*A função REDUCE do JavaScript serve para iterar sobre um array e utilizar 
        o valor de cada item para criar um objeto final com base em alguma regra*/

        sorteio = participantes.reduce((acc, participante) => {
            const possiveis = participantesRestantes.filter(p => p !== participante);

            if (possiveis.length === 0) {
                sucesso = false;
                return {};
            }
            /*MATCH.FLOOR - retorna o menor número inteiro dentre o número */

            const sorteado = possiveis[Math.floor(Math.random() * possiveis.length)];
            acc[participante] = sorteado;
            participantesRestantes = participantesRestantes.filter(p => p !== sorteado);

            return acc;
        }, {});
    }

    if (sucesso) {
        alert("O sorteio foi realizado com sucesso! Agora cada participante pode ver seu amigo secreto.");
        document.getElementById('campoSorteio').style.display = 'block';
    } else {
        alert("Não foi possível realizar o sorteio. Tente novamente.");
    }
}

// Função para mostrar o amigo secreto do participante
function mostrarAmigoSecreto() {
    const nomeParticipante = document.getElementById('nomeParticipante').value.trim();

    if (nomeParticipante === "") {
        alert("Por favor, digite seu nome.");
        return;
    }

    if (!participantes.includes(nomeParticipante)) {
        alert("Nome não encontrado na lista de participantes.");
        return;
    }

    const amigoSecreto = sorteio[nomeParticipante];
    document.getElementById('resultado').innerHTML = `${nomeParticipante}, seu amigo secreto é: <strong>${amigoSecreto}</strong>`;
}

//Reiniciar o sorteio

function reiniciarSorteio() {
    participantes = [];
    sorteio = {};
    document.getElementById('listaAmigos').innerHTML = "";
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('amigo').value = "";
    document.getElementById('nomeParticipante').value = "";
    document.getElementById('campoSorteio').style.display = 'none';
    alert("O sorteio foi reiniciado.");
} 
