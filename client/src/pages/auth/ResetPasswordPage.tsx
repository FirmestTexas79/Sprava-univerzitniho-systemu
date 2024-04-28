import { useEffect, useState } from "react";
import { Page } from "../../components/Page.tsx";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { AuthApi, ResetPasswordForm } from "../../services/server/AuthApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { z } from "zod";
import { AxiosError } from "axios";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [error, setError] = useState<string>();
  const [form, setForm] = useState<ResetPasswordForm>({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setForm({
        ...form,
        token: token,
      });
    }
  }, []);

  async function handleSubmit() {
    if (!form.newPassword || !form.confirmPassword || form.newPassword !== form.confirmPassword) return;

    const api = new AuthApi();
    try {
      await api.resetPassword(form);
      navigate("/login");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = new Map<string | number, string>();
        error.errors.forEach((err) => {
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
      <TextInput
        onChange={(value) => setForm({
          ...form,
          newPassword: value,
        })}
        label={"Nové heslo"}
        type={"password"}
        error={errors?.has("newPassword")}
        helperText={errors?.get("newPassword")}
        required />
      <TextInput
        onChange={(value) => setForm({
          ...form,
          confirmPassword: value,
        })}
        label={"Potvrzení hesla"}
        type={"password"}
        error={errors?.has("confirmPassword")}
        helperText={errors?.get("confirmPassword")}
        required />
      <Button
        disabled={!form.newPassword || !form.confirmPassword || form.newPassword !== form.confirmPassword}
        variant="contained"
        fullWidth
        onClick={handleSubmit}
      >Obnovit heslo
      </Button>
    </Page>
  );
}
