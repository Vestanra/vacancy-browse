import { useFeedsData } from "./hooks/useFeddsQuery";
import { IUpworkFeedItemDTO } from "../interfaces-submodule/interfaces/dto/upwork-feed/iupwork-feed-item.dto";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import { DateFilter } from "./DatePicker";
import { KeywordSelect } from "./KeywordSelect";

export const TableFeeds = () => {          
    const [params, setParams] = useState({});
    const [selectedValue, setSelectedValue] = useState<string[]>([]);

    const { data, isError, isLoading } = useFeedsData(params);
    
    const feedsData: IUpworkFeedItemDTO[] = useMemo(() => {
        return data?.items?.items || []
    }, [data]);            

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
            header: () => (
                <div>
                    <span>Keywords</span>
                    <KeywordSelect 
                        setParams={setParams}
                        feedsData={feedsData}
                        selectedValue={selectedValue}
                        setSelectedValue={ setSelectedValue }
                    />
                </div>
            ),
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

    const table = useReactTable({
        columns: columns,
        data: feedsData,
        getCoreRowModel: getCoreRowModel(),
    });
    
    const handleGetFeeds = async () => {
        console.log(data);
    };

    return (
        <>
            {isLoading ? (<div>Loading...</div>)
                : isError ? (<div>Error: {isError}</div>)
                    : (
                        <div>
                            <div>Feeds</div>
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
                            <Box sx={{ margin: '40px' }}>
                                <DateFilter />
                            </Box>
                            <button type="button" onClick={handleGetFeeds}>get feeds</button>
                            <button type="button" onClick={handleGetFeeds}>get feeds</button>
                        </div>
                    )}
        </>
    )
};
