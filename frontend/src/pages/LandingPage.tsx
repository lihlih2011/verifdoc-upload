
import PageIllustration from "../components/landing/page-illustration";
import HeroHome from "../components/landing/hero-home";
import Workflows from "../components/landing/workflows";
import Features from "../components/landing/features";
import Testimonials from "../components/landing/testimonials";
import Pricing from "../components/landing/pricing";
import Faq from "../components/landing/faq";
import DemoForm from "../components/landing/demo-form";
import Cta from "../components/landing/cta";

export default function LandingPage() {
    return (
        <>
            <PageIllustration />
            <HeroHome />
            <Workflows />
            <Features />
            <Testimonials />
            <Pricing />
            <Faq />
            <DemoForm />
            <Cta />
        </>
    );
}
