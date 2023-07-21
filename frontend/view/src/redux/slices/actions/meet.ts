import axios from "axios";
import { APP_URL_HTTP_BACK } from "@/globals";

export const sendImageToServer = async (
  formData: FormData,
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  try {
    // Realizar la solicitud POST al servidor utilizando Axios
    const response = await axios.post<string>(
      `${APP_URL_HTTP_BACK}/meet/capturas-images/`,
      formData
    );

    if (response.status === 201) {
      // console.log("Imagen enviada al servidor correctamente.");
      setCount((state) => state + 1);
      // Aquí puedes realizar acciones adicionales después de enviar la imagen.
      //} else {
      setCount((state) => state + 1);
      // console.error("Error al enviar la imagen al servidor.");
    }
  } catch (error) {
    // console.error("Error en la solicitud:", error);
  }
};
