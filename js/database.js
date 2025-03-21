export const produtos = [
    {
      nome: "Cenoura",
      descricao: "Cenoura fresquinha, colhida na fazenda Família Saudável, sem agrotóxicos, 100% natural.",
      valor: 5.00,
      alt: "cenouras fresquinhas e grandes",
      imagem: "cenoura.png",
      categoria: "Frutas e Verduras",
    },
    {
        nome: "Alface",
        descricao: "Alface com folhas crocantes e de ótima qualidade, perfeita para um refeição em família.",
        valor: 3.50,
        alt: "alface bem verdinho e de ótima qualidade",
        imagem: "alface.png",
        categoria: "Frutas e Verduras"
    },
    {
        nome: "Feijão",
        descricao: "Feijão rico em fibras e proteínas, altíssima qualidade.",
        valor: 15.00,
        alt: "grãos de feijão marrom para refeição em família",
        imagem: "feijao.png",
        categoria: "Não Perecíveis"
    },
    {
        nome: "Arroz",
        descricao: "Grãos soltinhos, selecionados e muito saborosos.",
        valor: 20.50,
        alt: "grãos de arroz bem soltinho",
        imagem: "arroz.png",
        categoria: "Não Perecíveis"
    },
    {
        nome: "Sabonete",
        descricao: "Sabonete suave e com fragrância delicada.",
        valor: 2.90,
        alt: "sabonete suave e com uma fragância delicada",
        imagem: "sabonete.png",
        categoria: "Higiene e Limpeza"
    },
    {
        nome: "Detergente Líquido",
        descricao: "Remove a gordura com facilidade, deixando a louça brilhante e sem resíduos.",
        valor: 3.80,
        alt: "detergente líquido",
        imagem: "detergente_liquido.png",
        categoria: "Higiene e Limpeza"
    }
]

export const carrinho = [
    {
        total: 0.00,
        items: []

    }
]


export const cliente = [
    {
        nome: "",
        cpf: "",
        email: "",
        telefone: "",
        genero: "",
    }
]

export const entrega = [
    {
        tipo: "",
        pagamento: "",
        agendamento: "",
        localização: {
            rua: '',
            numero: '',
            bairro: '',
            cep: ''
        },
        quantia_dinheiro: 0.00
    }
]