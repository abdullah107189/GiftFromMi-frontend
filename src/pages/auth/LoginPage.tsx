import Login from "@/components/auth/Login";
import SEO from "@/components/shared/SEO";

function LoginPage() {
  return (
    <div>
      <SEO
        title="Login"
        description="Access your account to manage your orders and profile."
      />
      <Login></Login>
    </div>
  );
}

export default LoginPage;
