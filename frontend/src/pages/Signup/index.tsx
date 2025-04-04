import SignupForm from "@/components/signup-form";

const SignupPage = () => {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;
