import { Profile } from "@/src/dashboard/components/Profile/Profile";
import { Sidebar } from "@/src/dashboard/components/Sidebar/Sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className="bg-d-fondo antialiased">

            <div className="flex ">
                <Sidebar/>
                <div className="min-h-screen flex flex-col">
                    <Profile/>
                    <div className="flex-1 lg:ml-[256px]">

                    { children }
                    </div>
                </div>
            </div>
        </div>
    );
}
