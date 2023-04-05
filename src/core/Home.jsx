import Layout from "../layout/Layout";

function Home() {
  return (
    <Layout>
      <div>
        <div className="container">
          <div className="card ">
            <div className="card-header">
              <h1>Welcome back </h1>
            </div>
            <div className="card-body">
              <p>Your account type is: Administrator</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
