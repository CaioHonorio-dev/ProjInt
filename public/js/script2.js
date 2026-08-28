var abas=document.querySelectorAll('.login-aba');
var paineis={
login:document.getElementById('painel-login'),
registro:document.getElementById('painel-registro')
};

function mostrarAba(nome){
abas.forEach(function(aba){
var ativa=aba.dataset.aba===nome;
aba.classList.toggle('ativa',ativa);
aba.setAttribute('aria-selected',ativa?'true':'false');
});
Object.keys(paineis).forEach(function(chave){
if(!paineis[chave])return;
var ativo=chave===nome;
paineis[chave].classList.toggle('ativo',ativo);
paineis[chave].hidden=!ativo;
});
}

abas.forEach(function(aba){
aba.addEventListener('click',function(){
mostrarAba(aba.dataset.aba);
});
});

document.querySelectorAll('[data-ir-para]').forEach(function(botao){
botao.addEventListener('click',function(){
mostrarAba(botao.dataset.irPara);
});
});

document.querySelectorAll('.alterna-senha').forEach(function(botao){
botao.addEventListener('click',function(){
var alvo=document.getElementById(botao.dataset.alvo);
if(!alvo)return;
var visivel=alvo.type==='text';
alvo.type=visivel?'password':'text';
botao.setAttribute('aria-label',visivel?'Mostrar senha':'Ocultar senha');
});
});

const formLogin=document.getElementById('form-login');
if(formLogin){
formLogin.addEventListener('submit',function(evento){
var usuario=document.getElementById('login-usuario');
var senha=document.getElementById('login-senha');
var valido=true;
[usuario,senha].forEach(function(campo){
if(!campo)return;
var wrapper=campo.closest('.campo');
if(!campo.value.trim()){
if(wrapper)wrapper.classList.add('invalido');
valido=false;
}else{
if(wrapper)wrapper.classList.remove('invalido');
}
});
if(!valido)evento.preventDefault();
});
}

const formRegistro=document.getElementById('form-registro');
if(formRegistro){
formRegistro.addEventListener('submit',function(evento){
var nome=document.getElementById('reg-nome');
var email=document.getElementById('reg-email');
var senha=document.getElementById('reg-senha');
var confirmar=document.getElementById('reg-confirmar');
var valido=true;

[nome,email].forEach(function(campo){
if(!campo)return;
var wrapper=campo.closest('.campo');
if(!campo.value.trim()){
if(wrapper)wrapper.classList.add('invalido');
valido=false;
}else{
if(wrapper)wrapper.classList.remove('invalido');
}
});

if(senha){
var wrapperSenha=senha.closest('.campo');
if(senha.value.length<8){
if(wrapperSenha)wrapperSenha.classList.add('invalido');
valido=false;
}else{
if(wrapperSenha)wrapperSenha.classList.remove('invalido');
}
}

if(confirmar&&senha){
var wrapperConfirmar=confirmar.closest('.campo');
if(confirmar.value!==senha.value||!confirmar.value){
if(wrapperConfirmar)wrapperConfirmar.classList.add('invalido');
valido=false;
}else{
if(wrapperConfirmar)wrapperConfirmar.classList.remove('invalido');
}
}

if(!valido)evento.preventDefault();
});
}

// MODO ESCURO E CLARO

const temaToggle=document.getElementById('temaToggle');
const iconeTema=document.getElementById('iconeTema');

const sol=`<circle cx="12" cy="12" r="4" fill="none" stroke="black" stroke-width="1.5"/><g stroke="black" stroke-width="1.5" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.9" y1="4.9" x2="7" y2="7"/><line x1="17" y1="17" x2="19.1" y2="19.1"/><line x1="19.1" y1="4.9" x2="17" y2="7"/><line x1="7" y1="17" x2="4.9" y2="19.1"/></g>`;

const lua=`<path d="M20 15.5A8 8 0 1 1 8.5 4A6.5 6.5 0 0 0 20 15.5Z" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`;

function atualizarTema(){
if(!temaToggle||!iconeTema)return;
if(document.body.classList.contains('modo-escuro')){
iconeTema.innerHTML=lua;
temaToggle.setAttribute('aria-label','Ativar modo claro');
}else{
iconeTema.innerHTML=sol;
temaToggle.setAttribute('aria-label','Ativar modo escuro');
}
}

if(localStorage.getItem('tema')==='escuro'){
document.body.classList.add('modo-escuro');
}

atualizarTema();

if(temaToggle){
temaToggle.addEventListener('click',function(){
document.body.classList.toggle('modo-escuro');
localStorage.setItem('tema',document.body.classList.contains('modo-escuro')?'escuro':'claro');
atualizarTema();
});
}