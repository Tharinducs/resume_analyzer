'use client'
import Sidebar from "@/components/sidebar";
import { useLogoutAPIMutation } from "@/features/auth/apiSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { hideLoader, showLoader } from "@/features/common/loaderSlice";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { logout as clearUserData } from "@/features/auth/authSlice";

interface DashboardSidebarContainerProps {
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

const DashboardSidebarContainer = ({ mobileOpen, onMobileClose }: DashboardSidebarContainerProps) => {
    const dispatch = useDispatch();
    const [logout, { isSuccess, isLoading, isError }] = useLogoutAPIMutation();
    const {toast} = useToast();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) {
            dispatch(showLoader());
        } else if (!isLoading) {
            dispatch(hideLoader());
        }
    }, [isLoading]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Logout successful",
                description: "You have been logged out.",
                variant: "success",
            });
            dispatch(clearUserData());
            router.replace("/login");
        }
        if (isError) {
            toast({
                title: "Logout failed",
                description: "An error occurred during logout. Please try again.",
                variant: "destructive",
            });
        }
    }, [isSuccess, isError]);

    const handleLogout = () => {
        logout("7");//need to replace with actual user id
    };

    return (
        <>
            <Sidebar handleLogout={handleLogout} mobileOpen={mobileOpen} onMobileClose={onMobileClose} />
        </>
    );
};
export default DashboardSidebarContainer;