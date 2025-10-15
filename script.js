// ===================================================================
//  CONFIGURACIÓN DE LA BASE DE DATOS
// ===================================================================
const googleSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQPKjK1fDKb5ZrkW7j7FsJOZLuy4WaequwHT_WCVZu1dHlMDLTmqlbaNga9_xgzW0H91Vv7d79N7-3W/pub?gid=1732763592&single=true&output=csv";

// ===================================================================
//  LÓGICA DEL SITIO WEB
// ===================================================================
document.addEventListener('DOMContentLoaded', async () => {
    let productos = [];
    let carrito = [];

    // --- FUNCIÓN PARA CARGAR PRODUCTOS DESDE GOOGLE SHEETS ---
    async function cargarProductos() {
        const productGrid = document.getElementById('product-grid');
        const promoList = document.getElementById('promo-service-list');
        if (productGrid) productGrid.innerHTML = '<p class="loading-message">Cargando catálogo...</p>';
        if (promoList) promoList.innerHTML = '<p class="loading-message">Cargando servicios...</p>';
        
        try {
            // Se añade un parámetro extra a la URL para evitar que el navegador guarde una versión vieja (caché)
            const response = await fetch(googleSheetUrl + `&t=${new Date().getTime()}`);
            if (!response.ok) throw new Error('No se pudo conectar con la base de datos.');
            
            const csvText = await response.text();
            
            const lines = csvText.split(/\r?\n/);
            const headers = lines[0].split(',');
            
            productos = lines.slice(1).map(line => {
                const values = line.split(',');
                const product = {};
                headers.forEach((header, index) => {
                    const value = values[index] ? values[index].replace(/^"|"$/g, '').trim() : '';
                    if (header === 'price') {
                        product[header] = parseFloat(value) || 0;
                    } else {
                        product[header] = value;
                    }
                });
                return product;
            }).filter(p => p.name); // Filtra cualquier fila vacía que pueda venir del CSV
            
            iniciarApp();
            
        } catch (error) {
            console.error('Error al cargar los productos:', error);
            if (productGrid) productGrid.innerHTML = '<p class="error-message">No se pudo cargar el catálogo. Por favor, intenta más tarde.</p>';
            if (promoList) promoList.innerHTML = '<p class="error-message">No se pudo cargar el catálogo. Por favor, intenta más tarde.</p>';
        }
    }

    // --- FUNCIÓN QUE INICIA TODA LA LÓGICA ---
    function iniciarApp() {
        const productGrid = document.getElementById('product-grid');
        if (productGrid) {
            const filterButtons = document.querySelectorAll('.filtro-btn');

            function formatDescription(description) {
                if (!description) return '';
                if (description.includes(',')) {
                    const items = description.split(',').map(item => `<li>${item.trim()}</li>`).join('');
                    return `<ul>${items}</ul>`;
                }
                return `<p>${description}</p>`;
            }

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
                        <p class="precio">$${product.price.toFixed(2)} ${product.durationText}</p>
                        ${formatDescription(product.description)} 
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

        const promoServiceList = document.getElementById('promo-service-list');
        if (promoServiceList) {
            const itemCountEl = document.getElementById('item-count');
            const subtotalPriceEl = document.getElementById('subtotal-price');
            const descuentoTextoEl = document.getElementById('descuento-texto');
            const totalPriceEl = document.getElementById('total-price');
            const addBundleBtn = document.getElementById('add-bundle-to-cart-btn');
            const serviciosIndividuales = productos.filter(p => p.type === 'individual');
            
            promoServiceList.innerHTML = '';
            serviciosIndividuales.forEach((service, index) => {
                const serviceElement = document.createElement('div');
                serviceElement.className = 'service-item';
                serviceElement.innerHTML = `
                    <input type="checkbox" id="service-${index}">
                    <label for="service-${index}">${service.name} (${service.provider})</label>
                    <span class="precio">$${service.price.toFixed(2)} ${service.durationText}</span>
                `;
                promoServiceList.appendChild(serviceElement);
            });

            promoServiceList.addEventListener('change', () => {
                let count = 0, subtotal = 0;
                const selectedServicesNames = [];
                serviciosIndividuales.forEach((service, index) => {
                    if (document.getElementById(`service-${index}`).checked) {
                        count++;
                        subtotal += service.price;
                        selectedServicesNames.push(`${service.name} (${service.provider})`);
                    }
                });
                let total = subtotal, discountPercentage = 0;
                if (count >= 8) discountPercentage = 50;
                else if (count >= 6) discountPercentage = 30;
                else if (count >= 4) discountPercentage = 15;
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
                    provider: 'Paquete Personalizado', name: `Paquete Personalizado (${count} servicios)`,
                    price: parseFloat(total.toFixed(2)), durationText: 'MXN',
                    description: selectedServicesNames.join(', ')
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
    }

    const carritoIcono = document.getElementById('carrito-icono'), modalCarrito = document.getElementById('modal-carrito'),
    cerrarModal = document.getElementById('cerrar-modal'), carritoContador = document.getElementById('carrito-contador'),
    carritoItemsContainer = document.getElementById('carrito-items'), finalizarCompraBtn = document.getElementById('finalizar-compra-btn'),
    vaciarCarritoBtn = document.getElementById('vaciar-carrito-btn');

    function actualizarCarrito() {
        carritoContador.textContent = carrito.length;
        carritoItemsContainer.innerHTML = carrito.length === 0 ? '<p>Tu carrito está vacío.</p>' : '';
        if (carrito.length > 0) {
            carrito.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'carrito-item';
                let itemHTML = `<div class="carrito-item-info"><span>${item.name} - $${item.price.toFixed(2)} ${item.durationText}</span>`;
                if (item.provider === 'Paquete Personalizado') itemHTML += `<small class="carrito-item-detalle">${item.description}</small>`;
                itemHTML += `</div><button class="eliminar-item-btn" data-index="${index}">X</button>`;
                itemElement.innerHTML = itemHTML;
                carritoItemsContainer.appendChild(itemElement);
            });
        }
    }

    carritoIcono.addEventListener('click', () => modalCarrito.style.display = 'block');
    cerrarModal.addEventListener('click', () => modalCarrito.style.display = 'none');
    window.addEventListener('click', e => { if (e.target == modalCarrito) modalCarrito.style.display = 'none'; });
    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            if (e.target._productData) {
                carrito.push(e.target._productData);
                actualizarCarrito();
            }
        }
    });
    carritoItemsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('eliminar-item-btn')) {
            carrito.splice(parseInt(e.target.dataset.index, 10), 1);
            actualizarCarrito();
        }
    });
    vaciarCarritoBtn.addEventListener('click', () => {
        if (carrito.length > 0 && confirm('¿Estás seguro de que quieres vaciar tu carrito?')) {
            carrito = [];
            actualizarCarrito();
        }
    });
    finalizarCompraBtn.addEventListener('click', async e => {
        e.preventDefault();
        if (carrito.length === 0) return alert('Tu carrito está vacío.');
        finalizarCompraBtn.textContent = 'Procesando...';
        finalizarCompraBtn.disabled = true;
        try {
            const response = await fetch('/.netlify/functions/create-checkout-session', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
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

    cargarProductos();
    actualizarCarrito();
});