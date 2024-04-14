function afficherRecettes() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
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
                            <button class="btn color-btn voir-recette" data-bs-toggle="modal" data-bs-target="#recetteModal" data-id="${i}">Voir la recette</button>
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
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}



function afficherRecetteModal(recette) {
    const modalTitle = document.getElementById('recetteModalLabel');
    const modalBody = document.getElementById('recetteModalBody');
    modalTitle.textContent = recette.nom;
    let ingredientsHtml = '<h6>Ingrédients :</h6><ul>';
    recette.ingredients.forEach((ingredient, index) => {
        ingredientsHtml += `<li>${ingredient.quantite} ${ingredient.nom} <button class="btn color-btn btn-sm add-to-favorites" data-index="${index}">+</button></li>`;
    });
    ingredientsHtml += '</ul>';
    let etapesHtml = '<h6>Étapes :</h6><ol>';
    recette.etapes.forEach(etape => {
        etapesHtml += `<li>${etape}</li>`;
    });
    etapesHtml += '</ol>';
    modalBody.innerHTML = ingredientsHtml + etapesHtml;

    const addToFavoritesBtns = document.querySelectorAll('.add-to-favorites');
    addToFavoritesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            addToFavorites(recette.ingredients[index].nom, "ingredient");
        });
    });
}

function addToFavorites(item, type) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    const existingItemIndex = favoris.findIndex(favItem => favItem === item);
    if (existingItemIndex === -1) {
        favoris.push(item);
        localStorage.setItem("favoris", JSON.stringify(favoris));
        showNotification(`"${item}" ajouté aux favoris !`, type);
    } else {
        showNotification(`"${item}" est déjà dans vos favoris !`, type);
    }
}

function showNotification(message, type) {
    const modalBody = document.getElementById("recetteModalBody");
    const notification = document.createElement("div");
    notification.className = "alert alert-success mt-3";
    notification.setAttribute("role", "alert");
    notification.textContent = message;
    modalBody.appendChild(notification);
    setTimeout(function() {
        notification.remove();
    }, 3000);
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
            showNotification("Recette ajoutée aux favoris !", "recette");
        } else {
            showNotification("Cette recette est déjà dans vos favoris !", "recette");
        }
    });
});
