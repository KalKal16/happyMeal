document.addEventListener("DOMContentLoaded", function() {
    const favoritesList = document.getElementById("favoritesList");
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    function renderFavorites() {
        favoritesList.innerHTML = "";
        favoris.forEach(function(recette, index) {
            const recetteCard = document.createElement("div");
            recetteCard.classList.add("card", "mb-3");
            recetteCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${recette.title}</h5>
                    <p class="card-text">${recette.body}</p>
                    <p>Jour de la semaine: ${recette.day}</p>
                    <p>Moment de la journée: ${recette.timeOfDay}</p>
                    <button class="btn btn-danger delete-btn" data-index="${index}">Supprimer</button>
                    <button class="btn color-btn select-btn" data-index="${index}">Sélectionner</button>
                </div>
            `;
            favoritesList.appendChild(recetteCard);
        });
    }

    renderFavorites();

    favoritesList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const indexToRemove = event.target.dataset.index;
            favoris.splice(indexToRemove, 1);
            localStorage.setItem("favoris", JSON.stringify(favoris));
            renderFavorites();
        } else if (event.target.classList.contains("select-btn")) {
            const indexToSelect = event.target.dataset.index;
            const jour = prompt("Entrez le jour de la semaine:");
            const moment = prompt("Entrez le moment de la journée (matin, midi ou soir):");
            if (jour && moment) {
                favoris[indexToSelect].day = jour;
                favoris[indexToSelect].timeOfDay = moment;
                localStorage.setItem("favoris", JSON.stringify(favoris));
                renderFavorites();
            } else {
                alert("Veuillez remplir tous les champs !");
            }
        }
    });
    document.getElementById("addRecipeBtn").addEventListener("click", function() {
        const jour = prompt("Entrez le jour de la semaine:");
        const moment = prompt("Entrez le moment de la journée (matin, midi ou soir):");
        if (jour && moment) {
            const recette = {
                title: "Titre de la recette",
                body: "Contenu de la recette",
                day: jour,
                timeOfDay: moment
            };

            favoris.push(recette);
            localStorage.setItem("favoris", JSON.stringify(favoris));
            renderFavorites();
        } else {
            alert("Veuillez remplir tous les champs !");
        }
    });
});
