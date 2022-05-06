import DashboardLayout from "../../components/Layouts/Dashboard";

const Home = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <p>
        When true, the source image will be served as-is instead of changing
        quality, size, or format. Defaults to false. When true, the source image
        will be served as-is instead of changing quality, size, or format.
        Defaults to false.
      </p>
    </div>
  );
};
export default Home;

Home.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
