document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Altere o texto do botão para dar feedback visual
  const submitBtn = e.target.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = "Enviando...";
  submitBtn.disabled = true;

  // Capturando os valores dos inputs
  const formData = {
    nome: document.getElementById("nome").value,
    presenca:
      document.querySelector('input[name="formatura"]:checked')?.value === "sim"
        ? "Sim"
        : "Não",
    qtdConvidados:
      document.querySelector('input[name="convidados"]:checked')?.value ||
      "Não",
    convidado1: document.getElementById("nome-convidado-1").value || "",
    convidado2: document.getElementById("nome-convidado-2").value || "",
  };

  try {
    // Cole a URL gerada pelo Power Automate aqui:
    const webhookUrl = "SUA_URL_DO_POWER_AUTOMATE_AQUI";

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Presença confirmada com sucesso! Nos vemos na formatura.");
      e.target.reset(); // Limpa o formulário
    } else {
      alert("Houve um erro ao enviar. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro de conexão. Verifique sua internet.");
  } finally {
    // Restaura o botão
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});
