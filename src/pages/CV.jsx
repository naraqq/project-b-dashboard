import Layout from "../layout/Layout";
import { ToastContainer } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import { logout } from "../static/service";
function CV() {
  const [show, setShow] = useState(false);
  const { TOKEN } = useStateContext();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [ankets, setAnkets] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/Anket/getJobToApplyAdmin`, {
        headers: {
          Authorization: TOKEN,
        },
      })
      .then((res) => {
        if (res.data.isSuccess == true) {
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
  // console.log(ankets);
  return (
    <Layout>
      <ToastContainer />
      <div className="w-full px-2 py-3 bg-gray-300">
        <button
          onClick={handleShow}
          className=" rounded bg-sky-600 text-white shadow active:bg-sky-400 px-2 py-1"
        >
          <i className="bi bi-plus"></i>
          Ажлын зар нэмэх
        </button>
      </div>
      <div className="w-full min-h-screen items-center md:items-start bg-gray-200 flex flex-col md:grid grid-cols-4 justify-center md:justify-start gap-3 p-3">
        {ankets.map((anket, index) => {
          // console.log(anket);
          return (
            <div
              key={index}
              className="bg-white rounded shadow w-full cursor-pointer p-3 scale-cus transition-all flex flex-col justify-between"
            >
              <div className="">
                <div className="nunito-600">
                  <img
                    className="w-10"
                    src="data:image/png;base64,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"
                  />
                </div>
                <div className="nunito-600 mt-3">{anket.jobTitle}</div>
                <div className="nunito-600 text-[13px] text-gray-500 mt-2 text-clip h-20">
                  {anket.jobDuty}
                </div>
              </div>
              <div className="w-fit flex flex-wrap gap-1">
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
              <div className="w-full h-8 flex gap-2">
                <button className="rounded select-none text-white flex items-center justify-center bg-blue-500 active:bg-blue-400 nunito-700 w-1/2 text-sm">
                  Засах
                </button>
                <button className="rounded select-none text-gray-500 flex items-center justify-center bg-gray-300 active:bg-gray-400 nunito-700 w-1/2 text-sm">
                  Устгах
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="w-full h-full text-xl ml-2 select-none flex gap-2 items-center">
              <img
                className="w-14"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKKElEQVR4nO2deXAT1x3Ht0ea/tH+kx5jk2R6N0kLAcJ9hMsQwOYIBGoZKJirBQIJzUBshlLIJFzGgHHKcBo7ThnA0DCFhqNWuGJb4GifZKy2LpNYu7aTQMBG0nu2ZdnSr/PWNpF1rq7dlbzfme9g8Nrsvo9+7/f2vbe/ZRhVqlSpUqVKlSpVqlSpUqVKlSpVqmKjxkt9nrZqk89YS5Nt1JbSpLPWj/o8E6P/TpWnLKVJ5RZt0sdfw0hqtGqToYdLk5ro95hElckE3zFwtlEGjixneZLL8vifiCO3EY8/Y3nSxPK4rdOkif5b1/fOszzeRX8GcdaR9HdE41woDEtp0g36tRAZnjAeQUkuYRJJrNn2HOJJNsvhy4jDzYgnEIlZDhPE4UssT7L0Ztuz0ThHoZvyB0SbbGXiXfrPbT9kObyG5XBlpABEALrFcnj1rQbrD2IExMLEq26ZSRLi8Y5oRELIYHhsRzw+VNnQEnKfLyRw/0BOMfEm46f4xyyPD9P+X2oQyBtMG+LwQfSF7Udiz5+OpmgC94Rh0SY9eHD1yaeYeBEAfBPxZCHiyH25QSAvMOQh4vHrJQDfEnMtwkirNLmE5owun4orGGyd5Ze0/5a74VFQY10l3/pzJpGlNzfP6vwEyt3YRKytLI/TmUQTDX/Ek3wFNDCEZY7spd0skwiiN2SII6dkb1Q+MrMcPnvVDN8Vc81ZhYa0rELUkF2I6t8sQlMZpajsv/e/j3jykdyNiaJnLb2mYNdNQWQXGYA6qwjVMUqJDOEuW8SFlt1ugK2btsKitGkwe8RweHnY0Ig9a9hQmDZwAEz+7XMhefqggbB45suw4+1dUKqr8Y4Unly5cwcejysgtL9leVIiBsbF60aY8+JomD5oAGx9YzUc3b01LBf/NRdOHs6P2Mf2bocta1bAjMEDIbV/P8jPO+yz+wo0LKbdFIVCYWQXslMYuSU2getqvgJNygTInDIJzP9D4OxoUoyJtQHytmQLUVNY/IH3+XNkj9ztLCpZGXg8V2yfnLf3IKQ+3xfumG7KDsDpwx3tjbBh+WLISEmhUeEdKWbbbEZOBesb9bzlF4gnFrFAVmrmQfbShbI3vDOAK7TnhCi5XG7ylU8eynrzGAiIkDdCvAOfP2kSHNz5luyN7vRwTXUFbFi2CNakz4blM1IFIKfPXfNzHbhCtnuUQMkK1dlWhTqMnD9xopCQgzVQwZ5tkDl5opdfS58Nrc13hWMMulJYkvqSz+NC9dyRwwUIa5f+EdatWA1/Wf9nKP/3l36vgy6CMcqbtaWrdaEBmZeSIjR2MCCf3Ljoc2RVUrBf6OfpMXcbaoQRUrijNHe/mbkA0gb2h09qLaKug+VIYyizxDEXnUIPFQZ1RsoEKNi7XfYuyunh0wX7YcaQQSFdC8uR/YwSVFXf/FS46xnxDoTYOwDbO7oSPLYb6pqfjJt7Dl/WTIhvINgNiCLuTegaeCTLrhQI7ffdG+PWtQui+/rrFz8Q9XPux9GvA30/3C6rs9vCJJI1+ohFNySEC8MfEKcCHC4QwXW2VXICiWh3iGb8eCjM25FYQHisk3PfVNgwEhcIgapaq/RbSRFPNkQKJH3cOC8guivn/c7E0u8FOyYcd//eaAExcGS95EBYjvwrKkD27Uy4CGF5fEGOxSeiAiG+gXCYRGsvsSjRzcuRwhAiZOxYKMrPSbgIQTwBvbl5uGRAWL75D7ECcvzAdjh56K2A1mmLvRoxkrwS7RwimCNLJQOCOLI7VkCK8zeCq6UkqJ1tlYqOEJbHOZIBEZ7PiAKQ340ZC++9uyssIK6WEii7fEyxQBCH/yEZkM4HYuQHUpy/UbFAWB4bpQPCYy46QMYIu0WiAUSnsBzC8rhWMiDCgozCgDgVFiF0Z790QKL0PEciA2F5bI87IHPHvKgCiXaXZfq8GWytHeB0gfAn/XtIQKKU1HUKyyGSdlnuSZ1CcBf9uxxAnMrrsmplGfY6Xa4eQDqcLtEnTff0JjAQoyw3hpFEyIzBL0BO1tqEBIKkvDGk1RS8c4jLbw7R1dwH7a0aL0/t1xfeWJDeozGOH9gGJw9tFmV6rGJzCI93SgZEKFcRwsktTO3cjunL6zPnx+RT7pS7yzKTJYqdfqe54vr5HHDYTvfwokmj4MjO1xMSiF7K6fdQF6gokOqbR71yQOZLo+DortgAOS5iGr/b9NhoAmE5gvV6eEwSGFCZ/rRDrznThha221EmNJpywFT7WdDhbfXNI6KA6KKUCyIZHERhCfdD6WCwGY3tbAa4246Wgqm2LggQaSOkWEYgiCPrJAFCI8MTRrcfmHIDzln1JiBVUm0DcrAamz8gdrQ4AJCxcFt3pJcAwRWSwAgOZEnApdoqXW/JIbaVUgI56w/IfdNu/0DGjYOqisMJHyEs3f5TZ3lCMiD2yvnPOPSaJk8YrYZlUG2uD7hl1NgbgPAkl5FanSMtTYmD1Vip29Dic9XmOkf3Sd0rS4W75dN6ApkwAYzliQ2E5bGd5Zv7MEqQUImt68QojLvl072elDKWeQNZNGkkFOTGJoeUXX4fXK0fShkh7zJKEX1IJVB1OArEUHaoRyNYviiC6S/0g7NFm2MSIc5ut9eDTlsgepIyLCAceUAfXmKUJJZvXhHoadub2gNffyLzVkL66MGgGTMEGr88F1sgHaE7VCCSTiSGVkcR63ydcOa0GfBe/hZwtZwRgPwt/1Uo3rcK7pmPgtN+RXYATg/Tx61nDh0sNpGXAcA3GCWKrW35ia8tQhv/lA0LJo4HR0vVIyjdViKQ3RvXwYLJU8TAeGjkWn/GKFmIs83xPPEL1www9fm+sG3da9CC68Dl+A+42lhwtt0El8MkOwCnmx/c/RRmDxsC72zaGuyew0VrSDLxIFqj0PMCjh47BWkD+sMrI4bB22tXwpHcd+DEwbyoPgl1MkLT9X1aKmrO6FFww8gHG+buYuJFQj7xUWeRVtTZnLUJFqamwSsjRwatCDfLj6f0/U3IleLEmH5gVs37PVz6uDrYqOoEvcZ2vSbNoc9ocOg19e0oXTm1Ff0Xv8SXQhzLg9LtXuJPANE1W+FgM+Qv5SeyCKY2gWCUmu7d+1739cUdELcysSfkbkwUuf/uWSaWdlMUCoXRzmrkr60YYk7ZE5dRwWEXTeAJU0jZXYhvnhlOXS0kn620hiSTyKI3UnRVTfGRwZMyg7n1p0xvEJ1qoK+rYDnylQJBNNHXVSRkFyXuFUdkf+dbbuSGgVvpFLqkK34Kf9POFtpnSx4RHCYsT/Ypohqc0mSqszyh5/Cr/maNoxwRFbS2Va+KiEhe22BssP6aVtVBHL5It2ZGHgkE06IwdBMbqrf+iumNitZbAvR6eIw1t4xAHFlGKyTQZy/oAzHCiyU50vjoxZLC1D992SQ2dh2TQ0tc0I3PVwG+zfR2Ke61Db1dinttgypVqlSpUqVKlSpVqlSpUqVKlSomjvV/lYUDWWDMTfMAAAAASUVORK5CYII="
              ></img>
              Мэдээ нэмэх
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full">
            <select name="" id="">
              <option disabled value="0">
                Мэдээний төрөл сонгоно уу.
              </option>
              <option value="2">Бидний хийсэн ажил</option>
              <option value="1">Мэдээ мэдээлэл.</option>
            </select>
            <textarea
              className="px-3 py-2 border rounded w-full"
              type="text"
              placeholder="Гарчиг"
              required="required"
            />
            <textarea
              className="px-3 py-2 border rounded w-full mt-[10px]"
              type="text"
              placeholder="Тайлбар"
              required="required"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Цуцлах</Button>
          <Button variant="primary">Хадгалах</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default CV;
