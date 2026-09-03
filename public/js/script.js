const API_BASE_URL = "https://backend-nuvem-8x44.onrender.com";

let data = []; // Array global para armazenar os arquivos carregados

const inputNome = document.getElementById("nomeArquivo");
const areaResultado = document.getElementById("areaResultado");
const tipoArquivo = document.getElementById("tipoArquivo");
const anoArquivo = document.getElementById("anoArquivo");

const itensPorPagina = 9;
let paginaAtual = 1;

// Extensões permitidas
const extensoesPermitidas = [
    ".pdf",
    ".docx",
    ".xlsx",
    ".png",
    ".jpg"
];

// Nome da página
const pagina = window.location.pathname
    .split("/")
    .pop()
    .replace(".html", "");

// Nome do núcleo
// Usa o data-nucleo do HTML.
// Exemplo: <body data-nucleo="eletrica">
const nucleo = document.body.dataset.nucleo || pagina;


// ============================
// EXIBIR ARQUIVOS
// ============================

function displayData(listaArquivos) {

    areaResultado.innerHTML = "";


    const inicio =
        (paginaAtual - 1) * itensPorPagina;

    const fim =
        inicio + itensPorPagina;


    const itensPagina =
        listaArquivos.slice(
            inicio,
            fim
        );


    // Se não encontrou arquivos
    if (itensPagina.length === 0) {

        areaResultado.innerHTML = `
            <span class="resultado-vazio">
                Nenhum arquivo encontrado.
            </span>
        `;

        document.getElementById(
            "paginacao"
        ).innerHTML = "";

        return;
    }


    // Cria os arquivos
    itensPagina.forEach(e => {

        const div =
            document.createElement("div");

        div.classList.add("arq");


        const link =
            document.createElement("a");

        link.target = "_blank";
    
        link.href = e.localPasta;

        link.textContent = e.title;

        link.title = e.title;


        div.appendChild(link);

        areaResultado.appendChild(div);

    });


    // Cria a paginação
    criarPaginacao(listaArquivos);

}


// ============================
// PAGINAÇÃO
// ============================

function criarPaginacao(listaArquivos) {

    const totalPaginas = Math.ceil(
        listaArquivos.length / itensPorPagina
    );

    const divPaginacao =
        document.getElementById("paginacao");


    // Limpa os botões anteriores
    divPaginacao.innerHTML = "";


    // Se houver apenas uma página
    if (totalPaginas <= 1) {
        return;
    }


    // ============================
    // BOTÃO ANTERIOR
    // ============================

    const btnAnterior =
        document.createElement("button");

    btnAnterior.classList.add(
        "pagina-btn"
    );

    btnAnterior.innerHTML = "‹";

    btnAnterior.disabled =
        paginaAtual === 1;


    btnAnterior.onclick = () => {

        if (paginaAtual > 1) {

            paginaAtual--;

            aplicarFiltros();

        }

    };


    divPaginacao.appendChild(
        btnAnterior
    );


    // ============================
    // NÚMEROS DAS PÁGINAS
    // ============================

    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {

        const btn =
            document.createElement("button");

        btn.classList.add(
            "pagina-btn"
        );

        btn.innerText = i;


        // Página selecionada
        if (i === paginaAtual) {

            btn.classList.add(
                "pagina-ativa"
            );

            btn.setAttribute(
                "aria-current",
                "page"
            );

        }


        btn.onclick = () => {

            paginaAtual = i;

            aplicarFiltros();

        };


        divPaginacao.appendChild(
            btn
        );

    }


    // ============================
    // BOTÃO PRÓXIMO
    // ============================

    const btnProximo =
        document.createElement("button");

    btnProximo.classList.add(
        "pagina-btn"
    );

    btnProximo.innerHTML = "›";

    btnProximo.disabled =
        paginaAtual === totalPaginas;


    btnProximo.onclick = () => {

        if (
            paginaAtual < totalPaginas
        ) {

            paginaAtual++;

            aplicarFiltros();

        }

    };


    divPaginacao.appendChild(
        btnProximo
    );

}


// ============================
// FILTROS
// ============================

function aplicarFiltros() {

    const termo =
        inputNome.value.toLowerCase().trim();

    const tipoSelecionado =
        tipoArquivo.value;


    const resultado = data.filter(arq => {

        const nome =
            arq.title.toLowerCase();


        // FILTRO POR NOME

        const bateNome =
            nome.includes(termo);


        // FILTRO POR TIPO

        const bateTipo =
            tipoSelecionado
                ? nome.endsWith(tipoSelecionado)
                : true;


        return bateNome && bateTipo;
    });


    displayData(resultado);
}


// ============================
// CARREGAR ANOS
// ============================

async function carregarAnos() {

    try {

        anoArquivo.innerHTML = `
            <option value="">
                Carregando anos...
            </option>
        `;


        const resposta = await fetch(
            `${API_BASE_URL}/api/${encodeURIComponent(nucleo)}/anos`
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar os anos."
            );

        }


        const anos = await resposta.json();


        anoArquivo.innerHTML = "";


        if (anos.length === 0) {

            anoArquivo.innerHTML = `
                <option value="">
                    Nenhum ano encontrado
                </option>
            `;

            anoArquivo.disabled = true;

            return;
        }


        anos.forEach(ano => {

            const option =
                document.createElement("option");

            option.value = ano;

            option.textContent = ano;

            anoArquivo.appendChild(option);
        });


        anoArquivo.disabled = false;


        // Carrega automaticamente
        // o primeiro ano encontrado

        await carregarArquivosDoAno(
            anoArquivo.value
        );

    }

    catch (erro) {

        console.error(
            "Erro ao carregar anos:",
            erro
        );


        anoArquivo.innerHTML = `
            <option value="">
                Erro ao carregar
            </option>
        `;

    }
}


// ============================
// CARREGAR ARQUIVOS DO ANO
// ============================

async function carregarArquivosDoAno(ano) {

    areaResultado.innerHTML = `
        <span class="resultado-vazio">
            Carregando arquivos...
        </span>
    `;


    try {

        const resposta = await fetch(
            `${API_BASE_URL}/api/${encodeURIComponent(nucleo)}/${encodeURIComponent(ano)}`
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao carregar arquivos."
            );

        }


        const arquivos =
            await resposta.json();


        const arquivosFiltrados =
            arquivos.filter(arq => {

                const nome =
                    arq.title.toLowerCase();


                return extensoesPermitidas.some(
                    ext => nome.endsWith(ext)
                );

            });


        // Limpa os dados antigos
        data = [];

        // Adiciona os arquivos
        // do novo ano
        data.push(...arquivosFiltrados);


        paginaAtual = 1;


        aplicarFiltros();

    }

    catch (erro) {

        console.error(
            "Erro ao carregar arquivos:",
            erro
        );


        areaResultado.innerHTML = `
            <span class="resultado-vazio">
                Não foi possível carregar os arquivos.
            </span>
        `;

    }
}


// ============================
// EVENTOS
// ============================


// BUSCA POR NOME

inputNome.addEventListener("input", () => {

    paginaAtual = 1;

    aplicarFiltros();

});


// FILTRO POR TIPO

tipoArquivo.addEventListener("change", () => {

    paginaAtual = 1;

    aplicarFiltros();

});


// TROCAR ANO

anoArquivo.addEventListener("change", () => {

    paginaAtual = 1;

    carregarArquivosDoAno(
        anoArquivo.value
    );

});


// ============================
// INICIALIZAÇÃO
// ============================

window.addEventListener("load", () => {

    carregarAnos();

});