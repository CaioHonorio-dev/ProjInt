
// ============================
// MODO ESCURO
// ============================

const temaToggle = document.getElementById("temaToggle");

// Verifica se o botão existe nesta página
if (temaToggle) {

    // Recupera o tema salvo
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "escuro") {
        document.body.classList.add("modo-escuro");
        temaToggle.textContent = "☀️";
        temaToggle.setAttribute("aria-label", "Ativar modo claro");
    }

    // Alternar tema
    temaToggle.addEventListener("click", () => {

        document.body.classList.toggle("modo-escuro");

        const modoEscuro =
            document.body.classList.contains("modo-escuro");

        if (modoEscuro) {
            temaToggle.textContent = "☀️";
            temaToggle.setAttribute(
                "aria-label",
                "Ativar modo claro"
            );

            localStorage.setItem("tema", "escuro");

        } else {

            temaToggle.textContent = "🌙";
            temaToggle.setAttribute(
                "aria-label",
                "Ativar modo escuro"
            );

            localStorage.setItem("tema", "claro");
        }
    });
}
var abas = document.querySelectorAll('.login-aba');
var paineis = {
    login: document.getElementById('painel-login'),
    registro: document.getElementById('painel-registro')
};

function mostrarAba(nome) {
    abas.forEach(function (aba) {
        var ativa = aba.dataset.aba === nome;
        aba.classList.toggle('ativa', ativa);
        aba.setAttribute('aria-selected', ativa ? 'true' : 'false');
    });
    Object.keys(paineis).forEach(function (chave) {
        var ativo = chave === nome;
        paineis[chave].classList.toggle('ativo', ativo);
        paineis[chave].hidden = !ativo;
    });
}

abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
        mostrarAba(aba.dataset.aba);
    });
});

document.querySelectorAll('[data-ir-para]').forEach(function (botao) {
    botao.addEventListener('click', function () {
        mostrarAba(botao.dataset.irPara);
    });
});

// Mostrar/ocultar senha
document.querySelectorAll('.alterna-senha').forEach(function (botao) {
    botao.addEventListener('click', function () {
        var alvo = document.getElementById(botao.dataset.alvo);
        var visivel = alvo.type === 'text';
        alvo.type = visivel ? 'password' : 'text';
        botao.setAttribute('aria-label', visivel ? 'Mostrar senha' : 'Ocultar senha');
    });
});

// Validação do login
document.getElementById('form-login').addEventListener('submit', function (evento) {
    var usuario = document.getElementById('login-usuario');
    var senha = document.getElementById('login-senha');
    var valido = true;

    [usuario, senha].forEach(function (campo) {
        var wrapper = campo.closest('.campo');
        if (!campo.value.trim()) {
            wrapper.classList.add('invalido');
            valido = false;
        } else {
            wrapper.classList.remove('invalido');
        }
    });

    if (!valido) {
        evento.preventDefault();
    }
});

// Validação do registro
document.getElementById('form-registro').addEventListener('submit', function (evento) {
    var nome = document.getElementById('reg-nome');
    var email = document.getElementById('reg-email');
    var senha = document.getElementById('reg-senha');
    var confirmar = document.getElementById('reg-confirmar');
    var valido = true;

    [nome, email].forEach(function (campo) {
        var wrapper = campo.closest('.campo');
        if (!campo.value.trim()) {
            wrapper.classList.add('invalido');
            valido = false;
        } else {
            wrapper.classList.remove('invalido');
        }
    });

    var wrapperSenha = senha.closest('.campo');
    if (senha.value.length < 8) {
        wrapperSenha.classList.add('invalido');
        valido = false;
    } else {
        wrapperSenha.classList.remove('invalido');
    }

    var wrapperConfirmar = confirmar.closest('.campo');
    if (confirmar.value !== senha.value || !confirmar.value) {
        wrapperConfirmar.classList.add('invalido');
        valido = false;
    } else {
        wrapperConfirmar.classList.remove('invalido');
    }

    if (!valido) {
        evento.preventDefault();
    }
});