import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { signup } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { useNavigate, useLocation } from "react-router-dom";

function SignupScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState("");
  const [show, changeshow] = useState("fa fa-eye-slash");

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;
  const handleClose = () => setMessage(false);

  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termsAccepted: false,
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    termsAccepted: false,
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues({
      ...formValues,
      [name]: newValue,
    });
    validateField(name, newValue);
  };

  const getValidationClass = (name) => {
    if (formValues[name] === "") return "";
    return formErrors[name] ? "is-invalid" : "is-vaild";
  };

  const clearForm = () => {
    setFormValues({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      termsAccepted: false,
    });
  };

  const validateField = (name, value) => {
    let errorMessage = null;
    console.log(name, value);
    switch (name) {
      case "firstname":
      case "lastname":
        if (!value) {
          errorMessage = "This feild is required..";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errorMessage = "Invalid email format...";
        }
        break;

      case "password":
        const minLength = 6;
        const passwordRegex =
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[_$@*!])[A-Za-z0-9_$@*!]{6,}$/;
        if (value.length < minLength || !passwordRegex.test(value)) {
          errorMessage =
            "Password must include atleast [1-9][a-z][A-Z][_$@*!...] & 6 characters";
        }

        break;

      case "confirmpassword":
        if (value !== formValues.password) {
          errorMessage = "Password do not match..";
        }

        break;

      case "termsAccepted":
        if (!value) {
          errorMessage = "You must accept the term and conditions..";
        }
        break;

      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: errorMessage,
    });
  };

  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every(
        (value) => value !== "" && value !== false,
      )
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      signup(
        formValues.firstname,
        formValues.lastname,
        formValues.email,
        formValues.password,
      ),
    );
    clearForm();
    // setMessage("Signup is Success");
    // navigate("/login");
  };

  useEffect(() => {
    if (userInfo) {
      setMessage(userInfo["details"]);

      setTimeout(() => {
        navigate(`/login?redirect=${redirect}`);
      }, 1500);
    }
    localStorage.removeItem("userInfo");
  }, [userInfo, navigate, redirect]);

  return (
    <>
      <Container>
        <Row>
          <Col md={3}></Col>

          {loading ? (
            <Loader />
          ) : (
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                <br />

                <h3 className="text-center">Signup Here</h3>
                {message && (
                  <Message variant="success" onClose={handleClose}>
                    {message}
                  </Message>
                )}
                {error && (
                  <Message variant="danger" onClose={handleClose}>
                    {error}
                  </Message>
                )}
                <Form.Group controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    name="firstname"
                    value={formValues.firstname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.firstname}
                    isValid={
                      formValues.firstname !== "" && !formErrors.firstname
                    }
                    className={getValidationClass("firstname")}
                  ></Form.Control>

                  <Form.Control.Feedback type="invalid">
                    {formErrors.firstname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="lastname" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    name="lastname"
                    value={formValues.lastname}
                    onChange={handleChange}
                    isInvalid={!!formErrors.lastname}
                    isValid={formValues.lastname !== "" && !formErrors.lastname}
                    className={getValidationClass("lastname")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastname}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    isInvalid={!!formErrors.email}
                    isValid={formValues.email !== "" && !formErrors.email}
                    // className={getValidationClass("email")}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="pass1" className="mb-3">
                  <Form.Label>
                    {" "}
                    <span>
                      <i className={show ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>{" "}
                    Password
                  </Form.Label>

                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox
                      checked={show}
                      onChange={() => changeshow(!show)}
                    />
                    <Form.Control
                      required
                      type={show ? "text" : "password"}
                      name="password"
                      // id="pass1"
                      value={formValues.password}
                      placeholder="Enter your Password"
                      onChange={handleChange}
                      isInvalid={!!formErrors.password}
                      className={getValidationClass("password")}
                    />

                    <Form.Control.Feedback type="invalid">
                      {formErrors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="pass2" className="mb-3">
                  <Form.Label>
                    <span>
                      <i className={show ? "fa fa-eye" : "fa fa-eye-slash"}></i>
                    </span>{" "}
                    Confirm Password
                  </Form.Label>

                  <InputGroup className="mb-3">
                    <InputGroup.Checkbox
                      checked={show}
                      onChange={() => changeshow(!show)}
                    />
                    <Form.Control
                      required
                      type={show ? "text" : "password"}
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      value={formValues.confirmpassword}
                      onChange={handleChange}
                      isInvalid={!!formErrors.confirmpassword}
                      className={getValidationClass("confirmpassword")}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.confirmpassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    name="termsAccepted"
                    checked={formValues.termsAccepted}
                    onChange={handleChange}
                    isInvalid={!!formErrors.termsAccepted}
                    className={getValidationClass("termsAccepted")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.termsAccepted}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  className="mt-3"
                  variant="success"
                  type="submit"
                  disabled={!isFormValid()}
                >
                  Signup
                </Button>
              </Form>
            </Col>
          )}
          <Col md={3}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupScreen;
