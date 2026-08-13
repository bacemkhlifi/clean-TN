const form = document.querySelector("#order-form");
const toast = document.querySelector("#order-toast");
const whatsappNumber = "21653780888";

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.classList.toggle("is-error", isError);
  toast.classList.add("is-visible");
  window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 5200);
}

function encodeFormData(formData) {
  return new URLSearchParams(formData).toString();
}

function buildWhatsAppUrl(formData) {
  const message = [
    "Bonjour, je veux commander Ndhaf Tounes Kit.",
    "",
    `Nom: ${formData.get("name") || ""}`,
    `Ville / quartier: ${formData.get("city") || ""}`,
    `Package: ${formData.get("package") || ""}`,
    `Telephone: ${formData.get("phone") || ""}`,
    `Email: ${formData.get("email") || ""}`,
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

async function saveLeadInNetlify(formData) {
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(formData),
    });
  } catch {
    // WhatsApp remains the primary order channel.
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button");
  const formData = new FormData(form);
  const whatsappUrl = buildWhatsAppUrl(formData);

  button.disabled = true;
  button.textContent = "Ouverture WhatsApp...";

  await saveLeadInNetlify(formData);
  showToast("Demande bien recue. WhatsApp va s'ouvrir pour confirmer.");
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  form.reset();
  button.disabled = false;
  button.textContent = "Commander sur WhatsApp";
});
