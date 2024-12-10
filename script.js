// Função para enviar mensagem pelo WhatsApp
function sendMessage(productId) {
    let message = '';
    if (productId === 'produto1') {
        message = 'Gostaria de comprar a Camiseta Chronic 4013';
    } else if (productId === 'produto2') {
        message = 'Gostaria de comprar a Camiseta Chronic 4013';
    }
    const url = `https://wa.me/5531985079718?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// FAVORITOS
function toggleFavorite(button) {
    const productId = button.closest('.col-md-4').getAttribute('data-product-id');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (favorites.includes(productId)) {
        // Remove do favoritos
        const index = favorites.indexOf(productId);
        if (index > -1) {
            favorites.splice(index, 1);
        }
        button.querySelector('.favorite-icon').src = 'imagens/vazio.png'; // Ícone vazio

        // Remove da sacola
        const cartIndex = cart.indexOf(productId);
        if (cartIndex > -1) {
            cart.splice(cartIndex, 1);
        }
    } else {
        // Adiciona aos favoritos
        favorites.push(productId);
        button.querySelector('.favorite-icon').src = 'imagens/cheio.png'; // Ícone preenchido

        // Adiciona à sacola
        cart.push(productId);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('cart', JSON.stringify(cart)); // Armazena na sacola
    loadFavorites(); // Atualiza a visualização na página de favoritos
}

// Atualizando a função loadFavorites
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favoritesContainer = document.querySelector('.favorites-list');

    if (cart.length === 0) {
        favoritesContainer.innerHTML = '<p>A sua sacola está vazia. Comece a adicionar produtos!</p><a href="catalogo.html" class="btn btn-primary">Ir para o Catálogo</a>';
    } else {
        favoritesContainer.innerHTML = ''; // Limpa o conteúdo
        cart.forEach(id => {
            const productCard = createProductCard(id);
            favoritesContainer.appendChild(productCard);
        });
    }
}

function createProductCard(productId) {
    const card = document.createElement('div');
    card.classList.add('card', 'my-2');
    
    // Exibir a imagem, REF e tamanho
    const productData = {
        'produto1': {
            img: 'imagens/frente.webp',
            ref: 'REF.: 100994018',
            size: 'Tamanho: G'
        },
        'produto2': {
            img: 'imagens/frente.webp',
            ref: 'REF.: 100994018',
            size: 'Tamanho: G'
        }
    };

    card.innerHTML = `
        <img src="${productData[productId].img}" class="card-img-top" alt="${productId}" />
        <div class="card-body text-center">
            <h5 class="card-title">${productData[productId].ref}</h5>
            <p class="text-muted">${productData[productId].size}</p>
            <button class="btn btn-light" onclick="removeFromCart('${productId}')">Remover da Sacola</button>
        </div>
    `;

    card.setAttribute('data-product-id', productId);
    return card;
}

// Criando função para remover produtos da sacola
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadFavorites(); // Atualiza a visualização
}

// Chama a função para carregar favoritos na página de favoritos
if (document.title === "New Hope") {
    loadFavorites(); // Certifique-se de que a função está atualizada
}
