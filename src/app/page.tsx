import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Work from "@/components/Work";
import { AIPipeline, Process } from "@/components/Approach";
import { Global, Stack, Studio } from "@/components/Studio";
import { Contact, Engagement, FAQ, Footer, Testimonials } from "@/components/Closing";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
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
      <MobileCTA />
    </>
  );
}
