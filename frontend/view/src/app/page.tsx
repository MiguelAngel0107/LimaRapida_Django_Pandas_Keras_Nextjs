import React from "react";
import Image from "next/image";
import NavBar from "@/components/navigation/navBar";

const HomePage = () => {
  return (
    <div className="bg-gray-950">
      <NavBar />

      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-100">
                Recolección de Datos para Fines Educativos
              </h1>
              <p className="text-lg text-gray-400 mb-8">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                convallis sodales lectus. Donec a nunc ac lacus lobortis
                gravida. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia curae; Duis vel venenatis mi.
              </p>
              <a
                href="#"
                className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-full font-bold text-lg"
              >
                Empezar
              </a>
            </div>
            <div className="md:w-1/2">
              <Image
                src="/images/home/backiee-196480.jpg"
                alt="Ilustración"
                className="mx-auto rounded-3xl"
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="text-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Nuestros Servicios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-4 bg-gradient-to-r from-purple-950 to-indigo-950 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Análisis de Datos
              </h3>
              <p className="text-gray-400">
                Realizamos análisis detallados de datos educativos para obtener
                información valiosa sobre el rendimiento estudiantil, la
                eficacia de los programas educativos y más.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-indigo-950 to-purple-950 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Desarrollo de Aplicaciones
              </h3>
              <p className="text-gray-400">
                Creamos aplicaciones educativas interactivas y personalizadas
                para facilitar la recolección de datos y mejorar la experiencia
                de aprendizaje de estudiantes y educadores.
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-950 to-indigo-950 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-100 mb-4">
                Consultoría Educativa
              </h3>
              <p className="text-gray-400">
                Ofrecemos servicios de consultoría educativa para ayudar a las
                instituciones y organizaciones a implementar estrategias de
                recolección de datos efectivas y utilizar los resultados para la
                toma de decisiones informadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto px-4">
          <p className="text-center">
            © 2023 Tu Sitio | Todos los derechos reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
