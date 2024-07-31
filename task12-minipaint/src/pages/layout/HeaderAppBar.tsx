import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PaletteIcon from "@mui/icons-material/Palette";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import { CREATE_PROJECT, PROJECTS } from "../../router/paths";
import * as AuthService from "../../services/AuthService";
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

const StyledNavLink = styled(NavLink)`
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
`;

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
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <div style={{ display: "flex" }}>
            <PaletteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <LogoTypography
              noWrap
              sx={{
                display: { xs: "none", md: "flex" },
              }}
            >
              Mini-paint
            </LogoTypography>
          </div>

          <StyledNavLink
            to={PROJECTS}
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            Board
          </StyledNavLink>

          <StyledNavLink
            to={CREATE_PROJECT}
            style={({ isActive }) => {
              return {
                textDecoration: isActive ? "underline" : "none",
              };
            }}
          >
            New project
          </StyledNavLink>
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
