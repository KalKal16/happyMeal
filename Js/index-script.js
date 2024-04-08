// Fonction pour charger les données JSON et générer les cartes de recettes
async function afficherRecettes() {
    const response = await fetch('./data.json');
    const data = await response.json();
    const recettesContainer = document.getElementById('recettesContainer');
    data.recettes.forEach(recette => {
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${recette.nom}</h5>
                    <p class="card-text">Temps de préparation: ${recette.temps_preparation}</p>
                    <p class="card-text">Catégorie: ${recette.categorie}</p>
                    <a href="#" class="btn btn-primary">Voir la recette</a>
                </div>
            </div>
        `;
        recettesContainer.appendChild(card);
    });
}
window.onload = afficherRecettes;
