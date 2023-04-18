import { useLocation } from "react-router-dom";
import Layout from "../layout/Layout";
import { ToastContainer } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../context/ContextProvider";
function CVDetail() {
  const location = useLocation();
  const { TOKEN } = useStateContext();
  // console.log(location.state);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/v1/Anket/getAnket/${location.state.anketId}`,
        {
          headers: {
            Authorization: TOKEN,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Layout>
      <ToastContainer />
      <div>cv detail page !!!!</div>
    </Layout>
  );
}

export default CVDetail;
