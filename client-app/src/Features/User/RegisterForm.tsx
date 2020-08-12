import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button,Header } from "semantic-ui-react";
import TextInput from "../../App/Common/Form/TextInput";
import { RootStoreContext } from "../../App/Stores/rootStore";
import { IUserFormValues } from "../../Models/User";
import { combineValidators, isRequired } from "revalidate";
import { FORM_ERROR } from "final-form";
import ErrorMessage from "../../App/Common/Form/ErrorMessage";

const validate = combineValidators({
  email: isRequired("email"),
  displayName: isRequired("display name"),
  username: isRequired("username"),
  password: isRequired("password"),
});
const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({ [FORM_ERROR]: error }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        invalid,
        pristine,
        submitError,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header as="h2" textAlign="center" color="blue">
            Sign Up to Reactivities
          </Header>
          <Field name="displayName" component={TextInput} placeholder="Display name" />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage
              error={submitError}
              
            />
          )}
          <br />
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            fluid
            content="Register"
            color="blue"
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
