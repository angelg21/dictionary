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
        <div className="bg-d-fondo min-h-screen antialiased">
            <div className="">
                <Sidebar sendStatusSidebar={handleSidebar} statusSidebar={sidebarOpen}/>
                <Profile sendStatusSidebar={handleSidebar}/>
                <div className=" lg:ml-[256px]">
                    { children }
                    </div>
                </div>
        </div>
    );
}
