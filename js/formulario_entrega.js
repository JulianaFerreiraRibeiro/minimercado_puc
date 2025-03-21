import { entrega } from "./database.js"; 

document.addEventListener("DOMContentLoaded", function () {
    const formaPagamento = document.getElementById("forma_pagamento");
    const quantiaDinheiroFieldset = document.getElementById("quantia_dinheiro_fieldset");
    
    const servicoEntrega = document.getElementById("servico_entrega");
    const localizacaoFieldset = document.getElementById("localizacao_fieldset");

    function toggleCampos() {
        if (formaPagamento.value === "Dinheiro") {
            quantiaDinheiroFieldset.style.cssText = "display: block !important;";
        } else {
            quantiaDinheiroFieldset.style.cssText = "display: none !important;";
        }

        if (servicoEntrega.value === "tele_entrega") {
            localizacaoFieldset.style.cssText = "display: block !important; display: flex !important;";
        } else {
            localizacaoFieldset.style.cssText = "display: none !important;";
        }
    }

    formaPagamento.addEventListener("change", toggleCampos);

    servicoEntrega.addEventListener("change", toggleCampos);

    toggleCampos();
});

export function salvarDadosServico() {
    const servicoEntrega = document.getElementById('servico_entrega').value.trim();
    const formaPagamento = document.getElementById('forma_pagamento').value.trim();
    const agendamento = document.getElementById('agendamento').value.trim();
    const localizacaoRua = document.getElementById('rua').value.trim();
    const numero = document.getElementById('numero').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const quantiaDinheiro = document.getElementById('quantia_dinheiro').value.trim();

    if (!servicoEntrega || !formaPagamento || !agendamento) {
        alert('Por favor, preencha os campos obrigatórios.');
        return;
    }

    if (servicoEntrega === "tele_entrega" && (!localizacaoRua || !numero || !bairro || !cep)) {
        alert('Por favor, preencha todos os campos de localização.');
        return;
    }

    if (formaPagamento === "Dinheiro" && !quantiaDinheiro) {
        alert('Por favor, informe a quantia que será dada em dinheiro.');
        return;
    }

 
    entrega[0] = {
        tipo: servicoEntrega,
        pagamento: formaPagamento,
        agendamento: agendamento,
        localização: servicoEntrega === "tele_entrega" ? {
            rua: localizacaoRua,
            numero: numero,
            bairro: bairro,
            cep: cep
        } : null,
        quantia_dinheiro: formaPagamento === "Dinheiro" ? parseFloat(quantiaDinheiro) : null
    };

    localStorage.setItem('entrega', JSON.stringify(entrega));

    window.location.href = './comprovante.html';
}

document.getElementById('form-entrega').addEventListener('submit', function(event) {
    event.preventDefault();  
    salvarDadosServico();
});


