import SignIn from "@/app/auth/signin/page";
import getAuth from "@/app/components/localStorage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = getAuth();

  return <>{isLoggedIn ? children : <SignIn />}</>;
};
export default ProtectedRoute;
