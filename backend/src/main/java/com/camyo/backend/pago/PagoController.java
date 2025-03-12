package com.camyo.backend.pago;

import com.camyo.backend.usuario.Usuario;
import com.camyo.backend.usuario.UsuarioService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.PaymentIntentCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pago")
@CrossOrigin(origins = "http://localhost:8081")
@Tag(name = "Pagos", description = "API para gestión de pagos")
public class PagoController {

    @Autowired
    private UsuarioService usuarioService;

    String STRIPE_API_KEY = System.getenv().get("STRIPE_API_KEY");

    @PostMapping("/integrated")
    String integratedCheckout(@RequestBody Pago pago) throws StripeException {
        Stripe.apiKey = STRIPE_API_KEY;
        String clientBaseURL = "http://localhost:8081";

        // Start by finding an existing customer record from Stripe or creating a new one if needed
        Usuario cliente = usuarioService.obtenerUsuarioActual();
        Customer clienteStripe = CustomerUtil.findOrCreateCustomer(cliente.getEmail(), cliente.getNombre());

       // Create a PaymentIntent and send its client secret to the client
        PaymentIntentCreateParams params =
            PaymentIntentCreateParams.builder()
                .setAmount(1L)
                .setCurrency("eur")
                .setCustomer(clienteStripe.getId())
                .setAutomaticPaymentMethods(
                    PaymentIntentCreateParams.AutomaticPaymentMethods
                        .builder()
                        .setEnabled(true)
                        .build()
                )
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);

        // Send the client secret from the payment intent to the client
        return paymentIntent.getClientSecret();

    }

/* 
    .setRecurring(
      PriceCreateParams.Recurring.builder()
        .setInterval(PriceCreateParams.Recurring.Interval.MONTH)
        .build()
    )*/
}
