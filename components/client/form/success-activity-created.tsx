const SuccessActivityCreated = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-6 my-12 min-h-[25em]">
      <h1 className="font-bold text-6xl text-teal-200">Activity Created!</h1>
      <p className="font-light text-center text-3xl max-w-3xl">
        Activity created successfully, please wait while we are refreshing the
        page...
      </p>
    </div>
  );
};

export default SuccessActivityCreated;
