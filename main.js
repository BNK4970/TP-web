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
  });
  