const form = document.querySelector("#order-form");
const toast = document.querySelector("#order-toast");
const ownerEmail = "toumiazz88@gmail.com";

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

function buildMailto(formData) {
  const subject = "Nouvelle demande Ndhaf Tounes";
  const body = [
    "Nouvelle demande de commande:",
    "",
    `Nom: ${formData.get("name") || ""}`,
    `Ville / quartier: ${formData.get("city") || ""}`,
    `Package: ${formData.get("package") || ""}`,
    `Telephone: ${formData.get("phone") || ""}`,
    `Email: ${formData.get("email") || ""}`,
  ].join("\n");

  return `mailto:${ownerEmail}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button");
  const formData = new FormData(form);
  button.disabled = true;
  button.textContent = "Envoi en cours...";

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData(formData),
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

    form.reset();
    showToast(
      "Demande bien recue. Nous allons vous appeler bientot pour confirmation."
    );
  } catch {
    window.location.href = buildMailto(formData);
    showToast(
      "Votre application email va s'ouvrir pour nous envoyer la demande directement.",
      true
    );
  } finally {
    button.disabled = false;
    button.textContent = "Envoyer la demande";
  }
});
