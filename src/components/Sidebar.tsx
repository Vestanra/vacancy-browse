import { useTheme } from "@emotion/react";
import { Box, Button, Modal, Popover, Typography, } from "@mui/material";
import sprite from "../images/svg/sprite.svg";
import { useNavigate } from "react-router-dom";
import { useChatsQuery, useCreateChatQuery, useDeleteChatQuery, useUpdateChatQuery } from "../hooks/useChatsQuery";
import { SidebarFooter } from "./SidebarFooter";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PopoverButtons } from "./PopoverButtons";

export const Sidebar = () => {
    const theme: any = useTheme();
    const navigate = useNavigate();
    const { data } = useChatsQuery();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isRenameAction, setIsRenameAction] = useState(false);
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(false);

    const { register, handleSubmit, setValue, getValues } = useForm();
    const { mutate: createChat } = useCreateChatQuery();
    const { mutate: updateChat } = useUpdateChatQuery();
    const { mutate: deleteChat } = useDeleteChatQuery();

    const openPopover = (event: React.MouseEvent<HTMLElement>, id: number, name: string) => {
        setAnchorEl(event.currentTarget);
        setId(id);
        setIsRenameAction(false);
        setValue("chatName", name);
        setName(name);
    };
    
    const closePopover = () => {
        setAnchorEl(null);
        setId(0);
        setValue("chatName", "");
    };

    const handleClick = () => {
        createChat({ name: "new chat" })
    };

    const handleDelete = (id: number,) => {
        // deleteChat(id);
        closePopover();
        setIsModal(true);
    }

    const handleNewChatName = () => {
        const newName = getValues("chatName");

        if (!id || !newName || newName.trim() === "" || newName === data?.find((el) => el.id === id)?.name) {
            closePopover();
            return;
        };

        const params = { name: getValues("chatName") };
        updateChat({ id, params });
        closePopover();
    };

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "320px",
            position: "relative",
            padding: "12px 16px",
            backgroundColor: theme.palette.primary.main,
            height: "auto",
            minHeight: "100vh",
            gap: "2px",
        }}>
            <Button
                component="button"
                onClick={handleClick}
                sx={{ width: '288px', marginBottom: "12px" }}>
                <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#plus`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>New chat</span>
            </Button>
            <ul>
                {data &&
                    data.map(el => <li key={el.id}
                        style={{
                            position: 'relative',
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center",
                            gap: "8px",
                            width: "288px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            marginBottom: '2px',
                        }}>
                        <div onClick={() => navigate(`chats/${el.id}`)}
                            style={{
                                width: "222px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >{el.name}</div>
                        <button
                            style={{
                                width: "36px",
                                height: "36px",
                                backgroundColor: id === el.id ? `${theme.palette.gray.G200}` : 'transparent',
                                borderRadius: '8px',
                            }}
                            onClick={(e) => openPopover(e, el.id, el.name)}><svg width={4} height={18} color={theme.palette.gray.G800}><use href={`${sprite}#ellipsis`} /></svg></button>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={closePopover}
                            sx={{
                                marginLeft: "12px",
                                marginTop: "6px",
                            }}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {isRenameAction
                                ?
                                <Box
                                    sx={{
                                        width: '288px',
                                        padding: "12px",
                                    }}>
                                    <form onSubmit={handleSubmit(handleNewChatName)}>
                                        <input {...register("chatName")}
                                            name="chatName"
                                            type="text"
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderColor: theme.palette.primary.contrastText,
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                                            <button type="button"
                                                style={{ width: "100%", height: "36px", border: `2px solid ${theme.palette.blue.BA300}`, borderRadius: '8px', }}
                                                onClick={closePopover}>Discard</button>
                                            <button type="submit"
                                                style={{ width: "100%", height: "36px", borderRadius: '8px', backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.main, }}
                                            >Save</button>
                                        </div>
                                    </form>
                                </Box>
                                :
                                <PopoverButtons setIsRenameAction={setIsRenameAction} id={id} handleDelete={handleDelete} />
                            }
                        </Popover>
                    </li>)
                }
            </ul>
            <Modal
                open={isModal}
                onClose={() => setIsModal(false)}              
                sx={{}}
            >
                <Box sx={{
                    width: "570px", backgroundColor: theme.palette.primary.main,
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    color: theme.palette.gray.G800, boxShadow: "0px 16px 40px 0px #00000029, 0px 2px 8px 0px #00000014", borderRadius: "24px", padding: "32px"
                }}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <span style={{fontSize: "24px", fontWeight: "500px", }}>Delete chat</span>
                        <button>
                            <svg width={14} height={14} color={theme.palette.gray.G800}><use href={`${sprite}#icon`} /></svg>
                        </button>
                    </div> 
                    <div style={{margin: "27px 0"}}>Are you sure you want to delete chat "{name}"?</div>
                    <div>
                        <Button sx={{height: "52px", width: "134px", marginRight: "16px"}}>No, Keep it</Button>
                        <Button
                            sx={{
                                height: "52px", width: "134px",
                                backgroundColor: theme.palette.primary.contrastText,
                                color: theme.palette.primary.main,
                                "&:hover": {backgroundColor: theme.palette.primary.contrastText },}}>Yes, Delete it</Button>
                    </div>
                </Box>
            </Modal>
            <SidebarFooter />
        </Box>
    )
};