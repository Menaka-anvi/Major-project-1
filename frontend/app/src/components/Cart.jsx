import React from "react";
import { Container, Card, Button } from "react-bootstrap";

export default function Cart({ cart, removeFromCart,increaseQuantity, decreaseQuantity }) {
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

   return (
    <Container className="my-4">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product) => (
            <Card
              className="mb-3"
              key={product.id}
            >
              <Card.Body>
                <Card.Title>
                  {product.name}
                </Card.Title>

                <Card.Text>
                  Price: ₹{product.price}
                </Card.Text>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <Button
                    variant="secondary"
                    onClick={() =>
                      decreaseQuantity(product.id)
                    }
                  >
                    -
                  </Button>

                  <span>
                    Quantity: {product.quantity}
                  </span>

                  <Button
                    variant="secondary"
                    onClick={() =>
                      increaseQuantity(product.id)
                    }
                  >
                    +
                  </Button>
                </div>

                <Card.Text>
                  Subtotal: ₹
                  {product.price *
                    product.quantity}
                </Card.Text>

                <Button
                  variant="danger"
                  onClick={() =>
                    removeFromCart(product.id)
                  }
                >
                  Remove
                </Button>
              </Card.Body>
            </Card>
          ))}

          <h3 className="text-end">
            Total: ₹{totalPrice}
          </h3>
        </>
      )}
    </Container>
  );
}