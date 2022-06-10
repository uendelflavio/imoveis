import React, { Fragment } from "react";
import {  useHistory } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik";
import * as Yup from "yup";
import { login,setUser,setPass } from "../../utils/auth";
import { toast } from 'react-toastify';
import TextError from "../text-error/text-error";
import LoginService from '../../services/LoginService'
const FormLogin = () => {
    let history = useHistory();
    
    const onSubmit = async (values, actions) => {                    
        if (!values.email || !values.password) {
            toast.warning('Preencha e-mail e senha para continuar!');
        } else {
            try {                
                const response = await LoginService.post_new(values);
                login(response.data.access_token);               
                setUser(values.email);
                setPass(values.password)
                history.push("/app");
            } catch (error) {
                if (error.response.status === 401) toast.error('Houve um problema com autenticação, verifique suas credenciais e tente novamente.');                    
                if (error.response.status >= 500) toast.error('Houve falha de comunicação com o servidor, tente autenticar novamente.');                    
            }
        }
        actions.setSubmitting(false);
        actions.resetForm({
            values: {
            email: '',
            password: '',
            },
        });    
    };    
    const validationSchema = Yup.object({  
        email: Yup.string().email('O email está inválido!').required("O email é obrigatório!"),
        password: Yup.string().min(6,'É necessario no mínimo 6 caracteres').required("A senha é obrigatória!"),
    });
  return (
    <Fragment>
        <Formik
            enableReinitialize={true}
            initialValues={{                  
                email: '',
                password: '',
            }}              
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form> 
                  <div className="form-floating mb-20px">                   
                   <Field type="text" name="email" id="email" placeholder="Email" >
                    {({ field, meta: { touched, error } }) => (
                        <input                                  
                        className={
                            touched && error
                                ? "form-control is-invalid fs-13px h-45px"
                                : "form-control is-valid fs-13px h-45px"
                        }
                        {...field}
                        autoFocus={true}
                        />
                    )}
                    </Field>
                      <label htmlFor="email" className="d-flex align-items-center py-0">Email</label>
                      <ErrorMessage name="email" component={TextError} />
                </div>
                  <div className="form-floating mb-20px">                    
                    <Field type="password" name="password" id="password" placeholder="Senha" >
                    {({ field, meta: { touched, error } }) => (
                        <input    
                        type="password"          
                        className={
                            touched && error
                            ? "form-control is-invalid fs-13px h-45px"
                            : "form-control is-valid fs-13px h-45px"
                        }
                        {...field}                 
                        />
                    )}
                    </Field>
                      <label htmlFor="password" className="d-flex align-items-center py-0">Password</label>                    
                      <ErrorMessage name="password" component={TextError} />
                </div>
                <div className="form-check mb-20px">
                    <input className="form-check-input" type="checkbox" value="" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                        Memorizar Usuario e Senha
                    </label>
                </div>
                <div className="login-buttons">
                    <button type="submit" onSubmit={onSubmit} className="btn h-45px btn-success d-block w-100 btn-lg">Autenticar</button>
                </div>
            </Form>
        </Formik>
    </Fragment>
  );
};

export default FormLogin;
