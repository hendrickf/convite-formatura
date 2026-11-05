document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "Enviando...";
  submitBtn.disabled = true;

  const formData = {
    nome: document.getElementById("nome").value,
    presenca:
      // Alterado de "formatura" para "presenca" para bater com o script.js e HTML
      document.querySelector('input[name="presenca"]:checked')?.value === "sim"
        ? "Sim"
        : "Não",
    qtdConvidados:
      document.querySelector('input[name="convidados"]:checked')?.value || "0",
    convidado1: document.getElementById("nome-convidado-1").value || "",
    convidado2: document.getElementById("nome-convidado-2").value || "",
  };

  try {
    const webhookUrl = "https://script.google.com/macros/s/AKfycbzQgrggiJ4Hmq_55yDu_MJtE-Z_51-eDyg-kYf58dXMvw1CW0jbJGsnauNiCh4UYz4U/exec";

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(formData),
    });

    alert("Presença confirmada com sucesso! Nos vemos na formatura.");
    e.target.reset(); 
  } catch (error) {
    console.error("Erro:", error);
    alert("Houve um erro de conexão. Tente novamente.");
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});