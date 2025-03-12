package com.camyo.backend.pago;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Product;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem.PriceData;

import io.swagger.v3.oas.annotations.tags.Tag;

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
    String STRIPE_API_KEY = System.getenv().get("STRIPE_API_KEY");

    @PostMapping("/hosted")
    String hostedCheckout(@RequestBody Pago pago) throws StripeException {
      return "Hello World!";
    }
}
