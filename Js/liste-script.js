document.addEventListener("DOMContentLoaded", function() {
    afficherFavoris();
    const telechargerListeBtn = document.getElementById("telechargerListe");
    telechargerListeBtn.addEventListener("click", telechargerListeDeCourses);
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

function telechargerListeDeCourses() {
    const favoris = JSON.parse(localStorage.getItem("favoris")) || [];
    const contenuFichier = favoris.join('\n');
    const blob = new Blob([contenuFichier], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "liste_de_courses.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
