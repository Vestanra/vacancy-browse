import { useFeedsData } from "../hooks/useFeddsQuery";
import { IUpworkFeedItemDTO } from "../../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { DateSelect } from "./DateSelect";
import { KeywordSelect } from "./KeywordSelect";
import { ScoreSelect } from "./ScoreSelect";
import { TitleSelect } from "./TitleSlect";
import { SelectDirection } from "./SelectDirection";
import { UpworkFeedSortBy } from "../../interfaces-submodule/enums/upwork-feed/upwork-feed-sort-by.enum";
import { TableHeader } from "./TableHeader";
import { ReviewSelect } from "./ReviewSelect";
import sprite from "../../images/svg/sprite.svg";
import { Box } from "@mui/material";
import { TableFooter } from "./TableFooter";
import { useTheme } from "@emotion/react";
import { formattedDate } from "../helpers/functions/formattedDate";
import { useThemeContext } from "../helpers/styles/ThemeContextProvider";


export const TableFeeds = () => {
    const [params, setParams] = useState({});
    const [selectedKeyWords, setSelectedKeyWords] = useState<string[]>([]);
    const [selectedScore, setSelectedScore] = useState<string[]>([]);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const [selectedReview, setSelectedReview] = useState<string[]>([]);
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(10);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data, isError, isLoading } = useFeedsData(params);
    const { themeMode } = useThemeContext();
    
    const feedsData: IUpworkFeedItemDTO[] = useMemo(() => {
        return data?.items?.items || []
    }, [data]);
    const theme: any = useTheme();

    const columns: ColumnDef<IUpworkFeedItemDTO>[] = [
        {
            accessorKey: "title",
            header: () => (
                <Box sx={{ width: "208px", display: "flex", flexDirection: 'column', justifyContent: "space-between", height: '100%', padding: '8px' }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Title</span>
                        <SelectDirection
                            setParams={setParams}
                            sortBy={UpworkFeedSortBy.Title}
                        />
                    </Box>
                    <TitleSelect
                        setParams={setParams}
                        setSelectedScore={setSelectedScore}
                        setSelectedKeyWords={setSelectedKeyWords}
                        selectTitle={selectedTitle}
                        setSelectedTitle={setSelectedTitle}
                        setSelectedReview={setSelectedReview}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            ),
            cell: ({ row }) => {
                const title = row.original?.title;
                const id = row.original?.id;
                return (
                    <div style={{ width: "208px", padding: '8px', }}>
                        <div
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(id)
                            }}
                            style={{ color: theme.palette.primary.contrastText, cursor: 'pointer' }}
                        >
                            {title}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: "published",
            header: () => (
                <Box sx={{ width: "140px", display: "flex", flexDirection: 'column', justifyContent: "space-between", height: '100%', padding: '8px' }}
                    className={`custom-calendar ${themeMode === 'light' ? 'light' : 'dark'}`}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Published</span>
                        <SelectDirection
                            setParams={setParams}
                            sortBy={UpworkFeedSortBy.Published}
                        />
                    </Box>
                    <DateSelect
                        setParams={setParams}
                        setSelectedScore={setSelectedScore}
                        setSelectedKeyWords={setSelectedKeyWords}
                        setSelectedTitle={setSelectedTitle}
                        setSelectedReview={setSelectedReview}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            ),
            cell: ({ row }) => {
                const date = row.original?.published;
                return (
                    <div style={{ width: '140px', padding: '8px', fontSize: "14px" }}>
                        {formattedDate(date)}
                    </div>
                );
            }
        },
        {
            accessorKey: "keywords",
            header: () => (
                <Box sx={{ width: "208px", display: "flex", flexDirection: 'column', justifyContent: "space-between", height: '100%', padding: '8px' }}>
                    <span>Keywords</span>
                    <KeywordSelect
                        setParams={setParams}
                        feedsData={feedsData}
                        selected={selectedKeyWords}
                        setSelected={setSelectedKeyWords}
                        setSelectedScore={setSelectedScore}
                        setSelectedTitle={setSelectedTitle}
                        setSelectedReview={setSelectedReview}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            ),
            cell: ({ row }) => {
                const keywords = row.original?.keywords;
                return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", width: "208px", padding: '8px' }}>
                        {keywords && keywords.map((keyword, index) => (
                            <Box
                                key={index}
                                sx={{
                                    fontSize: '14px',
                                    borderRadius: '20px',
                                    backgroundColor: theme.palette.gray.G200,
                                    padding: '2px 8px',
                                    margin: '4px',
                                }}
                            >
                                {keyword}
                            </Box>
                        ))}
                    </Box>
                );
            },
        },
        {
            accessorKey: "score",
            header: () => (
                <Box sx={{ width: "140px", display: "flex", flexDirection: 'column', justifyContent: "space-between", height: '100%', padding: '8px' }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Score</span>
                        <SelectDirection
                            setParams={setParams}
                            sortBy={UpworkFeedSortBy.Score}
                        />
                    </Box>
                    <ScoreSelect
                        setParams={setParams}
                        selected={selectedScore}
                        setSelected={setSelectedScore}
                        setSelectedKeyWords={setSelectedKeyWords}
                        setSelectedTitle={setSelectedTitle}
                        setSelectedReview={setSelectedReview}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            ),
            cell: ({ row }) => {
                const score = row.original?.score;
                let backgroundColor;
                if (score >= 80) {
                    backgroundColor = '#C4E5F5';
                } else if (score >= 60) {
                    backgroundColor = '#C9F0C9';
                } else if (score >= 40) {
                    backgroundColor = '#FAD2B4';
                } else {
                    backgroundColor = '#FAC8D0';
                }
                return <div
                    style={{
                        padding: '2px 8px',
                        width: '39px',
                        fontSize: '14px',
                        borderRadius: '20px',
                        backgroundColor: backgroundColor,
                        textAlign: "center",
                        marginTop: "8px",
                        marginLeft: "8px"
                    }}
                >
                    {score}
                </div>
            }
        },
        {
            accessorKey: "review",
            header: () => (
                <Box sx={{ width: "140px", display: "flex", flexDirection: 'column', justifyContent: "space-between", height: '100%', padding: '8px' }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <span>Reaction</span>
                        <SelectDirection
                            setParams={setParams}
                            sortBy={UpworkFeedSortBy.Review}
                        />
                    </Box>
                    <ReviewSelect
                        setParams={setParams}
                        setSelectedScore={setSelectedScore}
                        setSelectedKeyWords={setSelectedKeyWords}
                        setSelectedTitle={setSelectedTitle}
                        selectedReview={selectedReview}
                        setSelectedReview={setSelectedReview}
                        setCurrentPage={setCurrentPage}
                    />
                </Box>
            ),
            cell: ({ row }) => {
                const type = row.original?.review?.type;
                return (
                    <div style={{ padding: '8px', width: '140px', textAlign: 'center' }}>
                        {type === "Like" ? <svg width={20} height={20}><use href={`${sprite}#like`} /></svg> :
                            type === "Dislike" ? <svg width={20} height={20}><use href={`${sprite}#dislike`} /></svg> :
                                null}
                    </div>
                )
            }
        },
        {
            accessorKey: "matchedCases",
            header: () => (
                <div style={{ width: '110px', textAlign: 'right', padding: '8px' }}>
                    Matched cases
                </div>
            ),
            cell: ({ row }) => (
                <div style={{ padding: '8px', width: '110px', textAlign: 'right' }}>
                    {row.original.matchedBlogs}
                </div>
            ),
        },
        {
            accessorKey: "matchedBlogs",
            header: () => (
                <div style={{ width: '110px', textAlign: 'right', padding: '8px' }}>
                    Matched blogs
                </div>
            ),
            cell: ({ row }) => (
                <div style={{ padding: '8px', width: '110px', textAlign: 'right' }}>
                    {row.original.matchedBlogs}
                </div>
            ),
        },
    ];

    const table = useReactTable({
        columns: columns,
        data: feedsData,
        getCoreRowModel: getCoreRowModel(),
    });
   
    return (
        <>
            {isLoading ? (<div>Loading...</div>)
                : isError ? (<div>Error: {isError}</div>)
                    : (
                        <Box sx={{ width: "1120px", padding: '8px 16px', margin: '0 auto', display: "flex", flexDirection: "column", justifyContent: "center" }} >
                            <TableHeader
                                setParams={setParams}
                                setSelectedTitle={setSelectedTitle}
                            />
                            <table style={{ borderCollapse: 'collapse', marginTop: '16px', }}>
                                <thead>
                                    {table.getHeaderGroups().map(headerGroup => (
                                        <tr key={headerGroup.id}>
                                            {headerGroup.headers.map(header => (
                                                <th key={header.id}
                                                    style={{
                                                        height: "116px", padding: '0px',
                                                        borderBottom: `1px solid ${theme.palette.gray.G400}`, color: theme.palette.gray.G700
                                                    }}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody>
                                    {table.getRowModel().rows.map(row => (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <td key={cell.id}
                                                    style={{
                                                        borderBottom: `1px solid ${theme.palette.gray.G400}`,
                                                        color: theme.palette.gray.G700, verticalAlign: 'top', padding: "0px", width: 'auto',
                                                    }}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* <TableFooter
                                data={data}
                                selectedItemsPerPage={selectedItemsPerPage}
                                setSelectedItemsPerPage={setSelectedItemsPerPage}
                                setParams={setParams}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}                                
                            /> */}
                            {feedsData.length > 0
                                ? <TableFooter
                                data={data}
                                selectedItemsPerPage={selectedItemsPerPage}
                                setSelectedItemsPerPage={setSelectedItemsPerPage}
                                setParams={setParams}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}                                
                                />
                        : <div style={{padding: "20px"}}>Nothing found for your request.</div> }
                        </Box>
                    )}
        </>
    )
};


            