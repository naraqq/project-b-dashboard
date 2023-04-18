import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <div className="index-top w-screen h-screen fixed bg-black bg-opacity-50 top-0 left-0 flex items-center justify-center flex-col">
      <Spinner animation="border" className="z-20 text-white" />
      {/* <p className="nunito-600 text-lg text-white">Түр хүлээнэ үү</p> */}
    </div>
  );
}

export default Loading;
