import { useQuery } from "@tanstack/react-query";
import { useFeeds } from "./hooks/useFeeds";
import { IUpworkFeedItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { DateFilter } from "./table";
import { Box } from "@mui/material";


export const Feeds = () => {  
    const allFeeds = useFeeds();
    const { data, error, isLoading } = useQuery({
        queryKey: ['feeds'],
        queryFn: allFeeds,
    })
 

    const feedsData: IUpworkFeedItemDTO[] = data?.items?.items || [];

    const columns: ColumnDef<IUpworkFeedItemDTO>[] = [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "published",
            header: "Published",

        },
        {
            accessorKey: "keywords",
            header: "Keywords",
        },
        {
            accessorKey: "score",
            header: "Score",
        },
        {
            accessorKey: "matchedCases",
            header: "Matched cases",
        },
        {
            accessorKey: "matchedBlogs",
            header: "Matched blogs",
        },
    ];

    // console.log(data)

    const table = useReactTable({
        columns: columns,
        data: feedsData,
        getCoreRowModel: getCoreRowModel(),
    });    

    const handleGetFeeds = async () => {
        const a = await allFeeds({ pageNumber: 2 })
        console.log(a)
    };

    return (
        <>
            <div>Feeds</div>
            {isLoading ? (<div>Loading...</div>)
                : error ? (<div>Error: {error.message}</div>)
                    : (                        
                        <table>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id}>
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
                                            <td key={cell.id}>
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
                    )}
            <Box sx={{ margin: '40px}' }}>
                <DateFilter/>
            </Box>
            <button type="button" onClick={handleGetFeeds}>get feeds</button>
            <button type="button" onClick={handleGetFeeds}>get feeds</button>
        </>
    )
};
