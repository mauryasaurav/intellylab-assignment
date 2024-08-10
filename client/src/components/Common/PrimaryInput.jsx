import { Field } from "formik";
import { validateType } from "../../utils/validations";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";


const PrimaryInput = ({
  label,
  type = "text",
  placeholder,
  name = "name",
  disabled = false,
  validate = validateType,
  ...props
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[`${name}`] && form.touched[`${name}`]}
          mr={"5px"}
        >
          <FormLabel fontSize="md" {...props.style}>
            {label}
          </FormLabel>
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
          <FormErrorMessage>{form.errors[`${name}`]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default PrimaryInput;
