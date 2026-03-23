import ContactSection from "@/components/contact-us/ContactSection";
import ContactUsHero from "@/components/contact-us/ContactUsHero";
import MapSection from "@/components/contact-us/MapSection";
import SEO from "@/components/shared/SEO";
import { useSettingsQuery } from "@/redux/features/public/public.api";

function ContactUsPage() {
const { data: settings, isLoading } = useSettingsQuery(undefined);
  return (
    <div>
      <SEO
        title="Contact Us"
        description="Get in touch with us for any inquiries or support."
      />
      <ContactUsHero></ContactUsHero>
      <ContactSection
        settings={settings}
        isLoading={isLoading}
      ></ContactSection>
      <MapSection settings={settings} isLoading={isLoading}></MapSection>
    </div>
  );
}

export default ContactUsPage;
