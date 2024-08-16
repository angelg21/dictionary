'use client'

import { Profile } from "@/src/dashboard/components/Profile/Profile";
import { Sidebar } from "@/src/dashboard/components/Sidebar/Sidebar";
import { useState } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {

    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleSidebar = (status: boolean) => {
        setSidebarOpen(status);
    };

    return (
        <div className="bg-d-fondo antialiased">

            <div className="flex ">
                <Sidebar sendStatusSidebar={handleSidebar} statusSidebar={sidebarOpen}/>
                <div className="min-h-screen flex flex-col">
                    <Profile sendStatusSidebar={handleSidebar}/>
                    <div className="flex-1 lg:ml-[256px]">

                    { children }
                    </div>
                </div>
            </div>
        </div>
    );
}
