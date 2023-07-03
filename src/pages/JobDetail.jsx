import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

function JobDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const anket = location.state;
  return (
    <Layout>
      <div className="w-full h-full">
        <div className="bg-white h-full  h-full   w-full p-3 scale-cus transition-all flex flex-col justify-between">
          <div>
            <div className="">
              <div className="nunito-600">
                <img
                  className="w-10"
                  src="data:image/png;base64,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"
                />
              </div>
              <div className="nunito-600 mt-3 ">{anket.jobTitle}</div>
              <div className="nunito-600 text-[13px]  text-gray-500 mt-2 text-clip ">
                {anket.jobDuty}
              </div>
            </div>
            <div className=" flex flex-wrap gap-1 mt-4">
              {anket?.jobRequirement?.map((cell, indexX) => {
                return (
                  <div
                    key={indexX}
                    className="px-3 py-1 rounded bg-sky-200 text-blue-600 w-fit text-[11px]"
                  >
                    {cell}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full mt-2 h-8 flex gap-2">
            <button className="rounded select-none text-white flex items-center justify-center bg-sky-400 active:bg-sky-500 nunito-700 w-full text-sm">
              Засах
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default JobDetail;
