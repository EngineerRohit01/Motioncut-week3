 // Recipe data
        const recipes = [
            {
                title: "Classic Margherita Pizza",
                cuisine: "italian",
                image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
                description: "A simple yet delicious pizza topped with fresh mozzarella, tomatoes, and basil.",
                ingredients: [
                    "Pizza dough",
                    "Tomato sauce",
                    "Fresh mozzarella",
                    "Fresh basil leaves",
                    "Olive oil",
                    "Salt"
                ],
                preparation: [
                    "Preheat oven to 475°F (245°C).",
                    "Roll out dough, spread tomato sauce.",
                    "Add sliced mozzarella and basil.",
                    "Drizzle with olive oil and season with salt.",
                    "Bake for 12-14 minutes until crust is golden."
                ]
            },
            {
                title: "Spaghetti Carbonara",
                cuisine: "italian",
                image: "https://doordraz.com/wp-content/uploads/2024/01/DALL%C2%B7E-2024-01-08-17.11.46-A-well-presented-plate-of-Spaghetti-Carbonara-on-a-rustic-wooden-table.-The-spaghetti-is-topped-with-crispy-golden-pancetta-a-sprinkle-of-freshly-gra.png?auto=format&fit=crop&w=600&q=80",
                description: "Rich and creamy pasta with pancetta, eggs, and parmesan cheese.",
                ingredients: [
                    "Spaghetti",
                    "Egg yolks",
                    "Parmesan cheese",
                    "Pancetta",
                    "Black pepper",
                    "Salt"
                ],
                preparation: [
                    "Cook spaghetti. In a bowl, mix egg yolks and parmesan.",
                    "Cook pancetta until crispy.",
                    "Drain pasta, saving some water.",
                    "Mix hot pasta with pancetta and egg mixture.",
                    "Add pasta water as needed for a creamy sauce."
                ]
            },
            {
                title: "Tacos al Pastor",
                cuisine: "mexican",
                image: "https://thestayathomechef.com/wp-content/uploads/2019/07/Tacos-al-Pastor-2-1.jpg?auto=format&fit=crop&w=600&q=80",
                description: "Flavorful pork tacos with pineapple, onions, cilantro, and salsa.",
                ingredients: [
                    "Pork shoulder",
                    "Pineapple",
                    "Corn tortillas",
                    "Onion",
                    "Cilantro",
                    "Al pastor marinade"
                ],
                preparation: [
                    "Marinate pork with al pastor sauce overnight.",
                    "Grill pork and slice thinly.",
                    "Warm tortillas, add pork, pineapple, onion, and cilantro.",
                    "Serve with salsa."
                ]
            },
            {
                title: "Paneer Butter Masala",
                cuisine: "indian",
                image: "https://www.whiskaffair.com/wp-content/uploads/2019/05/Paneer-Butter-Masala-2-3.jpg?auto=format&fit=crop&w=600&q=80",
                description: "Creamy tomato-based curry with paneer cubes and aromatic spices.",
                ingredients: [
                    "Paneer cubes",
                    "Tomato puree",
                    "Butter",
                    "Cream",
                    "Garam masala",
                    "Ginger-garlic paste"
                ],
                preparation: [
                    "Sauté ginger-garlic paste in butter.",
                    "Add tomato puree and cook until thick.",
                    "Add spices and cream, simmer.",
                    "Add paneer cubes and cook for 5 minutes.",
                    "Garnish with cilantro."
                ]
            },
            {
                title: "Classic Cheeseburger",
                cuisine: "american",
                image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
                description: "Juicy beef patty with cheese, lettuce, tomato, and pickles on a toasted bun.",
                ingredients: [
                    "Ground beef",
                    "Burger buns",
                    "Cheddar cheese",
                    "Lettuce",
                    "Tomato",
                    "Pickles",
                    "Onion",
                    "Ketchup & mustard"
                ],
                preparation: [
                    "Form beef into patties, season with salt and pepper.",
                    "Grill patties to desired doneness, add cheese to melt.",
                    "Toast buns, assemble burger with toppings.",
                    "Serve hot."
                ]
            }
        ];

        // Utility for star rating
        function renderStars(rating, idx) {
            let stars = '';
            for (let i = 1; i <= 5; i++) {
                stars += `<span class="star${i <= rating ? '' : ' inactive'}" data-idx="${idx}" data-star="${i}" aria-label="${i} star${i > 1 ? 's' : ''}">&#9733;</span>`;
            }
            return stars;
        }

        // State to store ratings
        const ratings = new Array(recipes.length).fill(0);

        function createRecipeCard(recipe, idx) {
            return `
        <article class="recipe-card" tabindex="0" data-cuisine="${recipe.cuisine}">
          <div class="recipe-image-container">
            <img src="${recipe.image}" alt="Image of ${recipe.title}" loading="lazy">
          </div>
          <h2 class="recipe-title">${recipe.title}</h2>
          <div class="recipe-desc">${recipe.description}</div>
          <ul class="ingredient-list" id="ingredients-${idx}">
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
          <button class="toggle-btn" aria-expanded="false" aria-controls="prep-${idx}" data-idx="${idx}">Show Preparation</button>
          <ol class="preparation" id="prep-${idx}" style="display:none;">
            ${recipe.preparation.map(step => `<li>${step}</li>`).join('')}
          </ol>
          <section class="rating-section" aria-label="Recipe rating">
            <span>Rate this:</span>
            <span class="star-rating" data-idx="${idx}">
              ${renderStars(0, idx)}
            </span>
          </section>
        </article>
      `;
        }

        function renderRecipeCards(filter = "all") {
            const container = document.getElementById('cards-container');
            container.innerHTML = recipes.map((r, idx) => {
                if (filter === "all" || r.cuisine === filter) {
                    return createRecipeCard(r, idx);
                }
                return '';
            }).join('');
            attachToggleEvents();
            attachRatingEvents();
        }

        function attachToggleEvents() {
            document.querySelectorAll('.toggle-btn').forEach(btn => {
                btn.addEventListener('click', e => {
                    const idx = btn.getAttribute('data-idx');
                    const prep = document.getElementById(`prep-${idx}`);
                    const expanded = btn.getAttribute('aria-expanded') === "true";
                    prep.style.display = expanded ? "none" : "block";
                    btn.setAttribute('aria-expanded', (!expanded).toString());
                    btn.textContent = expanded ? "Show Preparation" : "Hide Preparation";
                });
            });
        }

        function attachRatingEvents() {
            document.querySelectorAll('.star-rating').forEach(section => {
                const idx = section.getAttribute('data-idx');
                section.querySelectorAll('.star').forEach(star => {
                    star.addEventListener('click', e => {
                        const rating = +star.getAttribute('data-star');
                        ratings[idx] = rating;
                        section.innerHTML = renderStars(rating, idx);
                        attachRatingEvents(); // re-attach after re-render
                    });
                    star.addEventListener('mouseover', e => {
                        const rating = +star.getAttribute('data-star');
                        section.innerHTML = renderStars(rating, idx);
                    });
                    section.addEventListener('mouseleave', e => {
                        section.innerHTML = renderStars(ratings[idx], idx);
                        attachRatingEvents();
                    });
                });
            });
        }

        // Cuisine Filter event
        document.getElementById('cuisine-filter').addEventListener('change', function () {
            renderRecipeCards(this.value);
        });

        // Initial render
        renderRecipeCards();