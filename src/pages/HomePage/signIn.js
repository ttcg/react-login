import React from 'react'
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage
} from 'formik';
import {
    Alert,
    Button,
    FormGroup,
    FormLabel
} from 'react-bootstrap';
import * as yup from 'yup';

import { AuthService } from '../../services'

const SignIn = ({
    onSubmit,
    error,
    isLoading
}) => {

    return (        
        <>
            <Formik
                initialValues={{                    
                    email: 'ttcg@gmail.com',
                    password: 'ttcgreact',
                    environment: 'test'
                }}
                validationSchema={yup.object().shape({
                    email: yup.string().email()
                        .required("Required"),
                    password: yup
                        .string()
                        .required("Required")
                })}
                onSubmit={(values) => {
                    AuthService.setEnvironment(values.environment);
                    onSubmit(values);
                }}
                render={({
                    submitForm }) => (

                        <FormikForm className="form-signin">
                            <h1 className="h3 mb-3 font-weight-normal" style={{ textAlign: 'center' }}>Please sign in</h1>
                            {error &&
                                <Alert variant="danger">
                                    {error.errorMessage}
                                </Alert>
                            }
                            <FormGroup controlId="email">
                                <FormLabel>Email address</FormLabel>
                                <Field
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email address" />
                                <ErrorMessage name="email" className="text-danger" component="p" />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormLabel>Password</FormLabel>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    placeholder="Password" />
                                <ErrorMessage name="password" className="text-danger" component="p" />
                            </FormGroup>
                            <FormGroup id="environment">
                                <FormLabel>Environment</FormLabel>
                                <Field
                                    component="select"
                                    id="environment"
                                    name="environment"
                                    className="form-control">
                                    <option value="test">Test</option>
                                    <option value="staging">Staging</option>
                                    <option value="preview">Preview</option>
                                </Field>
                            </FormGroup>

                            <Button color="primary" className="btn-block" onClick={submitForm} type="button" disabled={isLoading}>Sign in</Button>
                        </FormikForm>)
                }
            />
        </>
    )
}

export default SignIn;