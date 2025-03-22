import { produtos, carrinho } from "./database.js"; 

function formatarValor(valor) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

const gerarProdutoHTML = (produto, lista) => {
    const li = document.createElement("li");
    li.className = "bg-white rounded p-3 d-flex flex-column align-items-center";

    let imagem;
    const path = window.location.pathname;

    if (path.includes("/index.html")) {
        imagem = `./images/${produto.imagem}`;
    } else {
        imagem = `/minimercado_puc/images/${produto.imagem}`;
    }
    
    
    

    li.innerHTML = `
        <div class="d-flex flex-column align-items-center text-center justify-content-center">
            <img src="${imagem}" alt="${produto.alt}" width="600"/>
            <h3 class="fs-4">${produto.nome}</h3>
            <p class="fs-5">${produto.descricao}</p>
            <p class="fs-5 fw-bold text-danger">${formatarValor(produto.valor)}</p>
        </div>
        <button class="btn btn-warning">Adicionar ao Carrinho</button>
    `;

    const botaoAdicionar = li.querySelector("button");
    botaoAdicionar.addEventListener("click", () => {
        adicionarAoCarrinho(produto);
        alert(`${produto.nome} foi adicionado ao carrinho!`);
    });

    lista.appendChild(li);
};

export function listarProdutos() {
    const lista = document.getElementById("listagem_produtos");
    const lista_frutas_verduras = document.getElementById("listagem_frutas_verduras");
    const lista_nao_pereciveis = document.getElementById("listagem_nao_pereciveis");
    const lista_higiene_limpeza = document.getElementById("listagem_higiene_limpeza");

    if (lista) {
        produtos.forEach(produto => gerarProdutoHTML(produto, lista));
    }

    if (lista_frutas_verduras) {
        const frutasVerduras = produtos.filter(produto => produto.categoria === "Frutas e Verduras");
        frutasVerduras.forEach(produto => gerarProdutoHTML(produto, lista_frutas_verduras));
    }

    if (lista_nao_pereciveis) {
        const naoPereciveis = produtos.filter(produto => produto.categoria === "Não Perecíveis");
        naoPereciveis.forEach(produto => gerarProdutoHTML(produto, lista_nao_pereciveis));
    }

    if (lista_higiene_limpeza) {
        const higieneLimpeza = produtos.filter(produto => produto.categoria === "Higiene e Limpeza");
        higieneLimpeza.forEach(produto => gerarProdutoHTML(produto, lista_higiene_limpeza));
    }
}

export function adicionarAoCarrinho(produto) {
    const itemCarrinho = {
        nome: produto.nome,
        valor: produto.valor,
        quantidade: 1,  
        imagem: produto.imagem,
        descricao: produto.descricao,
    };

    const produtoExistente = carrinho[0].items.find(item => item.nome === produto.nome);
    
    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho[0].items.push(itemCarrinho);
    }

    carrinho[0].total = carrinho[0].items.reduce((total, item) => total + (item.valor * item.quantidade), 0).toFixed(2);
    
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    console.log(carrinho);  
}

export function exibirCarrinho() {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinhoSalvo && carrinhoSalvo[0]) {
        carrinho[0] = carrinhoSalvo[0];
    }

    const modalCarrinho = new bootstrap.Modal(document.getElementById("cart-modal"), {
        backdrop: false, 
    });

    document.body.style.overflow = "hidden"; 

    modalCarrinho.show();

    const listaCarrinho = document.getElementById("cart-items");
    const totalCarrinho = document.querySelector(".total-carrinho");

    listaCarrinho.innerHTML = '';

    carrinho[0].items.forEach(item => {
        const li = document.createElement("li");
        li.className = "d-flex justify-content-between align-items-center p-2";

        li.innerHTML = `
            <span>${item.nome} - ${item.quantidade} x ${formatarValor(item.valor)}</span>
            <span>${formatarValor(item.valor * item.quantidade)}</span>
            <div>
                <button class="btn btn-warning btn-sm">
                    <i class="fas fa-minus"></i> <!-- Ícone de diminuir quantidade -->
                </button>
                <button class="btn btn-danger btn-sm">
                    <i class="fas fa-trash"></i> <!-- Ícone de remover item -->
                </button>
            </div>
        `;

        li.querySelector("button.btn-warning").addEventListener("click", () => diminuirQuantidade(item.nome));
        li.querySelector("button.btn-danger").addEventListener("click", () => removerItem(item.nome));

        listaCarrinho.appendChild(li);
    });

    totalCarrinho.textContent = `Total: ${formatarValor(carrinho[0].total)}`;;
}




document.getElementById("cart-icon").addEventListener("click", exibirCarrinho);

document.getElementById("cart-modal").addEventListener('hidden.bs.modal', function () {
    document.body.style.overflow = "auto";
});


export function configurarBotaoFinalizar() {
    const botaoFinalizar = document.querySelector(".btn.btn-primary");

    function atualizarBotao() {
        botaoFinalizar.disabled = carrinho[0].items.length === 0;
    }

    botaoFinalizar.addEventListener("click", () => {
        if (carrinho[0].items.length === 0) {
            alert("Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.");
        } else {
            let redirecionamento;
            if (window.location.pathname.includes("index.html")) {
                redirecionamento = "pages/formulario_cliente.html";
            } else {
                redirecionamento = "formulario_cliente.html"; 
            }
            window.location.href = redirecionamento;
        }
    });

    document.getElementById("cart-icon").addEventListener("click", atualizarBotao);
}

export function carregarCarrinhoFinalizacao() {
    document.addEventListener("DOMContentLoaded", () => {
        const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho'));
        
        if (carrinhoSalvo && carrinhoSalvo[0]) {
            carrinho[0] = carrinhoSalvo[0];  
        }

        const listaCarrinhoFinal = document.getElementById("cart-items-final");
        if (listaCarrinhoFinal) {
            carrinho[0].items.forEach(item => {
                const li = document.createElement("li");
                li.className = "d-flex justify-content-between align-items-center p-2";

                li.innerHTML = `
                    <span>${item.nome} - ${item.quantidade} x R$ ${item.valor.toFixed(2)}</span>
                    <span>R$ ${(item.valor * item.quantidade).toFixed(2)}</span>
                `;
                listaCarrinhoFinal.appendChild(li);
            });
        }

        const totalCarrinhoFinal = document.querySelector(".total-carrinho-final");
        if (totalCarrinhoFinal) {
            totalCarrinhoFinal.textContent = `Total: R$ ${carrinho[0].total}`;
        }
    });
}

export function configurarBuscaProdutos() {
    function filtrarProdutos(nomeBusca, precoMinimo, precoMaximo, categoria) {
        const nomeBuscaLower = nomeBusca.toLowerCase();
        return produtos.filter(produto => 
            produto.categoria === categoria && 
            produto.nome.toLowerCase().includes(nomeBuscaLower) &&
            produto.valor >= precoMinimo &&
            produto.valor <= precoMaximo
        );
    }

    let categoria;
    let listaAtual;

    switch (true) {
        case document.getElementById("listagem_frutas_verduras") !== null:
            categoria = "Frutas e Verduras";
            listaAtual = document.getElementById("listagem_frutas_verduras");
            break;
        case document.getElementById("listagem_nao_pereciveis") !== null:
            categoria = "Não Perecíveis";
            listaAtual = document.getElementById("listagem_nao_pereciveis");
            break;
        case document.getElementById("listagem_higiene_limpeza") !== null:
            categoria = "Higiene e Limpeza";
            listaAtual = document.getElementById("listagem_higiene_limpeza");
            break;
        default:
            categoria = null;
            listaAtual = null;
    }

    if (categoria && listaAtual) {
        document.getElementById("input-busca").addEventListener("input", (event) => {
            const nomeBusca = event.target.value;

            const precoMinimo = parseFloat(document.getElementById("preco").min);
            const precoMaximo = parseFloat(document.getElementById("preco").value);

            listaAtual.innerHTML = ""; 

            const produtosFiltrados = filtrarProdutos(nomeBusca, precoMinimo, precoMaximo, categoria);

            produtosFiltrados.forEach(produto => gerarProdutoHTML(produto, listaAtual));
        });

        document.getElementById("preco").addEventListener("input", (event) => {
            const nomeBusca = document.getElementById("input-busca").value;

            const precoMinimo = parseFloat(document.getElementById("preco").min);
            const precoMaximo = parseFloat(event.target.value);

            listaAtual.innerHTML = ""; 

            const produtosFiltrados = filtrarProdutos(nomeBusca, precoMinimo, precoMaximo, categoria);

            produtosFiltrados.forEach(produto => gerarProdutoHTML(produto, listaAtual));
        });
    }
}

export function diminuirQuantidade(nomeProduto) {
    const item = carrinho[0].items.find(item => item.nome === nomeProduto);

    if (item && item.quantidade > 1) {
        item.quantidade--;
        carrinho[0].total = carrinho[0].items.reduce((total, item) => total + (item.valor * item.quantidade), 0).toFixed(2);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        exibirCarrinho();  
    }
}


export function removerItem(nomeProduto) {
    carrinho[0].items = carrinho[0].items.filter(item => item.nome !== nomeProduto);
    carrinho[0].total = carrinho[0].items.reduce((total, item) => total + (item.valor * item.quantidade), 0).toFixed(2);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho(); 
}
