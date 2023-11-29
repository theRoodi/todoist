import React from "react";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppSelector } from "app/store";
import { Navigate } from "react-router-dom";
import { isLoggedInSelector } from "common/utils/app.selectors";
import { useLogin } from "features/auth/lib/useLogin";

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const Login = () => {
  const { formik } = useLogin();
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid item justifyContent={"center"}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>Use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} />
              {formik.touched && formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}

              <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps("password")} />
              {formik.touched && formik.errors.password ? (
                <div style={{ color: "red" }}>{formik.errors.password}</div>
              ) : null}
              <FormControlLabel
                label={"Remember me"}
                control={<Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")} />}
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};
