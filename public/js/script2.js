// ===============================
// ABAS DE LOGIN E REGISTRO
// ===============================
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
        if (!paineis[chave]) return;
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

// ===============================
// MOSTRAR E OCULTAR SENHA
// ===============================

document.querySelectorAll('.alterna-senha').forEach(function (botao) {
    botao.addEventListener('click', function () {
        var alvo = document.getElementById(botao.dataset.alvo);
        if (!alvo) return;
        var visivel = alvo.type === 'text';
        alvo.type = visivel ? 'password' : 'text';
        botao.setAttribute(
            'aria-label',
            visivel ? 'Mostrar senha' : 'Ocultar senha'
        );
    });
});

// ===============================
// VALIDAÇÃO LOGIN
// ===============================

const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', function (evento) {
        var usuario = document.getElementById('login-usuario');
        var senha = document.getElementById('login-senha');
        var valido = true;
        [usuario, senha].forEach(function (campo) {
            if (!campo) return;
            var wrapper = campo.closest('.campo');
            if (!campo.value.trim()) {
                if (wrapper) {
                    wrapper.classList.add('invalido');
                }
                valido = false;
            } else {
                if (wrapper) {
                    wrapper.classList.remove('invalido');
                }
            }
        });
        if (!valido) {
            evento.preventDefault();
        }
    });
}


// ===============================
// VALIDAÇÃO REGISTRO
// ===============================

const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
    formRegistro.addEventListener('submit', function (evento) {
        var nome = document.getElementById('reg-nome');
        var email = document.getElementById('reg-email');
        var senha = document.getElementById('reg-senha');
        var confirmar = document.getElementById('reg-confirmar');
        var valido = true;
        // NOME E EMAIL

        [nome, email].forEach(function (campo) {
            if (!campo) return;
            var wrapper = campo.closest('.campo');
            if (!campo.value.trim()) {
                if (wrapper) {
                    wrapper.classList.add('invalido');
                }
                valido = false;
            } else {
                if (wrapper) {
                    wrapper.classList.remove('invalido');
                }
            }
        });

        // SENHA
        if (senha) {
            var wrapperSenha = senha.closest('.campo');
            if (senha.value.length < 8) {
                if (wrapperSenha) {
                    wrapperSenha.classList.add('invalido');
                }
                valido = false;
            } else {
                if (wrapperSenha) {
                    wrapperSenha.classList.remove('invalido');
                }
            }
        }
        // CONFIRMAR SENHA

        if (confirmar && senha) {
            var wrapperConfirmar = confirmar.closest('.campo');
            if (
                confirmar.value !== senha.value ||
                !confirmar.value
            ) {
                if (wrapperConfirmar) {
                    wrapperConfirmar.classList.add('invalido');
                }
                valido = false;
            } else {
                if (wrapperConfirmar) {
                    wrapperConfirmar.classList.remove('invalido');
                }
            }
        }
        if (!valido) {
            evento.preventDefault();
        }
    });
}


// ===============================
// MODO ESCURO E CLARO
// ===============================

const temaToggle = document.getElementById('temaToggle');
const iconeTema = document.getElementById('iconeTema');
const sol = `
    <circle
        cx="12"
        cy="12"
        r="4"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
    />
    <g
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
    >
        <line x1="12" y1="2" x2="12" y2="5"/>
        <line x1="12" y1="19" x2="12" y2="22"/>

        <line x1="2" y1="12" x2="5" y2="12"/>
        <line x1="19" y1="12" x2="22" y2="12"/>

        <line x1="4.9" y1="4.9" x2="7" y2="7"/>
        <line x1="17" y1="17" x2="19.1" y2="19.1"/>

        <line x1="19.1" y1="4.9" x2="17" y2="7"/>
        <line x1="7" y1="17" x2="4.9" y2="19.1"/>
    </g>
`;
const lua = `
    <path
        d="M20 15.5A8 8 0 1 1 8.5 4A6.5 6.5 0 0 0 20 15.5Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
`;
function atualizarTema() {
    if (!temaToggle || !iconeTema) return;
    if (document.body.classList.contains('modo-escuro')) {
        iconeTema.innerHTML = lua;
        temaToggle.setAttribute(
            'aria-label',
            'Ativar modo claro'
        );
    } else {
        iconeTema.innerHTML = sol;
        temaToggle.setAttribute(
            'aria-label',
            'Ativar modo escuro'
        );
    }
}
// CARREGAR TEMA SALVO
if (localStorage.getItem('tema') === 'escuro') {
    document.body.classList.add('modo-escuro');
}
atualizarTema();
// TROCAR TEMA
if (temaToggle) {
    temaToggle.addEventListener('click', function () {
        document.body.classList.toggle('modo-escuro');
        var temaAtual = document.body.classList.contains('modo-escuro')
            ? 'escuro'
            : 'claro';
        localStorage.setItem('tema', temaAtual);
        atualizarTema();
    });
}

// ===============================
// PAINEL DE ACESSIBILIDADE
// ===============================
const botaoAcessibilidade = document.querySelector(
    '.botao-acessibilidade'
);
const painelAcessibilidade = document.querySelector(
    '.painel-acessibilidade'
);
const fecharAcessibilidade = document.querySelector(
    '.fechar-acessibilidade'
);
const acessibilidadeOverlay = document.getElementById(
    'acessibilidadeOverlay'
);
// ABRIR PAINEL

if (botaoAcessibilidade && painelAcessibilidade) {
    botaoAcessibilidade.addEventListener(
        'click',
        function () {
            painelAcessibilidade.classList.add('aberto');
            if (acessibilidadeOverlay) {
                acessibilidadeOverlay.classList.add('ativo');
            }
        }
    );
}
// FECHAR PAINEL

function fecharPainelAcessibilidade() {

    if (painelAcessibilidade) {
        painelAcessibilidade.classList.remove('aberto');
    }
    if (acessibilidadeOverlay) {
        acessibilidadeOverlay.classList.remove('ativo');
    }
}

if (fecharAcessibilidade) {
    fecharAcessibilidade.addEventListener(
        'click',
        fecharPainelAcessibilidade
    );
}

// FECHAR AO CLICAR FORA

if (acessibilidadeOverlay) {
    acessibilidadeOverlay.addEventListener(
        'click',
        fecharPainelAcessibilidade
    );
}

// ===============================
// AUMENTAR E DIMINUIR FONTE
// ===============================

const aumentarFonte = document.getElementById(
    'aumentarFonte'
);
const diminuirFonte = document.getElementById(
    'diminuirFonte'
);
// PEGA O TAMANHO SALVO
let nivelFonte = Number(
    localStorage.getItem('nivelFonte')
) || 0;
// LIMITES
const minimoFonte = -2;
const maximoFonte = 3;
// FUNÇÃO PARA ALTERAR A FONTE
function atualizarFonte() {
    // Cada nível altera 10%
    const tamanho = 100 + (nivelFonte * 10);
    // Altera o tamanho base da página
    document.documentElement.style.fontSize =
        tamanho + '%';
    // Salva a preferência
    localStorage.setItem(
        'nivelFonte',
        nivelFonte
    );
}

// BOTÃO AUMENTAR

if (aumentarFonte) {
    aumentarFonte.addEventListener(
        'click',
        function () {
            if (nivelFonte < maximoFonte) {
                nivelFonte++;
                atualizarFonte();
            }
        }
    );
}

// BOTÃO DIMINUIR

if (diminuirFonte) {
    diminuirFonte.addEventListener(
        'click',
        function () {
            if (nivelFonte > minimoFonte) {
                nivelFonte--;
                atualizarFonte();
            }
        }
    );
}
// APLICAR TAMANHO SALVO AO ABRIR
atualizarFonte();

// ===============================
// LEITOR DE TEXTO
// ===============================

const leitorTela = document.getElementById('leitorTela');
if (leitorTela) {
    leitorTela.addEventListener(
        'click',
        function () {
            // Verifica se o navegador suporta leitura
            if (!('speechSynthesis' in window)) {
                alert(
                    'Seu navegador não suporta leitura de texto.'
                );
                return;
            }
            // Se já estiver lendo, para
            window.speechSynthesis.cancel();
            // Texto principal da página
            const texto = document.body.innerText;
            const fala = new SpeechSynthesisUtterance(
                texto
            );
            // Português brasileiro
            fala.lang = 'pt-BR';
            fala.rate = 1;
            window.speechSynthesis.speak(fala);
        }
    );
}

(function () {
    var trilha = document.getElementById('carrosselTrilha');
    var pontosContainer = document.getElementById('carrosselPontos');
    var btnAnterior = document.getElementById('carrosselAnterior');
    var btnProximo = document.getElementById('carrosselProximo');
    var raiz = document.getElementById('carrosselUso');

    if (!trilha || !pontosContainer || !btnAnterior || !btnProximo || !raiz) return;

    var slides = Array.prototype.slice.call(trilha.children);
    var indiceAtual = 0;
    var timerAutoplay = null;
    var ATRASO_AUTOPLAY = 6000;

    // Cria os pontos indicadores
    slides.forEach(function (_, indice) {
        var ponto = document.createElement('button');
        ponto.type = 'button';
        ponto.className = 'carrossel-ponto';
        ponto.setAttribute('aria-label', 'Ir para o passo ' + (indice + 1));
        ponto.addEventListener('click', function () {
            irParaSlide(indice);
            reiniciarAutoplay();
        });
        pontosContainer.appendChild(ponto);
    });
    var pontos = Array.prototype.slice.call(pontosContainer.children);

    function atualizarEstado() {
        trilha.style.transform = 'translateX(-' + (indiceAtual * 100) + '%)';
        pontos.forEach(function (ponto, indice) {
            ponto.classList.toggle('ativo', indice === indiceAtual);
        });
    }

    function irParaSlide(indice) {
        indiceAtual = (indice + slides.length) % slides.length;
        atualizarEstado();
    }

    function proximo() {
        irParaSlide(indiceAtual + 1);
    }

    function anterior() {
        irParaSlide(indiceAtual - 1);
    }

    function iniciarAutoplay() {
        pararAutoplay();
        timerAutoplay = setInterval(proximo, ATRASO_AUTOPLAY);
    }

    function pararAutoplay() {
        if (timerAutoplay) {
            clearInterval(timerAutoplay);
            timerAutoplay = null;
        }
    }

    function reiniciarAutoplay() {
        iniciarAutoplay();
    }

    btnProximo.addEventListener('click', function () {
        proximo();
        reiniciarAutoplay();
    });

    btnAnterior.addEventListener('click', function () {
        anterior();
        reiniciarAutoplay();
    });

    raiz.addEventListener('mouseenter', pararAutoplay);
    raiz.addEventListener('mouseleave', iniciarAutoplay);
    raiz.addEventListener('focusin', pararAutoplay);
    raiz.addEventListener('focusout', iniciarAutoplay);

    // Suporte a arrastar/deslizar no touch
    var xInicial = null;
    trilha.addEventListener('touchstart', function (evento) {
        xInicial = evento.touches[0].clientX;
        pararAutoplay();
    }, { passive: true });

    trilha.addEventListener('touchend', function (evento) {
        if (xInicial === null) return;
        var xFinal = evento.changedTouches[0].clientX;
        var diferenca = xInicial - xFinal;
        if (Math.abs(diferenca) > 40) {
            diferenca > 0 ? proximo() : anterior();
        }
        xInicial = null;
        iniciarAutoplay();
    });

    atualizarEstado();
    iniciarAutoplay();
})();