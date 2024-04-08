async function afficherRecettes() {
    const response = await fetch('data.json');
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
                    <p class="card-text">Temps de préparation: ${recette.temps_preparation}</p>
                    <p class="card-text">Catégorie: ${recette.categorie}</p>
                    <button class="btn btn-primary voir-recette" data-bs-toggle="modal" data-bs-target="#recetteModal" data-id="${i}">Voir la recette</button>
                </div>
            </div>
        `;
        recettesContainer.appendChild(card);
    }
    const voirRecetteBtns = document.querySelectorAll('.voir-recette');
    voirRecetteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const recetteIndex = btn.getAttribute('data-id');
            const recette = recettesMelangees[recetteIndex];
            afficherRecetteModal(recette);
        });
    });
}
function afficherRecetteModal(recette) {
    const modalTitle = document.getElementById('recetteModalLabel');
    const modalBody = document.getElementById('recetteModalBody');
    modalTitle.textContent = recette.nom;
    let ingredientsHtml = '<h6>Ingrédients :</h6><ul>';
    recette.ingredients.forEach(ingredient => {
        ingredientsHtml += `<li>${ingredient.quantite} ${ingredient.nom}</li>`;
    });
    ingredientsHtml += '</ul>';
    let etapesHtml = '<h6>Étapes :</h6><ol>';
    recette.etapes.forEach(etape => {
        etapesHtml += `<li>${etape}</li>`;
    });
    etapesHtml += '</ol>';
    modalBody.innerHTML = ingredientsHtml + etapesHtml;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

window.onload = afficherRecettes;
document.addEventListener("DOMContentLoaded", function() {
    const addToFavoritesBtn = document.getElementById("addToFavoritesBtn");

    addToFavoritesBtn.addEventListener("click", function() {
        const recetteTitle = document.getElementById("recetteModalLabel").innerText;
        const recetteBody = document.getElementById("recetteModalBody").innerText;
        const recette = {
            title: recetteTitle,
            body: recetteBody
        };
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        const existingRecipeIndex = favoris.findIndex(item => item.title === recette.title);
        if (existingRecipeIndex === -1) {
            favoris.push(recette);
            localStorage.setItem("favoris", JSON.stringify(favoris));
            alert("Recette ajoutée aux favoris !");
        } else {
            alert("Cette recette est déjà dans vos favoris !");
        }
    });
});
