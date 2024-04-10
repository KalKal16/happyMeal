//Lorsque la page est chargée, le code récupère les recettes que l'utilisateur a ajoutées à ses favoris auparavant, à partir de la mémoire de son navigateur. Ensuite, il affiche ces recettes sur la page web dans une liste, chacune avec un bouton pour les supprimer. i l'utilisateur décide de supprimer une recette de ses favoris en cliquant sur le bouton correspondant, cette recette est retirée de la liste affichée sur la page. Après avoir supprimé une recette de ses favoris, la liste mise à jour est sauvegardée dans la mémoire du navigateur de l'utilisateur pour que la prochaine fois qu'il visite la page, il voie la liste actualisée.
document.addEventListener("DOMContentLoaded", function() {
    const favoritesList = document.getElementById("favoritesList");
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris.forEach(function(recette, index) {
        const recetteCard = document.createElement("div");
        recetteCard.classList.add("card", "mb-3");
        recetteCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${recette.title}</h5>
                <p class="card-text">${recette.body}</p>
                <button class="btn btn-danger delete-btn" data-index="${index}">Supprimer</button>
            </div>
        `;
        favoritesList.appendChild(recetteCard);
    });

    favoritesList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const indexToRemove = event.target.dataset.index;
            favoris.splice(indexToRemove, 1);
            localStorage.setItem("favoris", JSON.stringify(favoris));
            favoritesList.innerHTML = "";
            favoris.forEach(function(recette, index) {
                const recetteCard = document.createElement("div");
                recetteCard.classList.add("card", "mb-3");
                recetteCard.innerHTML = `
                    <div class="card-body">
                        <h5 class="card-title">${recette.title}</h5>
                        <p class="card-text">${recette.body}</p>
                        <button class="btn btn-danger delete-btn" data-index="${index}">Supprimer</button>
                    </div>
                `;
                favoritesList.appendChild(recetteCard);
            });
        }
    });
});
