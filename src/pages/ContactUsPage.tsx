import ContactSection from "@/components/contact-us/ContactSection";
import ContactUsHero from "@/components/contact-us/ContactUsHero";
import MapSection from "@/components/contact-us/MapSection";
import SEO from "@/components/shared/SEO";

function ContactUsPage() {
  return (
    <div>
      <SEO
        title="Contact Us"
        description="Get in touch with us for any inquiries or support."
      />
      <ContactUsHero></ContactUsHero>
      <ContactSection></ContactSection>
      <MapSection></MapSection>
    </div>
  );
}

export default ContactUsPage;
