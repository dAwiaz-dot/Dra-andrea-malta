const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const whatsappForms = document.querySelectorAll("[data-whatsapp-form]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

whatsappForms.forEach((form) => {
  const feedback = form.querySelector("[data-schedule-feedback]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const motivo = String(data.get("motivo") || "").trim();
    const modalidade = String(data.get("modalidade") || "").trim();
    const periodo = String(data.get("periodo") || "").trim();
    const mensagem = String(data.get("mensagem") || "").trim();

    if (!nome || !motivo) {
      if (feedback) {
        feedback.textContent = "Preencha nome e motivo para continuar.";
      }
      return;
    }

    const linhas = [
      `Olá, Andréa! Meu nome é ${nome}.`,
      "Quero falar sobre atendimento nutricional.",
      `Motivo do contato: ${motivo}.`,
      `Preferência de atendimento: ${modalidade}.`,
      `Melhor período para mim: ${periodo}.`,
    ];

    if (mensagem) {
      linhas.push(`Mensagem: ${mensagem}`);
    }

    linhas.push("Pode me passar os próximos horários disponíveis?");

    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(`https://wa.me/5519993881752?text=${texto}`, "_blank", "noopener");

    if (feedback) {
      feedback.textContent = "Abrindo WhatsApp com a mensagem personalizada.";
    }
  });
});
