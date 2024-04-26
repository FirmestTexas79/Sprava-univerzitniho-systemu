import { useEffect, useState } from "react";
import { Page } from "../components/Page.tsx";
import { TextInput } from "../components/inputs/TextInput.tsx";
import { AuthApi, ResetPasswordForm } from "../services/AuthApi.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [form, setForm] = useState<ResetPasswordForm>({ newPassword: "", confirmPassword: "", token: "" });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else
      setForm({ ...form, token: token });
  }, []);

  async function handleSubmit() {
    if (!form.newPassword || !form.confirmPassword || form.newPassword !== form.confirmPassword) return;

    const api = new AuthApi();
    try {
      await api.resetPassword(form);
      navigate("/login");
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
    <Page ignoreAuth>
      <h1>Obnova hesla</h1>
      <TextInput
        onChange={(value) => setForm({ ...form, newPassword: value })}
        label={"Nové heslo"}
        type={"password"}
        error={errors?.has("newPassword")}
        helperText={errors?.get("newPassword")}
        required />
      <TextInput
        onChange={(value) => setForm({ ...form, confirmPassword: value })}
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
