document.addEventListener("DOMContentLoaded", function() {
    afficherFavoris();
});

function afficherFavoris() {
    const favorisContainer = document.getElementById("favorisContainer");
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];

    if (favoris.length === 0) {
        favorisContainer.innerHTML = "<p>Aucun ingrédient favori pour le moment.</p>";
    } else {
        const listItems = favoris.map((ingredient, index) => {
            return `
                <li>${ingredient} <button class="btn btn-danger btn-sm" onclick="supprimerIngredient(${index})">Supprimer</button></li>
            `;
        }).join("");
        favorisContainer.innerHTML = `<ul>${listItems}</ul>`;
    }
}

function supprimerIngredient(index) {
    let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    favoris.splice(index, 1);
    localStorage.setItem("favoris", JSON.stringify(favoris));
    afficherFavoris();
}
