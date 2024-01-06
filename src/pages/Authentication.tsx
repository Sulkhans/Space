import { useState } from "react";
import { Signin } from "../components/auth/Signin";
import { Signup } from "../components/auth/Signup";
import Loading from "../components/Loading";
import useAuthLoad from "../hooks/useAuthLoad";

export const Authentication = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(true);
  const { loading, user, setUser } = useAuthLoad();
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[url('./assets/background.jpg')] bg-[length:350%_350%] animate-bg md:bg-none md:flex-row">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="hidden h-screen md:flex justify-center items-center w-1/2 bg-[url('./assets/background.jpg')] bg-[length:270%_270%] animate-bg shadow-black shadow-2xl">
            <h1 className="text-white text-8xl font-semibold select-none lg:text-9xl">
              Space
            </h1>
          </div>
          <h1 className="text-white text-6xl font-semibold select-none mb-8 md:hidden">
            Space
          </h1>
          <div className="flex justify-center items-center bg-white rounded-md p-5 md:bg-transparent md:w-1/2">
            {isRegistered ? (
              <Signin
                user={user}
                setUser={setUser}
                setIsRegistered={setIsRegistered}
              />
            ) : (
              <Signup setIsRegistered={setIsRegistered} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
