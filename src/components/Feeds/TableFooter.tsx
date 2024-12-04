import { Box, Pagination } from "@mui/material";
import { SelectedItemsPerPage } from "./SelectedItemsPerPage";
import { useTheme } from "@emotion/react";
import { getFormatedItemsShown } from "../helpers/functions";
import { TableFooterProps } from "../../types/types";

export const TableFooter: React.FC<TableFooterProps> = ({ data, selectedItemsPerPage, setSelectedItemsPerPage, setParams, currentPage, setCurrentPage }) => {
    const theme: any = useTheme();

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
        setParams((prev: any) => ({
            ...prev,
            pageNumber: page,
        }));
    };   

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            padding: "8px",
            width: "100%",
            height: "64px",
            position: "fixe",
            bottom: 0, 
            borderTop: `1px solid ${theme.palette.gray.G400}`,
            backgroundColor: theme.palette.gray.G100,
        }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "12px", color: theme.palette.primary.dark}}>
                <div>Items shown: 
                    <span style={{fontWeight: "600"}}> {getFormatedItemsShown(currentPage, selectedItemsPerPage, data?.items.totalCount)} </span>
                    out of
                    <span style={{fontWeight: "600"}}> {data?.items.totalCount}</span>
                </div>
                <div style={{
                    height: '40px',
                    width: '1px',
                    backgroundColor: theme.palette.gray.G300
                }} />
                <div>Items per page: </div>
                <SelectedItemsPerPage
                    selectedItemsPerPage={selectedItemsPerPage}
                    setSelectedItemsPerPage={setSelectedItemsPerPage}
                    setParams={setParams}
                />
            </Box>
            <Pagination
                count={data?.items.totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                boundaryCount={0}
                showFirstButton
                showLastButton
                siblingCount={2}
                sx={{
                    "& .MuiPaginationItem-ellipsis": {
                        display: "none",
                    },
                    "& .MuiPaginationItem-root": {
                        width: "36px",
                        height: "48px",
                        fontWeight: "500",
                        fontSize: "16px",
                        "&:hover": {
                            backgroundColor: theme.palette.blue.BA300,
                        },
                    },
                    "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: theme.palette.primary.main,
                        border: `1px solid ${theme.palette.blue.BA300}`,
                        "&:hover": {
                            backgroundColor: theme.palette.blue.BA300,
                        },
                    },
                }}
            />
        </Box>
    )
};