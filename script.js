// ===================================================================
//  BASE DE DATOS DE PRODUCTOS
// ===================================================================
const productos = [
    // --- COMBOS PREDEFINIDOS DE KARY ---
    { provider: 'Kary', name: 'Combo Fantasma 👻', price: 75, durationText: 'MXN / mes', description: '<ul><li>Netflix</li><li>Disney Premium</li><li>Vix</li><li>Deezer</li></ul>', message: 'Hola, me interesa el Combo Fantasma de Kary.', type: 'combo' },
    { provider: 'Kary', name: 'Combo Telaraña 🕸️', price: 55, durationText: 'MXN / mes', description: '<ul><li>Disney</li><li>Max</li><li>YouTube</li><li>Paramount</li></ul>', message: 'Hola, me interesa el Combo Telaraña de Kary.', type: 'combo' },
    { provider: 'Kary', name: 'Combo Dulce 🍡', price: 128, durationText: 'MXN / mes', description: '<ul><li>Netflix, Disney, Max</li><li>Vix, Paramount</li><li>Crunchyroll, Spotify</li></ul>', message: 'Hola, me interesa el Combo Dulce de Kary.', type: 'combo' },
    { provider: 'Kary', name: 'Combo Truco 🎃', price: 65, durationText: 'MXN / mes', description: '<ul><li>Canva, YouTube</li><li>Crunchyroll, Paramount</li><li>Vix, Prime Video</li></ul>', message: 'Hola, me interesa el Combo Truco de Kary.', type: 'combo' },
    
    // --- PRODUCTOS INDIVIDUALES (KARY Y PRIS SHOP) ---
    { provider: 'Kary', name: 'Netflix', price: 72, durationText: 'MXN / mes', description: 'Disfruta de series y películas populares. Acceso a 1 perfil.', message: 'Hola, me interesa contratar Netflix de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Disney+ Combo', price: 40, durationText: 'MXN / mes', description: 'Incluye Disney+, ESPN y Star+.', message: 'Hola, me interesa contratar el combo Disney+ de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Paramount+', price: 13, durationText: 'MXN / mes', description: 'Contenido exclusivo, series y películas originales.', message: 'Hola, me interesa contratar Paramount+ de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Prime Video', price: 22, durationText: 'MXN / mes', description: 'Acceso a Amazon Originals, películas y series populares.', message: 'Hola, me interesa contratar Prime Video de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Prime Video (Sin Anuncios)', price: 81, durationText: 'MXN / mes', description: 'La experiencia premium de Prime Video sin interrupciones comerciales.', message: 'Hola, me interesa contratar Prime Video Sin Anuncios de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Crunchyroll', price: 13, durationText: 'MXN / mes', description: 'La casa del anime. Acceso a un extenso catálogo sin anuncios.', message: 'Hola, me interesa contratar Crunchyroll de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Crunchyroll (5 Perfiles)', price: 54, durationText: 'MXN / mes', description: 'Cuenta completa para compartir con hasta 5 personas.', message: 'Hola, me interesa contratar Crunchyroll (5 Perfiles) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Max (Estándar)', price: 18, durationText: 'MXN / mes', description: 'Acceso a 1 perfil en el plan Estándar de Max (antes HBO).', message: 'Hola, me interesa contratar Max (Estándar) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Max (Platino)', price: 29, durationText: 'MXN / mes', description: 'La mejor calidad en 4K Ultra HD y audio Dolby Atmos.', message: 'Hola, me interesa contratar Max (Platino) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Max (Estándar - Cuenta Completa)', price: 72, durationText: 'MXN / mes', description: 'Cuenta completa del plan Estándar para toda la familia.', message: 'Hola, me interesa contratar Max (Estándar - Cuenta Completa) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Max (Platino - Cuenta Completa)', price: 108, durationText: 'MXN / mes', description: 'La máxima calidad 4K en una cuenta completa para compartir.', message: 'Hola, me interesa contratar Max (Platino - Cuenta Completa) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Vix Premium', price: 11, durationText: 'MXN / mes', description: 'Deportes en vivo, novelas y contenido exclusivo en español.', message: 'Hola, me interesa contratar Vix Premium de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Spotify', price: 68, durationText: 'MXN / mes', description: 'Música sin límites, sin anuncios y con la mejor calidad de audio.', message: 'Hola, me interesa contratar Spotify de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'YouTube Premium', price: 22, durationText: 'MXN / mes', description: 'Videos sin anuncios, descargas y YouTube Music. Perfil individual.', message: 'Hola, me interesa contratar YouTube Premium de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'YouTube Premium (Familiar)', price: 72, durationText: 'MXN / mes', description: 'Plan familiar completo para compartir y ahorrar.', message: 'Hola, me interesa contratar YouTube Premium (Familiar) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Canva Pro', price: 36, durationText: 'MXN / 1 Mes', description: 'Todas las herramientas de diseño premium para tus proyectos.', message: 'Hola, me interesa contratar Canva Pro (1 Mes) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Canva Pro', price: 90, durationText: 'MXN / 6 Meses', description: 'Asegura medio año de diseño sin límites y ahorra.', message: 'Hola, me interesa contratar Canva Pro (6 Meses) de Kary.', type: 'individual' },
    { provider: 'Kary', name: 'Canva Pro', price: 216, durationText: 'MXN / 1 Año', description: '¡La mejor oferta! Un año completo de Canva Pro.', message: 'Hola, me interesa contratar Canva Pro (1 Año) de Kary.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Netflix (Perfil)', price: 63, durationText: 'MXN / mes', description: 'Acceso a 1 perfil en una cuenta compartida. Calidad HD.', message: 'Hola, me interesa Netflix (Perfil) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Netflix (Perfil Privado)', price: 99, durationText: 'MXN / mes', description: 'Un perfil solo para ti, protegido con tu propio PIN de seguridad.', message: 'Hola, me interesa Netflix (Perfil Privado) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Netflix (Cuenta Completa)', price: 252, durationText: 'MXN / mes', description: 'Cuenta privada con todos los perfiles para ti y tu familia.', message: 'Hola, me interesa Netflix (Cuenta Completa) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Disney+ (Perfil)', price: 35, durationText: 'MXN / mes', description: 'Un perfil para disfrutar todo el contenido de Disney, Pixar y Marvel.', message: 'Hola, me interesa Disney+ (Perfil) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Max (Platino Perfil)', price: 35, durationText: 'MXN / mes', description: 'La mejor experiencia en 1 perfil con calidad 4K Ultra HD.', message: 'Hola, me interesa Max (Platino Perfil) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Prime Video (Perfil Sin Anuncios)', price: 25, durationText: 'MXN / mes', description: 'Disfruta de películas y series sin interrupciones comerciales.', message: 'Hola, me interesa Prime Video (Perfil Sin Anuncios) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Crunchyroll (Perfil Anual)', price: 72, durationText: 'MXN / año', description: '¡Oferta anual! Todo un año de anime a un precio increíble.', message: 'Hola, me interesa Crunchyroll (Perfil Anual) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'YouTube Premium (Invitación)', price: 20, durationText: 'MXN / mes', description: 'Te unes a nuestro plan familiar. Simple, rápido y sin anuncios.', message: 'Hola, me interesa YouTube (Invitación) de Pris Shop.', type: 'individual' },
    { provider: 'Pris Shop', name: 'Game Pass Ultimate', price: 270, durationText: 'MXN / mes', description: 'Cientos de juegos en consola, PC y la nube.', message: 'Hola, me interesa Game Pass Ultimate (1 Mes) de Pris Shop.', type: 'individual' }
];

// ===================================================================
//  LÓGICA DEL SITIO WEB
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    let carrito = [];

    // --- LÓGICA DEL CATÁLOGO ---
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        const filterButtons = document.querySelectorAll('.filtro-btn');

        function displayProducts(productsToDisplay) {
            productGrid.innerHTML = '';
            productsToDisplay.forEach((product) => {
                const isCombo = product.type === 'combo';
                const productCard = document.createElement('article');
                productCard.className = isCombo ? 'producto combo' : 'producto';

                const addButton = document.createElement('button');
                addButton.className = 'boton-comprar add-to-cart-btn';
                addButton.textContent = 'Añadir al carrito';
                addButton._productData = product;

                productCard.innerHTML = `
                    <h3>${product.name}</h3>
                    <p class="precio">$${product.price} ${product.durationText}</p>
                    ${product.description}
                `;
                productCard.appendChild(addButton);
                productGrid.appendChild(productCard);
            });
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const provider = button.getAttribute('data-provider');
                const filteredProducts = provider === 'todos' ? productos : productos.filter(p => p.provider === provider);
                displayProducts(filteredProducts);
            });
        });
        displayProducts(productos);
    }

    // --- LÓGICA DE LA PÁGINA DE PROMOCIONES ---
    const promoServiceList = document.getElementById('promo-service-list');
    if (promoServiceList) {
        const itemCountEl = document.getElementById('item-count');
        const subtotalPriceEl = document.getElementById('subtotal-price');
        const descuentoTextoEl = document.getElementById('descuento-texto');
        const totalPriceEl = document.getElementById('total-price');
        const addBundleBtn = document.getElementById('add-bundle-to-cart-btn');
        const serviciosIndividuales = productos.filter(p => p.type === 'individual');

        serviciosIndividuales.forEach((service, index) => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service-item';
            serviceElement.innerHTML = `
                <input type="checkbox" id="service-${index}">
                <label for="service-${index}">${service.name} (${service.provider})</label>
                <span class="precio">$${service.price} ${service.durationText}</span>
            `;
            promoServiceList.appendChild(serviceElement);
        });

        promoServiceList.addEventListener('change', () => {
            let count = 0;
            let subtotal = 0;
            const selectedServicesNames = [];
            
            serviciosIndividuales.forEach((service, index) => {
                const checkbox = document.getElementById(`service-${index}`);
                if (checkbox.checked) {
                    count++;
                    subtotal += service.price;
                    selectedServicesNames.push(`${service.name} (${service.provider})`);
                }
            });

            let total = subtotal;
            let discountPercentage = 0;

            if (count >= 8) { discountPercentage = 60; } 
            else if (count >= 6) { discountPercentage = 40; } 
            else if (count >= 4) { discountPercentage = 30; }

            if (discountPercentage > 0) {
                total = subtotal * (1 - discountPercentage / 100);
                descuentoTextoEl.innerHTML = `¡Felicidades! Tienes un <strong>${discountPercentage}% de descuento.</strong><br>(Ahorras $${(subtotal - total).toFixed(2)})`;
            } else if (count > 0) {
                descuentoTextoEl.textContent = `¡Selecciona ${4 - count} más para obtener tu primer descuento!`;
            } else {
                descuentoTextoEl.textContent = 'Selecciona 4 o más servicios para obtener un descuento.';
            }

            itemCountEl.textContent = count;
            totalPriceEl.textContent = `$${total.toFixed(2)} MXN`;
            subtotalPriceEl.innerHTML = discountPercentage > 0 ? `<s>$${subtotal.toFixed(2)} MXN</s>` : `$${subtotal.toFixed(2)} MXN`;

            addBundleBtn.disabled = count === 0;
            addBundleBtn._bundleData = {
                provider: 'Paquete Personalizado',
                name: `Paquete Personalizado (${count} servicios)`,
                price: parseFloat(total.toFixed(2)),
                durationText: 'MXN',
                description: selectedServicesNames.join(', '),
                message: `Hola, me interesa el siguiente Paquete Personalizado:\n- ${selectedServicesNames.join('\n- ')}\n\nTotal con ${discountPercentage}% de descuento: $${total.toFixed(2)} MXN`
            };
        });
        
        promoServiceList.dispatchEvent(new Event('change'));

        addBundleBtn.addEventListener('click', () => {
            if (!addBundleBtn.disabled) {
                carrito.push(addBundleBtn._bundleData);
                actualizarCarrito();
                alert('¡Paquete personalizado añadido al carrito!');
            }
        });
    }

    // --- LÓGICA GLOBAL DEL CARRITO ---
    const carritoIcono = document.getElementById('carrito-icono');
    const modalCarrito = document.getElementById('modal-carrito');
    const cerrarModal = document.getElementById('cerrar-modal');
    const carritoContador = document.getElementById('carrito-contador');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const finalizarCompraBtn = document.getElementById('finalizar-compra-btn');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');

    function actualizarCarrito() {
        carritoContador.textContent = carrito.length;
        carritoItemsContainer.innerHTML = '';
        if (carrito.length === 0) {
            carritoItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            carrito.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'carrito-item';
                let itemHTML = `<div class="carrito-item-info"><span>${item.name} - $${item.price} ${item.durationText}</span>`;
                if (item.provider === 'Paquete Personalizado') {
                    itemHTML += `<small class="carrito-item-detalle">${item.description}</small>`;
                }
                itemHTML += `</div><button class="eliminar-item-btn" data-index="${index}">X</button>`;
                itemElement.innerHTML = itemHTML;
                carritoItemsContainer.appendChild(itemElement);
            });
        }
    }

    carritoIcono.addEventListener('click', () => modalCarrito.style.display = 'block');
    cerrarModal.addEventListener('click', () => modalCarrito.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target == modalCarrito) {
            modalCarrito.style.display = 'none';
        }
    });

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            let product;
            if (event.target._productData) {
                product = event.target._productData;
            } else {
                const productName = event.target.getAttribute('data-product-name');
                if (productName) {
                    product = productos.find(p => p.name === productName);
                }
            }
            if (product) {
                carrito.push(product);
                actualizarCarrito();
            }
        }
    });

    carritoItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar-item-btn')) {
            const itemIndex = parseInt(event.target.getAttribute('data-index'), 10);
            carrito.splice(itemIndex, 1);
            actualizarCarrito();
        }
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        if (carrito.length > 0 && confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
            carrito = [];
            actualizarCarrito();
        }
    });

    finalizarCompraBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        if (carrito.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        finalizarCompraBtn.textContent = 'Procesando...';
        finalizarCompraBtn.disabled = true;

        try {
            const response = await fetch('/.netlify/functions/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ carrito }),
            });
            if (!response.ok) throw new Error('Error en la respuesta del servidor.');
            
            const { url } = await response.json();
            window.location.href = url;
        } catch (error) {
            console.error('Error al crear la sesión de pago:', error);
            alert('Hubo un problema al conectar con el sistema de pagos. Por favor, intenta de nuevo más tarde.');
            finalizarCompraBtn.textContent = 'Finalizar Pedido';
            finalizarCompraBtn.disabled = false;
        }
    });

    actualizarCarrito();
});