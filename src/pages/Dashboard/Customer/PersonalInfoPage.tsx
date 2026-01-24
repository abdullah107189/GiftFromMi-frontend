import EditProfileForm from "@/components/Dashboard/Customer/PersonalInfo/EditProfileForm";
import SEO from "@/components/shared/SEO";

const PersonalInfoPage = () => {
  return (
    <div><SEO title="My Profile" description="Update your personal information and profile settings." />
      <EditProfileForm />
    </div>
  );
};

export default PersonalInfoPage;
