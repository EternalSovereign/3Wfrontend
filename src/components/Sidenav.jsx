//eslint-disable-next-line
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../redux/slices/sideToggle";
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": openedMixin(theme),
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": closedMixin(theme),
            },
        },
    ],
}));

export default function Sidenav() {
    const open = useSelector((state) => state.sideToggle);
    const role = useSelector((state) => state.user.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const handleDrawerOpen = () => {
        dispatch(toggle());
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={() => handleDrawerOpen()}>
                        {theme.direction === "rtl" || !open ? (
                            <MenuIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <List>
                    <ListItem
                        key={"My Accounts"}
                        disablePadding
                        sx={{ display: "block" }}
                        onClick={() => navigate("/home")}
                    >
                        <ListItemButton
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                          justifyContent: "initial",
                                      }
                                    : {
                                          justifyContent: "center",
                                      },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: "center",
                                    },
                                    open
                                        ? {
                                              ml: 3,
                                              mr: 2,
                                          }
                                        : {
                                              mr: "auto",
                                          },
                                ]}
                            >
                                <AccountBalanceOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"My Accounts"}
                                sx={[
                                    open
                                        ? {
                                              opacity: 1,
                                          }
                                        : {
                                              opacity: 0,
                                          },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                    {role === "admin" ? (
                        <ListItem
                            key={"Users"}
                            disablePadding
                            sx={{ display: "block" }}
                            onClick={() => navigate("/users")}
                        >
                            <ListItemButton
                                sx={[
                                    {
                                        minHeight: 48,
                                        px: 2.5,
                                    },
                                    open
                                        ? {
                                              justifyContent: "initial",
                                          }
                                        : {
                                              justifyContent: "center",
                                          },
                                ]}
                            >
                                <ListItemIcon
                                    sx={[
                                        {
                                            minWidth: 0,
                                            justifyContent: "center",
                                        },
                                        open
                                            ? {
                                                  ml: 3,
                                                  mr: 2,
                                              }
                                            : {
                                                  mr: "auto",
                                              },
                                    ]}
                                >
                                    <GroupOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={"Users"}
                                    sx={[
                                        open
                                            ? {
                                                  opacity: 1,
                                              }
                                            : {
                                                  opacity: 0,
                                              },
                                    ]}
                                />
                            </ListItemButton>
                        </ListItem>
                    ) : null}
                </List>
            </Drawer>
        </Box>
    );
}
