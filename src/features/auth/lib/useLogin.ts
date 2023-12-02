import { useActions } from "common/hooks";
import { authThunks } from "features/auth/model/auth-reducer";
import { FormikHelpers, useFormik } from "formik";
import { BaseResponseType } from "common/types";
import { LoginDataType } from "common/types/common.types";

type FormikErrorType = Partial<Omit<LoginDataType, "captcha">>;
export const useLogin = () => {
  const { login } = useActions(authThunks);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = "Required";
      } else if (!regex.test(values.email)) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length < 3) {
        errors.password = "Password must be more than three symbols";
      }
      return errors;
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginDataType>) => {
      login(values)
        .unwrap()
        .then((res) => {})
        .catch((err: BaseResponseType) => {
          err.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
      formik.resetForm();
    },
  });

  return { formik };
};
