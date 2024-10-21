import { redirect } from "next/navigation";
import { LandingPage } from "../landing/components/LandingPage";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <LandingPage />
    </ThemeProvider>
  );
}
