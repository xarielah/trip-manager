import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/authSlice";

interface IAuthProvider {
  children: ReactNode;
  currentUser: any; // Change to correct type
}

const AuthProvider = ({ children, currentUser }: IAuthProvider) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setUser({
        username: currentUser?.username ?? null,
        email: currentUser?.email ?? null,
      })
    );

    return () => {
      dispatch(setUser({ username: null, email: null }));
    };
  }, [currentUser]);

  return <div className="w-full">{children}</div>;
};

export default AuthProvider;
