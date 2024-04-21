const messages = () => {
  return (
    <div className="flex flex-col items-start mb-10">
      <div className="flex flex-row items-center gap-2">
        <img
          src="./image/Logo1.png"
          className="w-9 h-9 bg-green-950 rounded-full p-1 border-white border-[1px]"
        />
        <h1 className="font-semibold">GynGPT</h1>
      </div>
      <div className="ml-11">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default messages;
