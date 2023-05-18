import Layout from "../layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
import { logout } from "../static/service";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
function Anket() {
  const { TOKEN } = useStateContext();
  const [ankets, setAnkets] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/Anket/listAnket`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        if (res.data.isSuccess == true) {
          setLoading(false);
          setAnkets(res.data.datas);
        } else {
          if (res.data.errorCode == 401) {
            logout();
          } else {
            toast.info(res.data.resultMessage, {
              position: "bottom-right",
            });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  //   console.log(ankets);
  return (
    <Layout>
      <ToastContainer />
      {loading && <Loading />}
      <div className="w-full px-2 py-3 bg-gray-200 min-h-screen flex flex-col md:grid grid-cols-4 grid-rows-4 gap-4">
        {ankets.map((anket, index) => {
          return (
            <div
              key={index}
              className="w-full h-[220px] md:h-[250px] flex flex-col rounded shadow p-2 bg-white parent transition-all overflow-hidden"
            >
              <p className="mt-2 mb-0 flex justify-around items-center">
                <img src="data:image/png;base64,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" />
                <span>
                  <span className="truncate text-[10px] md:text-[13px] mr-1">
                    {anket.lastName}.
                  </span>
                  <span className="truncate text-[10px] md:text-[13px]">
                    {anket.firstName}
                  </span>
                </span>
              </p>
              <p className="mt-1 mb-0 text-[10px] md:text-[13px] flex justify-between">
                <span> Компани:</span>
                <span className="bg-rose-500 text-white rounded flex justify-center items-center text-center px-1">
                  {" "}
                  {anket.companyId == 1
                    ? "Инсталл Наран"
                    : "Инсталл Наран Конкрит"}
                </span>
              </p>
              <p className="mt-1 mb-0 text-[10px] md:text-[13px] flex justify-between">
                <span>Ажлын байр:</span>
                <span className="bg-sky-100 rounded flex justify-center items-center text-center px-1">
                  {" "}
                  {anket.jobName}
                </span>
              </p>
              <p className="mt-1 mb-0 text-[10px] md:text-[13px] flex justify-between">
                <span> Утас:</span>
                <span>{anket.phoneNo}</span>
              </p>
              <p className="mt-1 mb-0 text-[10px] md:text-[13px] flex justify-between">
                <span>Регистр:</span>
                <span>{anket.registerNo}</span>
              </p>
              <p className="mt-1 mb-0 text-[10px] md:text-[13px] flex justify-between">
                <span>Огноо:</span>
                <span>{anket.createDate}</span>
              </p>

              <button
                onClick={() => {
                  navigate("/CV-detail", { state: anket });
                }}
                className="mt-auto text-[10px] mt-2 md:text-[13px] rounded bg-gray-400 active:bg-gray-300 nunito-700 text-white shadow active:bg-gray-400 px-2 py-1"
              >
                Дэлгэрэнгүй
              </button>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default Anket;
