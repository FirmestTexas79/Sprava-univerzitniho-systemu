import { useAuth } from "../hooks/useAuth.tsx";
import { Box, Container, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { UserApi } from "../services/UserApi.ts";
import { Page } from "../components/Page.tsx";

export default function UserPage() {
  const { id } = useParams();
  const {
    user,
    token,
  } = useAuth();
  const [currentUser, setCurrentUser] = useState<User>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    if (id && id !== user?.id) {
      const api = new UserApi(token.token);
      api.findOne(id).then((value) => setCurrentUser(value.data)).catch(() => navigate("/"));
    } else {
      user && setCurrentUser(user);
    }
  }, []);

  return (<Page>
      <Container maxWidth="sm">
        <Box
          sx={{
            border: "1px solid #ccc",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "20px",
            textAlign: "center",
            my: 4,
          }}
        >
          <Typography variant="h2" color="primary" gutterBottom>
            Personal Information
          </Typography>
          <Box my={1}>
            <Typography variant="body1">
              <strong>Name:</strong> {currentUser?.firstname} {currentUser?.lastname}
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body1">
              <strong>Email:</strong> {currentUser?.email}
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body1">
              <strong>Phone:</strong> {currentUser?.phone}
            </Typography>
          </Box>
          <Box my={1}>
            <Typography variant="body1">
              <strong>Title:</strong> {currentUser?.titleBefore}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}
