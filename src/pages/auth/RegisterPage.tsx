import Register from "@/components/auth/register";
import SEO from "@/components/shared/SEO";

function RegisterPage() {
  return (
    <div>
      <SEO
        title="Register"
        description="Create a new account and start sending personalized gifts."
      />
      <Register></Register>
    </div>
  );
}

export default RegisterPage;
