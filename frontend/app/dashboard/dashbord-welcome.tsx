'use client'
import { RootState } from "@/store/store";
import { get } from "lodash";
import { useSelector } from "react-redux";

const DashboardWelcome = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    return (
        <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Welcome back, {`${get(user, 'name', 'John Doe')}`}!</h1>
            <p className="text-muted-foreground text-pretty">
                Here's an overview of your resume analysis and job matching progress.
            </p>
        </div>
    );
};
export default DashboardWelcome;