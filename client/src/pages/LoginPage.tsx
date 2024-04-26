import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.tsx";
import { AuthApi, LoginForm } from "../services/AuthApi.ts";
import { Page } from "../components/Page.tsx";
import { TextInput } from "../components/inputs/TextInput.tsx";
import { Button, FormHelperText } from "@mui/material";


export default function LoginPage() {
  const { login, user } = useAuth();
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [error, setError] = useState<{ message?: string }>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    navigate("/");

  }, [user]);

  async function handleSubmit() {
    const api = new AuthApi();
    try {
      const { data, message, error } = await api.login(loginForm);
      if (error) setError({ message: message });
      data && login(data);
      // @ts-ignore
    } catch (error: any) {
      const fieldErrors = new Map<string | number, string>();
      error.forEach((err: { path: any[]; message: string; }) => {
        const field = err.path[0];
        fieldErrors.set(field, err.message);
      });
      setErrors(fieldErrors);
    }
  }


  return (
    <Page>
      <h1>Přihlášení</h1>
      <FormHelperText error={!!error.message}>{error.message}</FormHelperText>
      <TextInput
        label={"Email"}
        type={"email"}
        error={errors?.has("email")}
        helperText={errors?.get("email")}
        value={loginForm.email}
        onChange={(value) => setLoginForm({ ...loginForm, email: value })}
      />
      <TextInput
        label={"Heslo"}
        type={"password"}
        error={errors?.has("password")}
        helperText={errors?.get("password")}
        value={loginForm.password}
        onChange={(value) => setLoginForm({ ...loginForm, password: value })}
      />
      <Button
        disabled={!loginForm.email || !loginForm.password}
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >Přihlásit
      </Button>
      <Button onClick={() => navigate("/forgot-password")}>Zapomenuté heslo</Button>
    </Page>
  );
}
