import { Field } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Checkbox } from "@chakra-ui/react";

const PrimaryCheckbox = ({ label, name, disabled = false, ...props }) => {
    return (
        <Field name={name}>
            {({ field, form }) => (
                <FormControl
                    isInvalid={form.errors[name] && form.touched[name]}
                >
                    <FormLabel>
                        <Checkbox
                            disabled={disabled}
                            {...field}
                            isChecked={field.value}
                            {...props}
                        >
                            {label}
                        </Checkbox>
                    </FormLabel>
                    <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
                </FormControl>
            )}
        </Field>
    );
};

export default PrimaryCheckbox;
