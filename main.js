document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#menu');
  const menuLinks = document.querySelectorAll('#menu a'); // Sélectionne tous les liens du menu
  
  // Fonction pour ouvrir/fermer le menu
  const toggleMenu = () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', !isExpanded);
    menu.hidden = isExpanded;
  };

  // Gestionnaire d'événement pour le bouton hamburger
  toggleButton.addEventListener('click', toggleMenu);

  // Gestionnaire d'événement pour chaque lien du menu
  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Ferme le menu si un lien est cliqué
      if (!menu.hidden) {
        toggleMenu();
      }
    });
  });

  // Changer la feuille de style au clic du titre de la page
  const toggleStyle = document.querySelector('#btnMagique');
  const feuilleStyle = document.querySelector('#stylesheet');
  toggleStyle.addEventListener("click", () => {
    console.log(feuilleStyle.getAttribute("href")); // Debug : Affiche l'URL actuelle dans la console
    // Vérifier la feuille de style actuelle
    if (feuilleStyle.getAttribute("href") === "style.css") {
      feuilleStyle.setAttribute("href", "style2.css"); // Passer à style2.css
    } else {
      feuilleStyle.setAttribute("href", "style.css"); // Revenir à style.css
    }
  });
});