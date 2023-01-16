const ClientHomePage = () => {
  return (
    <section className="text-center flex justify-center items-center flex-col">
      <h1 className="main-form-header md:w-1/2 md:text-8xl">
        This is your personal space!
      </h1>
      <div className="md:w-1/2">
        <p className="text-xl font-light md:text-3xl md:my-8">
          This is your space to create your trips and manage them.
        </p>
        <h2 className="text-2xl md:text-6xl font-bold my-8 text-teal-100">
          How it works?
        </h2>
        <p className="text-xl font-light md:text-3xl">
          So... Each trip you create, will include activities. Each activity
          will include information you fill, as well as color customization to
          your choice, plus, we have pre-made for you the types of activities
          such as Nightlife, Food, Attractions and more!
        </p>
      </div>
    </section>
  );
};

export default ClientHomePage;
