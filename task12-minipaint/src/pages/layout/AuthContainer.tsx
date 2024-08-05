import { Container } from "@mui/material";

export default function AuthContainer({ children }: React.PropsWithChildren) {
  return (
    <Container
      component="main"
      sx={{
        minHeight: "100dvh",
        overflow: "auto",
      }}
      maxWidth="xs"
    >
      {children}
    </Container>
  );
}
