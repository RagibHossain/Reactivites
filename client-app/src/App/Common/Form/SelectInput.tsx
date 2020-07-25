import React from "react";
import { FieldRenderProps } from "react-final-form";
import { FormFieldProps, Form, Select } from "semantic-ui-react";
interface IProps extends FieldRenderProps<string>, FormFieldProps {}
const SelectInput: React.FC<IProps> = ({
  input,
  options,
  placeholder,
  width,
  meta: { touched, error },
}) => {
  return (

    <Form.Field error={touched && !!error} width={width}>
      <Select onChange={(e,data) => input.onChange(data.value)} value={input.value} options={options} placeholder={placeholder} />
    </Form.Field>

  );
};
interface IProps extends FieldRenderProps<string>, FormFieldProps {}
export default SelectInput;
