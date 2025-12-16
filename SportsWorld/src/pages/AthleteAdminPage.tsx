import AthleteList from "../components/AthleteList";

const AthleteAdminPage = () => {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center text-white"
      style={{ backgroundImage: "url('/images/fotball.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative px-6 py-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Admin content panel */}
          <div className="bg-black/40 border border-gray-300/40 backdrop-blur-md p-4">
            <AthleteList />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AthleteAdminPage;
