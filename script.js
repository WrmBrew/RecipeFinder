document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);

            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active');
            });

            tabs.forEach(tab => {
                tab.classList.remove('active');
            });

            tab.classList.add('active');
            target.classList.add('active');
        });
    });

    const form = document.getElementById('search-form');
    const recipeList = document.getElementById('recipe-list');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ingredient = form.elements.ingredient.value;
        const recipes = await searchRecipes(ingredient, 0, 20);
        displayRecipes(recipes);
    });

    async function searchRecipes(ingredient, from, to) {
        const APP_ID = 'b1e1cee3';
        const APP_KEY = '77f361fe485a77423ccd1f3b53d29f73';
        const url = `https://api.edamam.com/search?q=${encodeURIComponent(ingredient)}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.hits.map(hit => hit.recipe);
    }

    function displayRecipes(recipes) {
        recipeList.innerHTML = '';
        if (recipes.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'No recipes found.';
            recipeList.appendChild(message);
        } else {
            const recipeContainer = document.createElement('div');
            recipeContainer.classList.add('recipe-container');

            recipes.forEach(recipe => {
                const recipeLink = document.createElement('a');
                recipeLink.href = recipe.url;
                recipeLink.target = '_blank';

                const recipeImage = document.createElement('img');
                recipeImage.src = recipe.image;
                recipeImage.alt = recipe.label;

                recipeLink.appendChild(recipeImage);

                const recipeTitle = document.createElement('span');
                recipeTitle.textContent = recipe.label;

                recipeLink.appendChild(recipeTitle);

                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe-item');
                recipeDiv.appendChild(recipeLink);

                recipeContainer.appendChild(recipeDiv);
            });

            recipeList.appendChild(recipeContainer);
        }
    }
});
