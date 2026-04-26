export function initRouter(onNavigate) {
  function handleHash() {
    const hash = window.location.hash.slice(1) || "overview";
    onNavigate(hash);
  }

  window.addEventListener("hashchange", handleHash);
  handleHash();
}

export function setActiveLink(sectionId) {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });
}
