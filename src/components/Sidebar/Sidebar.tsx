import { useTheme } from "@emotion/react";
import { Box, Button, Popover, } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useChatsQuery, useCreateChatQuery, useDeleteChatQuery, useUpdateChatQuery } from "../../hooks/useChatsQuery";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PopoverButtons } from "./PopoverButtons";
import { ModalDelete } from "./ModalDelete";
import { SidebarFooter } from "./SidebarFooter";
import sprite from "../../images/svg/sprite.svg";

export const Sidebar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isRenameAction, setIsRenameAction] = useState(false);
    const [id, setId] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(false);

    const theme: any = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const { data } = useChatsQuery();

    const { register, handleSubmit, setValue, getValues } = useForm();
    const { mutate: createChat } = useCreateChatQuery();
    const { mutate: updateChat } = useUpdateChatQuery();
    const { mutate: deleteChat } = useDeleteChatQuery();

    const { id: currentChat } = useParams<{ id: string }>();
    const isChatPage = location.pathname.startsWith('/chats/');

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

    const handleCreateChat = () => {
        createChat({ name: "new chat" })
    };

    const handleOpenModal = () => {
        closePopover();
        setIsModal(true);
        setId(id);
    };

    const handleDelete = () => {
        deleteChat(id);
        setIsModal(false);
    };

    const handleNewChatName = () => {
        const newName = getValues("chatName");

        if (!id || !newName || newName.trim() === "" || newName === data?.find((el: any) => el.id === id)?.name) {
            closePopover();
            return;
        };

        const params = { name: getValues("chatName") };
        updateChat({ id, params });
        closePopover();
    };

    return (
        <Box sx={{
            display: "flex", gap: "2px",
            alignItems: "center",
            flexDirection: "column",
            width: "320px", minHeight: "100vh", height: "auto",
            position: "relative",
            padding: "12px 16px",
            backgroundColor: theme.palette.primary.main,
        }}>
            <Button
                component="button"
                onClick={handleCreateChat}
                sx={{ width: '288px', marginBottom: "12px" }}>
                <svg width={24} height={24} color={theme.palette.gray.G800}><use href={`${sprite}#plus`} /></svg>
                <span style={{ fontSize: "16px", fontWeight: "500", marginLeft: "8px" }}>New chat</span>
            </Button>
            <ul>
                {data &&
                    data.map((el: any) => <li key={el.id}
                        style={{
                            position: 'relative',
                            display: "flex", justifyContent: "space-between",
                            alignItems: "center",
                            width: "288px", gap: "8px",
                            padding: "6px 12px", marginBottom: '2px',
                            cursor: "pointer",
                            borderRadius: "8px",
                            backgroundColor: (isChatPage && (currentChat === el.id.toString())) ? `${theme.palette.gray.G200}` : 'transparent',
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
                                                width: "100%", padding: "12px",
                                                borderColor: theme.palette.primary.contrastText,
                                                borderRadius: "8px",
                                                fontSize: "16px"
                                            }}
                                        />
                                        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                                            <Button type="button"
                                                sx={{ height: "36px", width: "100%" }}
                                                onClick={closePopover}>Discard</Button>
                                            <Button type="submit"
                                                sx={{
                                                    height: "36px", width: "100%", backgroundColor: theme.palette.primary.contrastText, color: theme.palette.primary.main,
                                                    "&:hover": { backgroundColor: theme.palette.primary.contrastText },
                                                }}
                                            >Save</Button>
                                        </div>
                                    </form>
                                </Box>
                                :
                                <PopoverButtons setIsRenameAction={setIsRenameAction} id={id} handleOpenModal={handleOpenModal} />
                            }
                        </Popover>
                    </li>)
                }
            </ul>
            <ModalDelete
                isModal={isModal}
                setIsModal={setIsModal}
                name={name}
                handleDelete={handleDelete}
            />
            <SidebarFooter />
        </Box>
    )
};