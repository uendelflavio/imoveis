import React from "react";
import { useHistory } from "react-router-dom";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import AuthService from "services/auth-service";
// import TokenService from "services/token-service";

const FormLogin = () => {
  const history = useHistory();

  // React.useEffect(() => { TokenService.removeToken() })

  const onSubmit = async (values) => {
    if (!values.email || !values.password) {
      toast.warning("Preencha e-mail e senha para continuar!");
    } else {
      try {
        await AuthService.login(values.email, values.password).then(() => {
          history.push("/app");
        });
      } catch (error) {
        if (error.message === "Invalid token specified") history.push("/login");
      }
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("O email está inválido!")
      .required("O email é obrigatório!"),
    password: Yup.string()
      .min(6, "É necessario no mínimo 6 caracteres")
      .required("A senha é obrigatória!"),
  });
  return (
    <React.Fragment>
      <Formik
        enableReinitialize={true}
        initialValues={{
          email: "uendel.flavio@gmail.com",
          password: "123456",
        }}
        // initialValues={{
        //     email: '',
        //     password: '',
        // }}
        validationSchema={validationSchema}
        onSubmit={(values) => onSubmit(values)}
      >
        <Form>
          <div className="form-floating mb-20px">
            <Field type="text" name="email" id="email" placeholder="Email">
              {({ field, meta: { touched, error } }) => (
                <input
                  className={touched && error
                    ? "form-control is-invalid fs-13px h-45px"
                    : "form-control is-valid fs-13px h-45px"}
                  {...field}
                  autoFocus={true}
                />
              )}
            </Field>
            <label htmlFor="email" className="d-flex align-items-center py-0">
              Email
            </label>
            <ErrorMessage name="email" component="div" />
          </div>
          <div className="form-floating mb-20px">
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
            >
              {({ field, meta: { touched, error } }) => (
                <input
                  type="password"
                  className={touched && error
                    ? "form-control is-invalid fs-13px h-45px"
                    : "form-control is-valid fs-13px h-45px"}
                  {...field}
                />
              )}
            </Field>
            <label
              htmlFor="password"
              className="d-flex align-items-center py-0"
            >
              Password
            </label>
            <ErrorMessage name="password" component="div" />
          </div>
          <div className="form-check mb-20px">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label className="form-check-label" htmlFor="rememberMe">
              Memorizar Usuario e Senha
            </label>
          </div>
          <div className="login-buttons">
            <button
              type="submit"
              onSubmit={onSubmit}
              className="btn h-45px btn-success d-block w-100 btn-lg"
            >
              Autenticar
            </button>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
};

export default FormLogin;
