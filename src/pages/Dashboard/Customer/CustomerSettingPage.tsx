import SettingPassword from "@/components/Dashboard/Customer/Setting/SettingPassword";
import UpdatePassowordForm from "@/components/Dashboard/Customer/Setting/UpdatePasswordForm";
import * as React from "react";

export default function CustomerSettingPage() {
  const [verified, setVerified] = React.useState(false);
  const [verifyToken, setVerifyToken] = React.useState<string | null>(null);
  console.log(verified);

  const handleVerified = (token: string) => {
    setVerified(true);
    setVerifyToken(token);
  };

  const handleReset = () => {
    // here verify token is or not
    setVerified(false);
    setVerifyToken(null);
  };

  return (
    <div className="xl:space-y-8 lg:space-y-6 md:space-y-4 space-y-2">
      {!verified ? (
        <SettingPassword handleVerified={handleVerified} />
      ) : (
        <UpdatePassowordForm verifyToken={verifyToken!} onBack={handleReset} />
      )}
    </div>
  );
}
