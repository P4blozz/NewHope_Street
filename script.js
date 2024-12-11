// CARROSEL
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel .slide');
    const carousel = document.querySelector('.carousel');
    if (!slides.length) return;

    const totalSlides = slides.length;

    // Ajusta o índice para o ciclo
    currentSlide = (index + totalSlides) % totalSlides;

    // Move o carrossel usando `transform`
    const offset = -currentSlide * 100; // Assume que cada slide ocupa 100% da largura
    carousel.style.transform = `translateX(${offset}%)`;
}

function moveSlide(step) {
    showSlide(currentSlide + step);
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        moveSlide(1); // Avança para o próximo slide
    }, 3000); // Altere 3000 para o intervalo desejado (em milissegundos)
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Inicializa o carrossel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel .slide');
    const carouselContainer = document.querySelector('.carousel-container');

    if (slides.length) {
        showSlide(currentSlide);
        startAutoSlide();

        // Para a transição automática ao passar o mouse
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
});

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para adicionar ao carrinho
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Produto adicionado ao carrinho!');
    } else {
        alert('O produto já está no carrinho.');
    }
    loadCart(); // Atualiza a lista do carrinho
}

// Função para adicionar ao carrinho
function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    loadCart(); // Atualiza a lista do carrinho
}

// Função para carregar o carrinho
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-list');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>O seu carrinho está vazio.</p><a href="catalogo.html" class="btn btn-primary">Ir para o Catálogo</a>';
    } else {
        cartContainer.innerHTML = '';
        cart.forEach(productId => {
            const productCard = createProductCard(productId);
            cartContainer.appendChild(productCard);
        });
    }
}

// Função para criar os cartões dos produtos no carrinho
function createProductCard(productId) {
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

    const card = document.createElement('div');
    card.classList.add('card', 'my-2');
    card.innerHTML = `
        <img src="${productData[productId].img}" class="card-img-top" alt="${productId}" />
        <div class="card-body text-center">
            <h5 class="card-title">${productData[productId].ref}</h5>
            <p class="text-muted">${productData[productId].size}</p>
            <button class="btn btn-light" onclick="removeFromCart('${productId}')">Remover do Carrinho</button>
        </div>
    `;
    return card;
}

// Função para remover do carrinho
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    loadCart(); // Atualiza a visualização
}

// Carregar o carrinho na página ao iniciar
if (document.title === "New Hope") {
    loadCart();
}

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Função para carregar o carrinho com botão de "Comprar"
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-list');
    const checkoutContainer = document.getElementById('checkout-container');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>O seu carrinho está vazio.</p><a href="catalogo.html" class="btn btn-primary">Ir para o Catálogo</a>';
        checkoutContainer.innerHTML = ''; // Remove o botão de "Comprar" se o carrinho estiver vazio
    } else {
        cartContainer.innerHTML = '';
        cart.forEach(productId => {
            const productCard = createProductCard(productId);
            cartContainer.appendChild(productCard);
        });

        // Adiciona o botão de "Comprar" se houver itens no carrinho
        checkoutContainer.innerHTML = `
            <button class="btn btn-success" onclick="checkout()">Comprar</button>
        `;
    }
}

// Função para criar mensagem e abrir WhatsApp
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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

    let message = 'Olá, gostaria de comprar os seguintes itens:\n\n';

    cart.forEach(productId => {
        const product = productData[productId];
        message += `📦 ${product.ref}\n📏 ${product.size}\n\n`;
    });

    const whatsappLink = `https://wa.me/5531985079718?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}

