// script.js

let jogadores = [];
let resultados = [];
let historico = [];
let rodada = 0;
let criaturas = [];

document.getElementById('cadastrarBtn').addEventListener('click', cadastrarJogador);
document.getElementById('visualizarBtn').addEventListener('click', visualizarJogadores);
document.getElementById('iniciativaBtn').addEventListener('click', gerarIniciativa);
document.getElementById('historicoBtn').addEventListener('click', visualizarHistorico);

function mostrarDialogo(conteudoHTML) {
    const overlay = document.getElementById("dialogOverlay");
    const dialog = document.getElementById("dialogContent");
    dialog.innerHTML = conteudoHTML;
    overlay.style.display = "flex";
}

function fecharDialogo() {
    document.getElementById("dialogOverlay").style.display = "none";
}

function cadastrarJogador() {
    const conteudo = `
        <h2>Cadastrar Jogador</h2>
        <label>Nome do Jogador:</label><input type="text" id="nomeJogador"><br>
        <label>Bônus de Iniciativa:</label><input type="number" id="bonusJogador"><br>
        <button onclick="salvarJogador()">Salvar</button>
        <button onclick="fecharDialogo()">Cancelar</button>
    `;
    mostrarDialogo(conteudo);
}

function salvarJogador() {
    const nome = document.getElementById('nomeJogador').value;
    const bonus = parseInt(document.getElementById('bonusJogador').value);
    if (nome && !isNaN(bonus)) {
        jogadores.push({ nome, bonus });
        fecharDialogo();
    }
}

function visualizarJogadores() {
    let conteudo = '<h2>Jogadores Cadastrados</h2><table><tr><th>Nome</th><th>Bônus</th><th>Ações</th></tr>';
    jogadores.forEach((jogador, index) => {
        conteudo += `
            <tr>
                <td>${jogador.nome}</td>
                <td>${jogador.bonus}</td>
                <td><button onclick="removerJogador(${index})">Remover</button></td>
            </tr>
        `;
    });
    conteudo += '</table><button onclick="fecharDialogo()">Fechar</button>';
    mostrarDialogo(conteudo);
}

function removerJogador(index) {
    jogadores.splice(index, 1);
    visualizarJogadores();
}

function gerarIniciativa() {
    rodada++;
    resultados = jogadores.map(jogador => {
        const dado = Math.floor(Math.random() * 20) + 1;
        const soma = dado + jogador.bonus;
        historico.push({ nome: jogador.nome, resultado: soma, rodada });
        return { nome: jogador.nome, dado, bonus: jogador.bonus, resultado: soma };
    });
    resultados.sort((a, b) => b.resultado - a.resultado);

    const resultadosTable = document.querySelector("#resultadosTable tbody");
    resultadosTable.innerHTML = '';
    resultados.forEach(resultado => {
        const row = `
            <tr>
                <td>${resultado.nome}</td>
                <td>${resultado.dado} + (${resultado.bonus})</td>
                <td>${resultado.resultado}</td>
            </tr>
        `;
        resultadosTable.innerHTML += row;
    });
    document.getElementById('rodadaText').innerText = `Rodada ${rodada}`;
}

function visualizarHistorico() {
    let conteudo = '<h2>Histórico de Rodadas</h2><table><tr><th>Nome</th><th>Resultado</th><th>Rodada</th></tr>';
    historico.forEach(roll => {
        conteudo += `
            <tr>
                <td>${roll.nome}</td>
                <td>${roll.resultado}</td>
                <td>${roll.rodada}</td>
            </tr>
        `;
    });
    conteudo += '</table><button onclick="fecharDialogo()">Fechar</button>';
    mostrarDialogo(conteudo);
}

// Funções para gerenciar criaturas

function adicionarCriatura() {
    const nome = document.getElementById("nomeCriatura").value;
    const hp = parseInt(document.getElementById("hpCriatura").value);
    if (nome && !isNaN(hp)) {
        criaturas.push({ nome, hp });
        atualizarTabelaCriaturas();
        document.getElementById("nomeCriatura").value = '';
        document.getElementById("hpCriatura").value = '';
    }
}

function aplicarDano(index) {
    const dano = parseInt(prompt("Informe o dano a ser subtraído do HP:"));
    if (!isNaN(dano) && dano > 0) {
        criaturas[index].hp = Math.max(0, criaturas[index].hp - dano);
        atualizarTabelaCriaturas();
    }
}

function atualizarTabelaCriaturas() {
    const creatureTable = document.querySelector("#creatureTable tbody");
    creatureTable.innerHTML = '';
    criaturas.forEach((criatura, index) => {
        const row = `
            <tr>
                <td>${criatura.nome}</td>
                <td>${criatura.hp}</td>
                <td><button onclick="aplicarDano(${index})">Aplicar Dano</button></td>
                <td><button onclick="removerCriatura(${index})">Remover</button></td>
            </tr>
        `;
        creatureTable.innerHTML += row;
    });
}

function removerCriatura(index) {
    criaturas.splice(index, 1);
    atualizarTabelaCriaturas();
}
