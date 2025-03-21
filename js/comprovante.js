function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

window.addEventListener('DOMContentLoaded', function() {
    function exibirComprovante() {
        const cliente = JSON.parse(localStorage.getItem('cliente')) || [];
        const entrega = JSON.parse(localStorage.getItem('entrega')) || [];
        const pedido = JSON.parse(localStorage.getItem('carrinho')) || [];  

        if (cliente.length === 0 || entrega.length === 0 || pedido.length === 0) {
            alert('Dados não encontrados.');
            return;
        }

        const itens = pedido[0].items;  
        const listaItens = document.querySelector('#produtos');
        
        listaItens.innerHTML = '';

        itens.forEach(item => {
            const p = document.createElement('p');
            p.classList.add('fs-5');
            p.textContent = `${item.quantidade}x ${item.nome} - ${formatarValor(item.valor)} cada`;
            listaItens.appendChild(p);
        });

        const totalCompraElement = document.querySelector('#total');
        totalCompraElement.textContent = `${formatarValor(pedido[0].total)}`;

        const localizacaoEntrega = document.querySelector('#localizacao');
        const { tipo, localização } = entrega[0];

        if (tipo === "tele_entrega" && localização) {
            localizacaoEntrega.textContent = `Tele-Entrega: ${localização.rua}, ${localização.numero} — Bairro ${localização.bairro}, CEP: ${localização.cep}`;
        } else {
            localizacaoEntrega.textContent = "Retirada no Estabelecimento";
        }

        const formaPagamento = document.querySelector('#forma_pagamento');
        formaPagamento.textContent = `Opção escolhida: ${entrega[0].pagamento}`;

        const quantiaDinheiro = document.querySelector('#quantia_dinheiro');
        if (entrega[0].pagamento === "Dinheiro" && entrega[0].quantia_dinheiro) {
            quantiaDinheiro.textContent = `Troco para: ${formatarValor(entrega[0].quantia_dinheiro)}`;
            quantiaDinheiro.style.display = "block";
        } else {
            quantiaDinheiro.style.display = "none";
        }

        const dadosCliente = document.querySelector('#dados-cliente');
        if (dadosCliente) {
            dadosCliente.innerHTML = `
            <div class="d-flex align-items-center gap-3 text-align-center">
                <p class="fw-bold fs-5 m-0">Cliente:</p> 
                <p class="m-0">${cliente[0].nome}</p>
            </div>
            <div class="d-flex align-items-center gap-3 text-align-center">
                <p class="fw-bold fs-5 m-0">Email:</p> 
                <p class="m-0">${cliente[0].email}</p>
            </div>
            <div class="d-flex align-items-center gap-3 text-align-center">
                <p class="fw-bold fs-5 m-0">Telefone:</p> 
                <p class="m-0">${cliente[0].telefone}</p>
            </div>
            <div class="d-flex align-items-center gap-3 text-align-center">
                <p class="fw-bold fs-5 m-0">CPF:</p> 
                <p class="m-0">${cliente[0].cpf}</p>
            </div>
            `;
        }
    }

    exibirComprovante();
});
