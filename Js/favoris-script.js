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
                <button class="btn btn-primary second-btn">Deuxième bouton</button>
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
                        <button class="btn btn-primary second-btn">Deuxième bouton</button>
                    </div>
                `;
                favoritesList.appendChild(recetteCard);
            });
        }
    });
});
