import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ImageUploading from "react-images-uploading";
import Loading from "../components/Loading";
function News() {
  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [editData, setEditData] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/News/getNews`)
      .then((res) => {
        if (res.data.isSuccess == true) {
          setData(res.data.news);
        } else {
          // toast.info(res.data.resultMessage);
        }
      })
      .catch((err) => console.log(err));
  }, [trigger]);
  const handleDeleteNews = (id) => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/News/deleteNews/${id}`)
      .then((res) => {
        if (res.data.isSuccess == true) {
          setTrigger(!trigger);
        } else {
          toast.info(res.data.resultMessage);
        }
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [newsType, setNewsType] = useState("0");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const newsData = {
    newsType: newsType,
    title: title,
    description: description,
  };
  const editDataSchema = {
    id: `${editData?.id}`,
    title: title,
    description: description,
  };
  const handleAddNews = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/v1/News/addNews`, newsData)
      .then((res) => {
        if (res.data.isSuccess == true) {
          setShow(false);
          setTrigger(!trigger);
        } else {
          toast.info(res.data.resultMessage);
        }
      });
  };
  const handleEditNews = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/v1/News/editNews`,
        editDataSchema
      )
      .then((res) => {
        if (res.data.isSuccess == true) {
          setShow(false);
          setTrigger(!trigger);
        } else {
          toast.info(res.data.resultMessage);
        }
      });
  };
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      setNewsType(editData?.newsType);
      setTitle(editData?.title);
      setDescription(editData?.description);
      setShow(true);
    }
  }, [edit]);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("0");
  const [images, setImages] = useState([]);
  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    setImages(imageList);
  };
  // console.log(data);
  const [loading, setLoading] = useState(false);
  const handleSubmitImage = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/v1/News/addImageToNews/${id}`,
        images[0],
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.data.isSuccess == true) {
          setModalShow(false);
          setTrigger(!trigger);
          setLoading(false);
        } else {
          toast.info(res.data.resultMessage);
        }
      });
  };
  return (
    <Layout>
      <ToastContainer />
      <div className="w-full px-2 py-3 bg-gray-200">
        <button
          onClick={() => {
            setNewsType("0");
            setTitle("");
            setDescription("");
            setEditData();
            handleShow();
          }}
          className=" rounded bg-sky-600 text-white shadow active:bg-sky-400 px-2 py-1"
        >
          <i className="bi bi-plus"></i>
          Мэдээ нэмэх
        </button>
      </div>
      <div className="w-full flex nunito-300 flex-row md:flex-row flex-wrap gap-2 p-3 justify-center md:justify-start">
        {data.map((news, index) => {
          return (
            <div
              key={index}
              className="w-[165px] md:w-[280px] h-[260px] md:h-[380px] flex flex-col rounded shadow p-2 bg-white parent transition-all overflow-hidden"
            >
              <div
                onClick={() => {
                  setModalShow(true);
                  setId(news.id);
                }}
                className="cursor-pointer"
              >
                <img
                  src={`${news.imgPath ? news.imgPath : "notfound.webp"}`}
                  className="h-[120px] md:h-[200px] w-full border"
                  alt="Зураг олдсонгүй..."
                />
              </div>
              <p className="mt-2 mb-0 flex justify-between">
                <span className="truncate text-[10px] md:text-[13px]">
                  Гарчиг : {news.title}
                </span>
                <span
                  className={`w-[50px] md:w-[130px] text-[8px] md:text-[13px] flex items-center justify-center px-2 h-6 ${
                    news.newsType == 1 ? "bg-emerald-500  " : "bg-emerald-500"
                  } rounded-full  text-white`}
                >
                  {news.newsType == 1 ? "Мэдээ мэдээлэл" : "Ажил"}
                </span>
              </p>
              <p className="m-0 truncate text-[10px] md:text-[13px]">
                Тайлбар: {news.description}
              </p>
              <p className="m-0 text-[10px] md:text-[13px]">
                Үүсгэсэн: {news.createdDate}
              </p>
              <div className="px-2 py-1 flex justify-between transition-all mt-auto">
                <button
                  onClick={() => {
                    setEdit(!edit);
                    setEditData(news);
                  }}
                  className="text-[10px] md:text-[13px] rounded bg-amber-600 text-white shadow active:bg-amber-400 px-2 py-1"
                >
                  <i className="bi bi-vector-pen mr-1"></i>
                  Засах
                </button>
                <button
                  onClick={() => {
                    handleDeleteNews(news.id);
                  }}
                  className="text-[10px] md:text-[13px] rounded bg-sky-600 text-white shadow active:bg-sky-400 px-2 py-1"
                >
                  <i className="bi bi-trash mr-1"></i>
                  Устгах
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* // edit // create // modal // // edit // create // modal // // edit //
      create // modal // // edit // create // modal // // edit // create // */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editData ? (
              <div className="w-full h-full text-xl ml-2 select-none flex gap-2 items-center">
                <img
                  className=""
                  src="data:image/png;base64,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"
                />
                Засах
              </div>
            ) : (
              <div className="w-full h-full text-xl ml-2 select-none flex gap-2 items-center">
                <img
                  className="w-14"
                  src="data:image/png;base64,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"
                ></img>
                Мэдээ нэмэх
              </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full">
            <select
              onChange={(e) => {
                setNewsType(e.target.value);
              }}
              defaultValue={newsType}
              name=""
              id=""
            >
              <option disabled value="0">
                Мэдээний төрөл сонгоно уу.
              </option>
              <option value="2">Бидний хийсэн ажил</option>
              <option value="1">Мэдээ мэдээлэл.</option>
            </select>
            <textarea
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="px-3 py-2 border rounded w-full"
              type="text"
              placeholder="Гарчиг"
              required="required"
            />
            <textarea
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="px-3 py-2 border rounded w-full mt-[10px]"
              type="text"
              placeholder="Тайлбар"
              required="required"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Цуцлах
          </Button>
          <Button
            onClick={() => {
              editData ? handleEditNews() : handleAddNews();
            }}
            variant="primary"
          >
            Хадгалах
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Зураг нэмэх
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Loading />}

          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                {imageList.length == 0 && (
                  <button
                    className="px-3 py-1 bg-sky-500 text-white active:bg-sky-400 mb-2 rounded"
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    Зураг сонгоно уу
                  </button>
                )}
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="200" />
                    <div className="image-item__btn-wrapper">
                      <button
                        className="m-1 rounded bg-amber-600 text-white shadow active:bg-amber-400 px-2 py-1"
                        onClick={() => onImageUpdate(index)}
                      >
                        Дахин сонгох
                      </button>
                      <button
                        className="m-1 rounded bg-rose-600 text-white shadow active:bg-rose-400 px-2 py-1"
                        onClick={() => onImageRemove(index)}
                      >
                        Устгах
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setModalShow(false);
            }}
          >
            Хаах
          </Button>
          <Button onClick={handleSubmitImage}>Хадгалах</Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}

export default News;
