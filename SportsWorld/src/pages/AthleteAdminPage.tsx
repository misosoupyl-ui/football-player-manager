import AthleteList from "../components/AthleteList";

const AthleteAdminPage = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center text-white p-6"
      style={{ backgroundImage: "url('/images/fotball.jpeg')" }}
    >
      <h1 className="flex justify-center text-shadow-lg/30 ">
        AthleteAdminPage
      </h1>
      <AthleteList />
    </section>
  );
};

export default AthleteAdminPage;
