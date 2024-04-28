import { Page } from "../../components/Page.tsx";
import { TextInput } from "../../components/inputs/TextInput.tsx";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthApi, AuthForm } from "../../services/server/AuthApi.ts";
import { useState } from "react";
import "../../styles/LoginPage.css"
import { z } from "zod";
import { AxiosError } from "axios";

export function ForgotPasswordPage() {
  const [form, setForm] = useState<AuthForm>();
  const [errors, setErrors] = useState<Map<string | number, string>>();
  const [success, setSuccess] = useState(false);
  const [info, setInfo] = useState<string>();
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!form?.email) return;

    const api = new AuthApi();
    try {
      const r = await api.forgotPassword(form);
      console.log(r);
      setSuccess(true);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = new Map<string | number, string>();
        error.errors.forEach((err) => {
          const field = err.path[0];
          fieldErrors.set(field, err.message);
        });
        setErrors(fieldErrors);
      } else if (error instanceof AxiosError) {
        setInfo(error.response?.data.message);
      }
    }
  }

  return (
      <Page disableNavbar ignoreAuth>
        <section className="container">
          <div className="container">
            <div className="login-container">
              <div className="circle circle-three"></div>
              <div className="form-container">
                <h1 className="opacity">Obnova hesla</h1>
                {!success ? (<>
                  <TextInput
                      value={form?.email}
                      onChange={(value) => {
                        setForm({ ...form, email: value });
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
              </div>
              <div className="circle circle-four"></div>
            </div>
          </div>
          <div className="theme-btn-container"></div>
        </section>
      </Page>
  );
}
