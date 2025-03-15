import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Descubre & Comparte
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Prompts Potenciadod por AI </span>
      </h1>
      <p className="desc text-center">
        Promptopia es una herramienta de prompts de IA de código abierto para el mundo moderno para descubrir, crear y compartir prompts creativos
      </p>
      <Feed />
    </section>
  );
};

export default Home;