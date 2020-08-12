import React from "react";
import { FormFieldProps, Form } from "semantic-ui-react";
import { FieldRenderProps } from "react-final-form";
import ErrorMessage from "./ErrorMessage";
interface IProps
  extends FieldRenderProps<string, HTMLElement>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  type,
  placeholder,
  width,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} type={type} width={width}>
      <input {...input} placeholder={placeholder} />
      {touched && error && (
        <ErrorMessage text={error} >
          {error}
        </ErrorMessage>
      )}
    </Form.Field>
  );
};

export default TextInput;
