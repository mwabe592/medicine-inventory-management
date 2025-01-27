import LoginForm from "@/components/LoginForm";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center  mt-4">
      <h1 className="mb-10 font-bold text-3xl">
        Medicines Inventory Management
      </h1>
      <LoginForm />
    </div>
  );
};

export default Home;
