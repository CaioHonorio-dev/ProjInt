const data = [];

const inputNome = document.getElementById('nomeArquivo');
const areaResultado = document.getElementById('areaResultado');
const tipoArquivo = document.getElementById('tipoArquivo');

const itensPorPagina = 9;
let paginaAtual = 1;

// extensões permitidas
const extensoesPermitidas = [".pdf", ".docx", ".xlsx", ".png", ".jpg"];

// pega nome da página
const pagina = window.location.pathname.split("/").pop().replace(".html","");

// ============================
// EXIBIR ARQUIVOS
// ============================

function displayData(listaArquivos){

    areaResultado.innerHTML = "";

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;

    const itensPagina = listaArquivos.slice(inicio, fim);

    itensPagina.forEach(e => {

        areaResultado.innerHTML += `
        <div class="arq">
            <a target="_blank" href="${e.localPasta}">
                ${e.title}
            </a>
        </div>
        `;

    });

    criarPaginacao(listaArquivos);
}

// ============================
// PAGINAÇÃO
// ============================

function criarPaginacao(listaArquivos){

    const totalPaginas = Math.ceil(listaArquivos.length / itensPorPagina);

    if(totalPaginas <= 1) return;

    const div = document.createElement("div");
    div.id = "paginacao";

    div.style.width = "100%";
    div.style.display = "flex";
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.gap = "10px";
    div.style.marginTop = "20px";

    // botão anterior
    const btnAnterior = document.createElement("button");
    btnAnterior.innerText = "<";
    btnAnterior.disabled = paginaAtual === 1;

    btnAnterior.onclick = () => {
        paginaAtual--;
        aplicarFiltros();
    };

    div.appendChild(btnAnterior);

    for(let i = 1; i <= totalPaginas; i++){

        const btn = document.createElement("button");

        btn.innerText = i;

        if(i === paginaAtual){
            btn.style.backgroundColor = "#2B5FC2";
            btn.style.color = "white";
        }

        btn.onclick = () => {
            paginaAtual = i;
            aplicarFiltros();
        };

        div.appendChild(btn);
    }

    // botão próximo
    const btnProximo = document.createElement("button");
    btnProximo.innerText = ">";
    btnProximo.disabled = paginaAtual === totalPaginas;

    btnProximo.onclick = () => {
        paginaAtual++;
        aplicarFiltros();
    };

    div.appendChild(btnProximo);

    areaResultado.appendChild(div);
}

// ============================
// FILTROS (BUSCA + TIPO)
// ============================

function aplicarFiltros(){

    const termo = inputNome.value.toLowerCase();
    const tipoSelecionado = tipoArquivo.value;

    const resultado = data.filter(arq => {

        const nome = arq.title.toLowerCase();

        const bateNome = nome.includes(termo);

        const bateTipo = tipoSelecionado
            ? nome.endsWith(tipoSelecionado)
            : true;

        return bateNome && bateTipo;

    });

    displayData(resultado);
}

// ============================
// EVENTOS
// ============================

inputNome.addEventListener("keyup", () => {

    paginaAtual = 1;
    aplicarFiltros();

});

tipoArquivo.addEventListener("change", () => {

    paginaAtual = 1;
    aplicarFiltros();

});

// ============================
// CARREGAR ARQUIVOS DO BACKEND
// ============================

window.addEventListener("load", async () => {

    const resposta = await fetch(`/api/${pagina}`);
    const arquivos = await resposta.json();

    const arquivosFiltrados = arquivos.filter(arq => {

        const nome = arq.title.toLowerCase();

        return extensoesPermitidas.some(ext => nome.endsWith(ext));

    });

    data.push(...arquivosFiltrados);

    displayData(data);

});