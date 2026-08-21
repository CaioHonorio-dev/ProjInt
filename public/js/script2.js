
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