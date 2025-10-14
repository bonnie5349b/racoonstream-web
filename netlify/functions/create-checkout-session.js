const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // 1. Validar que el método sea POST (seguridad)
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Método no permitido." })
    };
  }

  try {
    // 2. Intentar parsear el carrito
    const { carrito } = JSON.parse(event.body);

    if (!carrito || carrito.length === 0) {
      return { 
        statusCode: 400, 
        body: JSON.stringify({ message: 'El carrito está vacío.' })
      };
    }

    // 3. Mapear el carrito a line_items, validando precios
    const line_items = carrito.map(item => {
      const price = parseFloat(item.price);
      
      if (isNaN(price) || price <= 0) {
        // Lanza un error si el precio no es válido, que será capturado por el bloque catch
        throw new Error(`Precio inválido o faltante para el artículo: ${item.name}`);
      }
      
      return {
        price_data: {
          currency: 'mxn',
          product_data: {
            name: item.name,
            description: item.provider === 'Paquete Personalizado' ? item.description : item.provider,
          },
          // Stripe necesita el precio como entero en centavos
          unit_amount: Math.round(price * 100), 
        },
        quantity: 1,
      };
    });

    // 4. Crear la sesión de Checkout de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'oxxo'],
      line_items,
      mode: 'payment',
      // Usa las variables de entorno de Netlify para las URLs
      success_url: `${process.env.URL}/success.html`,
      cancel_url: `${process.env.URL}/cancel.html`,
    });

    // 5. Devolver la URL de redirección
    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
    
  } catch (error) {
    // 6. Manejo de Errores: Registra el error exacto en los logs de Netlify
    console.error('Error al crear la sesión de Stripe:', error.message); 
    
    // Devuelve un error 500 al frontend con un mensaje detallado para la depuración
    return { 
      statusCode: 500, 
      body: JSON.stringify({ 
        message: 'Error interno al procesar el pago. Por favor, intenta de nuevo más tarde.',
        details: error.message // Puedes quitar 'details' si ya no lo necesitas.
      }) 
    };
  }
};