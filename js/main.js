document.addEventListener("DOMContentLoaded", () => {
    // --- Menu toggle ---
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");

    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // --- Featured Products ---
    const productsContainer = document.getElementById("products-container");

    // Keywords for filtering men's clothing
    const allowedKeywords = ["shirt", "jacket", "blazer", "suit"];

    // Fetch mens-shirts and tops
    Promise.all([
        fetch("https://dummyjson.com/products/category/mens-shirts").then(res => res.json()),
        fetch("https://dummyjson.com/products/category/tops").then(res => res.json())
    ])
    .then(results => {
        productsContainer.innerHTML = ""; // clear existing cards

        // Combine both categories
        let allProducts = [...results[0].products, ...results[1].products];

        // Filter only products containing allowed keywords in title
        allProducts = allProducts.filter(product =>
            allowedKeywords.some(keyword =>
                product.title.toLowerCase().includes(keyword)
            )
        );

        // Limit to 6 products
        allProducts.slice(0, 6).forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <img src="${product.thumbnail}" alt="${product.title}">
                <h4>${product.title}</h4>
                <p>₹ ${product.price}</p>
            `;

            // Hover effect
            card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
            card.addEventListener("mouseenter", () => {
                card.style.transform = "translateY(-10px) scale(1.05)";
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "translateY(0) scale(1)";
                card.style.boxShadow = "none";
            });

            productsContainer.appendChild(card);
        });
    })
    .catch(err => console.error("Error fetching products:", err));
});
