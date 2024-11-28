import { Backdrop, Box, Button, Modal, useTheme } from "@mui/material";
import sprite from "../../images/svg/sprite.svg";
import { ModalDeleteProps } from "../../types/types";

export const ModalDelete: React.FC<ModalDeleteProps> = ({ isModal, setIsModal, name, handleDelete }) => {
    const theme: any = useTheme();

    const CustomBackdrop = (props: any) => (
        <Backdrop {...props} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
    );

    return (
        <Modal
            open={isModal}
            onClose={() => setIsModal(false)}
            slots={{ backdrop: CustomBackdrop }}
        >
            <Box sx={{
                width: "570px", backgroundColor: theme.palette.primary.main,
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                color: theme.palette.gray.G800, boxShadow: "0px 8px 40px 0px #00000029, 0px 2px 4px 0px #00000014", borderRadius: "24px", padding: "32px"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "24px", fontWeight: "500px", }}>Delete chat</span>
                    <button onClick={() => setIsModal(false)}>
                        <svg width={14} height={14} color={theme.palette.gray.G800}><use href={`${sprite}#icon`} /></svg>
                    </button>
                </div>
                <div style={{ margin: "27px 0", width: "1005", overflow: "hidden", textOverflow: "ellipsis",}}>Are you sure you want to delete chat "{name}"?</div>
                <div>
                    <Button onClick={() => setIsModal(false)}
                        sx={{ height: "52px", width: "134px", marginRight: "16px" }}>No, Keep it</Button>
                    <Button onClick={handleDelete}
                        sx={{
                            height: "52px", width: "134px",
                            backgroundColor: theme.palette.primary.contrastText,
                            color: theme.palette.primary.main,
                            "&:hover": { backgroundColor: theme.palette.primary.contrastText },
                        }}>Yes, Delete it</Button>
                </div>
            </Box>
        </Modal>
    )
};