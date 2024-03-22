export const AppBar = function ({name}) {
  return (
    <div className="shadow-md h-20 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4  text-xl">
        <b>EasyPay</b>
      </div>
      <div className="flex  justify-center">
        <div className="flex flex-col mr-4 justify-center font-semibold">
          Welcome
        </div>
        <div className="rounded-full h-12 w-12  flex flex-col justify-center m-auto bg-slate-300 ">
          <div className="flex flex-col justify-center h-full text-center ">
            <b>{name[0].toUpperCase()}</b>
          </div>
        </div>
      </div>
    </div>
  );
};
