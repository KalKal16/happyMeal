document.addEventListener("DOMContentLoaded", function() {
    afficherFavoris();
});

//récupérer les ingrédients favoris à partir du stockage local et les afficher dans un conteneur spécifié dans le HTML.
function afficherFavoris() {
    const favorisContainer = document.getElementById("favorisContainer");
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    if (favoris.length === 0) {
        favorisContainer.innerHTML = "<p>Aucun ingrédient favori pour le moment.</p>";
    } else {
        const listItems = favoris.map((ingredient, index) => {
            return `<li>${ingredient} <button class="btn btn-danger btn-sm" onclick="supprimerIngredient(${index})">Supprimer</button></li>`;
        }).join("");
        favorisContainer.innerHTML = `<ul>${listItems}</ul>`;
    }
}
//supprimer un ingrédient de la liste des favoris. Cette fonction prend un index comme paramètre pour identifier quel ingrédient doit être supprimé. L'index est utilisé pour supprimer l'élément correspondant du tableau des favoris stocké localement, puis la fonction afficherFavoris() est appelée à nouveau pour mettre à jour l'affichage des ingrédients favoris.
function supprimerIngredient(index) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris.splice(index, 1);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris();
}
