import React, { useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Field } from "formik";

const PrimaryPassword = ({ name, label, placeholder, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Field name={name}>
      {({ field, form }) => (
        <FormControl
          isInvalid={form.errors[`${name}`] && form.touched[`${name}`]}
          mr={"5px"}
        >
          <FormLabel htmlFor={name} {...props.style}>{label}</FormLabel>
          <InputGroup>
            <Input
              {...field}
              id={name}
              name={name}
              placeholder={placeholder}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement
              onClick={toggleShowPassword}
              children={
                showPassword ? (
                  <ViewIcon cursor="pointer" />
                ) : (
                  <ViewOffIcon cursor="pointer" />
                )
              }
              cursor="pointer"
            />
          </InputGroup>
          <FormErrorMessage>{form.errors[`${name}`]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default PrimaryPassword;
