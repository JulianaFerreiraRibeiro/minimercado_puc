import { cliente } from "./database.js";

export function salvarDadosCliente() {
    const nome = document.getElementById('nome').value.trim(); 
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const genero = document.getElementById('gênero').value.trim();

    console.log('Dados capturados:', { nome, cpf, email, telefone, genero });

    if (!nome || !cpf || !email || !telefone || !genero) {
        alert('Por favor, preencha todos os campos.');
        console.log('Campos não preenchidos:', { nome, cpf, email, telefone, genero });  
        return;  
    }

    cliente[0] = {
        nome: nome,
        cpf: cpf,
        email: email,
        telefone: telefone,
        genero: genero
    };

    localStorage.setItem('cliente', JSON.stringify(cliente));

    window.location.href = './escolha_servico.html';
}

document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault(); 

    salvarDadosCliente();
});
