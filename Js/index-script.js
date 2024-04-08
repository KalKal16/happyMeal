// Fonction pour mélanger aléatoirement un tableau
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
async function afficherRecettes() {
    const response = await fetch('./data.json');
    const data = await response.json();
    const recettesContainer = document.getElementById('recettesContainer');
    const recettesMelangees = shuffle(data.recettes);
    const nombreDeRecettes = 4;
    for (let i = 0; i < nombreDeRecettes; i++) {
        const recette = recettesMelangees[i];
        const card = document.createElement('div');
        card.classList.add('col-md-6', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${recette.nom}</h5>
                    <p class="card-text">Catégorie: ${recette.categorie}</p>
                    <a href="#" class="btn btn-primary">Voir la recette</a>
                </div>
            </div>
        `;
        recettesContainer.appendChild(card);
    }
}
window.onload = afficherRecettes;
