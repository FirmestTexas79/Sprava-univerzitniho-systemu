import React from "react";
import { useAuth } from "../hooks/useAuth.tsx";
import { Box, Container, Typography } from "@mui/material";

export default function UserPage() {
	const { user } = useAuth();

	return (
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
						<strong>Name:</strong> {user?.firstname} {user?.lastname}
					</Typography>
				</Box>
				<Box my={1}>
					<Typography variant="body1">
						<strong>Email:</strong> {user?.email}
					</Typography>
				</Box>
				<Box my={1}>
					<Typography variant="body1">
						<strong>Phone:</strong> {user?.phone}
					</Typography>
				</Box>
				<Box my={1}>
					<Typography variant="body1">
						<strong>Title:</strong> {user?.titleBefore}
					</Typography>
				</Box>
			</Box>
		</Container>
	);
}
