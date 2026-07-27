document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.querySelector("#copy-citation");
  const bibtex = document.querySelector("#bibtex code");

  if (!copyButton || !bibtex) {
    return;
  }

  const label = copyButton.querySelector("span");
  const citation = bibtex.textContent.trim();

  const showStatus = (message) => {
    label.textContent = message;
    window.setTimeout(() => {
      label.textContent = "Copy";
    }, 1800);
  };

  const copyWithFallback = () => {
    const textArea = document.createElement("textarea");
    textArea.value = citation;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    return copied;
  };

  copyButton.addEventListener("click", async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(citation);
      } else if (!copyWithFallback()) {
        throw new Error("Copy command was unavailable.");
      }
      showStatus("Copied");
    } catch (error) {
      showStatus("Select text");
    }
  });
});
