const form = document.querySelector("#order-form");
const toast = document.querySelector("#order-toast");

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
      throw new Error("Netlify form submission failed");
    }

    form.reset();
    showToast(
      "Demande bien recue. Nous allons vous appeler bientot pour confirmation."
    );
  } catch {
    showToast(
      "La demande n'a pas ete enregistree. Verifiez que Netlify Forms est active puis reessayez.",
      true
    );
  } finally {
    button.disabled = false;
    button.textContent = "Envoyer la demande";
  }
});
