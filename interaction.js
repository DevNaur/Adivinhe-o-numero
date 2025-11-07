"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const txtStatus = document.getElementById("status");
  const btnIniciar = document.getElementById("btIniciar");
  const btnReiniciar = document.getElementById("btReiniciar");
  const numeroChute = document.getElementById("num1");
  const btnChutar = document.getElementById("btChutar");
  const resultado = document.getElementById("txtResultado");

  let numeroSecreto;
  let vidas;
  const VIDAS_MAX = 9;

  btnIniciar.addEventListener("click", novoJogo);
  btnReiniciar.addEventListener("click", novoJogo);
  btnChutar.addEventListener("click", chutar);

  numeroChute.addEventListener("keydown", (event) => {
    if (event.key === "Enter") chutar();
  });

  function novoJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    vidas = VIDAS_MAX;
    resultado.innerHTML = "Jogo iniciado! Faça seu primeiro palpite.";
    numeroChute.value = "";
    numeroChute.disabled = false;
    btnChutar.disabled = false;
    btnIniciar.disabled = true;
    btnReiniciar.disabled = false;
    atualizarStatusVidas();
    numeroChute.focus();
  }

  function atualizarStatusVidas() {
    txtStatus.innerHTML = "";
    for (let i = 0; i < VIDAS_MAX; i++) {
      const coracao = document.createElement("span");
      coracao.textContent = i < vidas ? "❤️" : "🖤";
      coracao.className = "coracao";
      txtStatus.appendChild(coracao);
    }

    if (vidas <= 0) {
      numeroChute.disabled = true;
      btnChutar.disabled = true;
      resultado.innerHTML += `<br><strong>Você perdeu!</strong> O número era <b>${numeroSecreto}</b>. 😞`;
      btnIniciar.disabled = false;
    }
  }

  function chutar() {
    const valor = numeroChute.value.trim();
    const num = parseInt(valor, 9);

    if (isNaN(num) || num < 1 || num > 100) {
      resultado.innerHTML += `<br>⚠️ Digite um número válido entre 1 e 100.`;
      numeroChute.value = "";
      numeroChute.focus();
      return;
    }

    if (num === numeroSecreto) {
      resultado.innerHTML += `<br>🎉 Parabéns! Você acertou o número <b>${numeroSecreto}</b>!`;
      numeroChute.disabled = true;
      btnChutar.disabled = true;
      btnIniciar.disabled = false;
      btnReiniciar.disabled = false;
    } else {
      vidas--;
      const dica = num > numeroSecreto ? "menor" : "maior";
      resultado.innerHTML += `<br>Palpite: ${num} → O número secreto é <b>${dica}</b>!`;
      atualizarStatusVidas();
    }

    numeroChute.value = "";
    numeroChute.focus();
  }
});
