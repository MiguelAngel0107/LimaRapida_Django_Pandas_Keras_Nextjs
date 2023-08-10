import React, { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Props {
  text: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleEmojiPicker: () => void;
}

function ChatInput(props: Props): ReactElement {
  return (
    <div className="flex items-center rounded-b-3xl px-3 pb-3">
      <form className="flex w-full" onSubmit={props.handleFormSubmit}>
        {/*<button
          type="button"
          className="mr-2 focus:outline-none"
          onClick={props.toggleEmojiPicker}
        >
          <FontAwesomeIcon icon={faSmile} />
  </button>*/}
        {/* props.showEmojiPicker && (
          <Picker
            title="Elige un emoji"
            emoji="point_up"
            onSelect={props.handleEmojiSelect}
            style={{ position: "absolute", bottom: "64px", right: "4px" }}
          />
        )*/}
        <input
          type="text"
          value={props.text}
          onChange={props.handleInputChange}
          className="text-gray-900 flex w-full rounded-full border-2 border-violet-600 px-4 py-2"
        />
        <button
          type="submit"
          className="ml-2 bg-violet-600 text-white rounded-full px-4 py-2 focus:outline-none hover:bg-violet-500"
          disabled={!props.text.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane}/>
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
