import ContactSection from "@/components/contact-us/ContactSection";
import ContactUsHero from "@/components/contact-us/ContactUsHero";
import MapSection from "@/components/contact-us/MapSection";

function ContactUsPage() {
  return (
    <div>
      <ContactUsHero></ContactUsHero>
      <ContactSection></ContactSection>
      <MapSection></MapSection>
    </div>
  );
}

export default ContactUsPage;
