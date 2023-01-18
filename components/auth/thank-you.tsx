interface IThankYouAuthProps {
  authType: "registration" | "login";
}

const ThankYouAuth = ({ authType }: IThankYouAuthProps) => {
  const registrationMessage =
    "Thank you for your registration! We are now redirecting you to the login page so you can successfully login with your brand new account.";

  const loginMessage =
    "Thank you for your login, we are now redirecting you to the Client Area so you can create your trip and manage it's activities.";
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 space-y-5 -mt-20">
      <h1 className="text-teal-100 text-6xl font-bold">Thank You!</h1>
      <p className="text-xl font-light">
        {authType === "login" ? loginMessage : registrationMessage}
      </p>
    </section>
  );
};

export default ThankYouAuth;
