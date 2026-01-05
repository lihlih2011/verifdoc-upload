import { Outlet } from "react-router-dom";
import Header from "../components/landing/ui/header";
import Footer from "../components/landing/ui/footer";
import PageIllustration from "../components/landing/page-illustration";

export default function LandingLayout() {
    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-gray-950 font-inter tracking-tight text-gray-200 antialiased selection:bg-primary-500 selection:text-white">
            <PageIllustration />
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
