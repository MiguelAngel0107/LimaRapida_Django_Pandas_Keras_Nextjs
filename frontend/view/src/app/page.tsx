"use client";
import React from "react";
import Image from "next/image";
import NavBar from "@/components/navigation/navBar";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    // Captura el evento de desplazamiento y actualiza la posición del fondo
    const parallaxContainer: HTMLElement | null =
      document.getElementById("parallax-container");

    const handleScroll = () => {
      const yOffset = window.pageYOffset;
      if (parallaxContainer != null) {
        parallaxContainer.style.backgroundPositionY = `-${yOffset * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const stats = [
    { id: 1, name: "Transactions every 24 hours", value: "44 million" },
    { id: 2, name: "Assets under holding", value: "$119 trillion" },
    { id: 3, name: "New users annually", value: "46,000" },
  ];

  return (
    <div className="bg-gray-950">
      <div className="bg-transparent h-2" />
      <main
        className="py-32 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/home/backiee-196480.jpg')" }}
        id="parallax-container"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-100">
                Plataforma de Multiconferencias y Aprendizaje Interactivo
              </h1>
              <p className="text-lg text-gray-200 mb-8">
                Crea o Únete a nuestras conferencias y clases sincronas para
                interactuar con expertos y compañeros. Además, nuestra
                plataforma te permite tener chats privados con otros
                participantes, fomentando la colaboración y el aprendizaje.
              </p>
              <a
                href="/meet"
                className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-6 rounded-full font-bold text-lg"
              >
                Empezar
              </a>
            </div>
            <div className="md:w-1/2 bg-white bg-opacity-30 backdrop-blur-md rounded-3xl p-4">
              {/* Contenido adicional que aparecerá sobre la imagen */}
            </div>
          </div>
        </div>
      </main>

      <div className="bg-transparent h-32" />

      <section className="text-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="sm:text-3xl text-2xl font-bold mb-4 text-white">
              Nuestros Servicios
            </h2>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Descubre los servicios que ofrecemos para brindarte la mejor
              experiencia educativa y de colaboración en nuestras conferencias
              sincronizadas.
            </p>
          </div>
          <div className="container mx-auto mt-8 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              <Image
                className="w-full h-48 object-cover"
                src={"/images/home/conferences.jpg"}
                alt={"title"}
                
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-black">
                  Videoconferencias Ilimitadas
                </div>
                <p className="text-gray-700 text-base">
                  Disfruta de videoconferencias sin restricciones de tiempo o
                  capacidad de participantes. Conéctate con expertos y
                  compañeros en tiempo real.
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              <Image
                className="w-full h-48 object-cover"
                src={"/images/home/messengerHub.jpg"}
                alt={"title"}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-black">
                  Mensajería Privada y Protegida
                </div>
                <p className="text-gray-700 text-base">
                  Mantén conversaciones seguras y encriptadas con otros
                  participantes. Colabora y comparte ideas de manera
                  confidencial.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-white">
              <Image
                className="w-full h-48 object-cover"
                src={"/images/home/blogAndPosts.jpg"}
                alt={"title"}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-black">
                  Sistema de Blog y Publicaciones
                </div>
                <p className="text-gray-700 text-base">
                  Mantente al tanto de las próximas conferencias y eventos
                  educativos a través de nuestro sistema de blogs. Comparte tus
                  conocimientos y aprendizajes con la comunidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<div className="bg-gray-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="mx-auto flex max-w-xs flex-col gap-y-4"
              >
                <dt className="text-base leading-7 text-white">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
            </div>*/}

      {/*<div className="bg-gray-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-white">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 bg-white"
              src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 bg-white"
              src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 bg-white"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1 bg-white"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1 bg-white"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
            </div>*/}

      <section className="text-gray-400 bg-gray-950 body-font">
        <div className="container px-5 py-32 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-bold mb-4 text-white">
              Nuestro Equipo de Desarrollo
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Somos un equipo apasionado y comprometido de desarrolladores,
              diseñadores y amantes de la educación. Nuestra misión es crear una
              plataforma que promueva la interactividad, el aprendizaje
              colaborativo y el acceso a conferencias inspiradoras en todo el
              mundo.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
              <div className="h-full flex items-center border-gray-800 border p-4 rounded-lg">
                <img
                  alt="team"
                  className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                  src="https://dummyimage.com/80x80"
                />
                <a className="flex-grow" href="https://www.instagram.com/miguelsuyo/" target="_blank">
                  <h2 className="text-white title-font font-medium">
                    Miguel Egocheaga
                  </h2>
                  <p className="text-gray-600">Software Developer </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
