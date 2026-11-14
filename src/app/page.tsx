import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { AIPipeline, Process } from "@/components/Approach";
import { Global, Stack, Studio } from "@/components/Studio";
import { Contact, Engagement, FAQ, Footer, Testimonials } from "@/components/Closing";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <AIPipeline />
        <Process />
        <Studio />
        <Stack />
        <Global />
        <Engagement />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
