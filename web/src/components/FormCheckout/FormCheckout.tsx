import { Box, Button, TextField } from "@mui/material"
import { Form, FormikProps, withFormik } from "formik"
import * as Yup from "yup";

export type BookingSubmit = {
    name: string
}

export type FormCheckoutProps = {
    bookingSubmit: Partial<BookingSubmit>
    onSave: (name: string) => void
}

const bookingSubmitSchema = Yup.object().shape({
    name: Yup.string().required("Obrigatório informar um Nome!"),
});


const InnerForm = (props: FormCheckoutProps & FormikProps<BookingSubmit>) => {
    const {
        values,
        handleChange,
        errors,
        touched
    } = props;

    return <>
        <Form>
            <Box display="flex" flexDirection="column" gap={2} >
                <TextField
                    id="name_FormCheckout"
                    name='name'
                    label="Nome"
                    placeholder='Responsável pela reserva'
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name?.length > 0 && touched.name}
                    helperText={touched.name ? errors.name : ''}
                />
                <Button type='submit' color='success' variant='contained' sx={{ color: 'inherit' }}>Confirmar</Button>
            </Box>
        </Form>
    </>
}

export const FormCheckout = withFormik<FormCheckoutProps, BookingSubmit>({
    mapPropsToValues: (props) => {
        return {
            name: props.bookingSubmit.name
        }
    },
    validationSchema: bookingSubmitSchema,
    enableReinitialize: true,
    handleSubmit: (values, formikBag) => {
        formikBag.props.onSave(values.name)
    },
})(InnerForm);