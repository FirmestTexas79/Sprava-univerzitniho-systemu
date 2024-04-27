import { Page } from "../components/Page.tsx";
import { TextInput } from "../components/inputs/TextInput.tsx";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthApi, AuthForm } from "../services/AuthApi.ts";
import { useState } from "react";
import { z } from "zod";
import { AxiosError } from "axios";

export function ForgotPasswordPage() {
  const [form, setForm] = useState<AuthForm>();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!form?.email) return;

    const api = new AuthApi();
    try {
      await api.forgotPassword(form);
      setSuccess(true);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = new Map<string | number, string>();
        error.errors.forEach((err: { path: any[]; message: string; }) => {
          const field = err.path[0];
          fieldErrors.set(field, err.message);
        });
        setErrors(fieldErrors);
      } else if (error instanceof AxiosError) {
        setError(error.response?.data.message);
      }
    }
  }

  return (
    <Page ignoreAuth disableNavbar>
      <h1>Obnova hesla</h1>
      {error && (<Alert severity="error">{error}</Alert>)}
      {!success ? (<>
        <TextInput
          value={form?.email}
          onChange={(value) => {
            setForm({
              ...form,
              email: value,
            });
          }}
          label={"E-mail"}
          type={"email"}
          error={errors?.has("email")}
          helperText={errors?.get("email")}
          required
        />
        <Button
          disabled={!form?.email}
          variant="contained"
          fullWidth
          onClick={handleSubmit}
        >Odeslat odkaz na obnovu hesla
        </Button></>) : <h2>Odkaz na obnovu hesla byl odeslán</h2>
      }
      <Button onClick={() => navigate("/login")}>Přihlásit se</Button>
    </Page>
  );
}
