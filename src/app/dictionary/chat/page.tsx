
import Chat from "@/src/dictionary/components/Chat";
import { ThemeProvider } from "next-themes";




export default function ChatPage() {
    return (
        <div className="">
            <ThemeProvider attribute="class" defaultTheme="light">
                <Chat />
            </ThemeProvider>
        </div>
    );
}