import React, { useState, useEffect } from "react";
// import products from "../../products";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { listProductDetails } from "../../actions/productAction";

function ProductDetails({ params }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <div>
        <Link to="/" className="btn btn-dark my-3">
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              {product.image && (
                <Card.Img
                  src={`https://major-project-1-backend-sf6y.onrender.com/static/images/${product.image
                    .split("/")
                    .pop()}`}
                  alt={product.name}
                />
              )}
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h5>
                    Rating:{product.rating} |No. of reviews {product.numReviews}
                  </h5>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Description: {product.description}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Price: {product.price}</h3>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card className="p-4">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Status</Col>

                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Category</Col>
                      <Col>{product.category}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Brand</Col>
                      <Col>{product.brand}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ),
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block btn-success"
                      disabled={product.countInStock === 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
