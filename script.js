// Script de Lógica do Formulário
document.addEventListener("DOMContentLoaded", () => {
  const guestRadios = document.querySelectorAll('input[name="convidados"]');
  const wrapG1 = document.getElementById("wrap-convidado-1");
  const wrapG2 = document.getElementById("wrap-convidado-2");
  
  // Alterado de underline (_) para hífen (-) para bater com o form.js
  const inputG1 = document.getElementById("nome-convidado-1");
  const inputG2 = document.getElementById("nome-convidado-2");

  function handleGuestFields(value) {
    const numConvidados = parseInt(value, 10);

    if (numConvidados === 0) {
      wrapG1.classList.remove("show");
      wrapG2.classList.remove("show");
      inputG1.required = false;
      inputG2.required = false;
    } else if (numConvidados === 1) {
      wrapG1.classList.add("show");
      wrapG2.classList.remove("show");
      inputG1.required = true;
      inputG2.required = false;
    } else if (numConvidados === 2) {
      wrapG1.classList.add("show");
      wrapG2.classList.add("show");
      inputG1.required = true;
      inputG2.required = true;
    }
  }

  guestRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      handleGuestFields(e.target.value);
    });
  });

  const presencaRadios = document.querySelectorAll('input[name="presenca"]');
  presencaRadios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "nao") {
        const zeroRadio = document.querySelector(
          'input[name="convidados"][value="0"]',
        );
        zeroRadio.checked = true;
        handleGuestFields("0");
      }
    });
  });

  const checkedGuest = document.querySelector(
    'input[name="convidados"]:checked',
  );
  if (checkedGuest) {
    handleGuestFields(checkedGuest.value);
  }
});