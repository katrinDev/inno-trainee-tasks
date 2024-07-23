import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PaletteIcon from "@mui/icons-material/Palette";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { Toolbar, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { PROJECTS } from "../../router/paths";
import AuthService from "../../services/AuthService";
import { setSnackbarProps } from "../../state/snackbar/snackbarSlice";

const ToolbarContainer = styled(Container)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(3),
  fontWeight: 500,
  color: "inherit",
}));

export default function HeaderAppBar() {
  const fullName = useSelector((state: RootState) => state.authInfo.fullName);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = async () => {
    const { error } = await AuthService.signOut();

    if (error) {
      dispatch(setSnackbarProps({ severity: "error", text: error.message }));
    }
  };

  return (
    <AppBar position="static">
      <ToolbarContainer maxWidth="lg">
        <Toolbar disableGutters>
          <PaletteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <LogoTypography
            noWrap
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            Mini-paint
          </LogoTypography>

          <Button
            component={Link}
            to={PROJECTS}
            sx={{ color: "white", display: "block" }}
          >
            Board
          </Button>
        </Toolbar>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Typography>{fullName}</Typography>
          <IconButton onClick={handleSignOut} sx={{ p: 0 }}>
            <LogoutRoundedIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </ToolbarContainer>
    </AppBar>
  );
}
