import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faFacebook,
  faEthereum,
} from "@fortawesome/free-brands-svg-icons";

const ButtonGroup = (/*props*/) => {
  return (
    <div className="flex flex-col items-center mt-6">
      <div className="flex justify-center items-center w-full">
        <div className="border-t border-transparent w-28 my-3"></div>
        <div className="text-white mx-3">or continue with</div>
        <div className="border-t border-transparent w-28 my-3"></div>
      </div>

      <div className="border-t border-transparent pt-4 flex items-center gap-4">
        <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faFacebook} className="mr-2" />
          Facebook
        </button>
        <button className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faGoogle} className="mr-2" />
          Google
        </button>
        {/*<button
          onClick={(e) => props.setWeb3(!props.web3)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEthereum} className="mr-2" />
          {props.web3 ? "Regular" : "Metamask"}
  </button>*/}
      </div>
    </div>
  );
};

export default ButtonGroup;

