import Print from "../../Shared/Components/Print/Print";
function Home() {
  const Handle = () => {
    console.log(id);
  };
  var date = new Date();
  var components = [
    date.getYear()-100,
    date.getMonth()+1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  var id = components.join("");

  return (
    <div>
      <button
        id=""
        onClick={(e) => {
          Handle();
        }}
      >
        Bấm
      </button>
    </div>
  );
}

export default Home;
