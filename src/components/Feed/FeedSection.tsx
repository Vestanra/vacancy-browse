import { useTheme } from "@emotion/react";
import { ReactNode } from "react";

interface FeedSectionProps {
    title: string;
    children: ReactNode;
}

export const FeedSection: React.FC<FeedSectionProps> = ({ children, title }) => {
    const theme: any = useTheme();

    return (
        <div style={{
            width: "800px", padding: "16px 16px 24px 16px", margin: "0 auto 8px auto",
            border: `1px solid ${theme.palette.gray.G300}`, borderRadius: "16px",
        }}>
            <div style={{
                fontSize: "14px", fontWeight: "600", marginBottom: "16px", color: theme.palette.gray.G700
            }}>{title}</div>
            {children}
        </div>
    )
}