import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faMessage,
  faGear,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

interface NavDestopkProps {
  hover: boolean[];
  setHover: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export function SubMenu1(props: NavDestopkProps) {
  const select = (
    <span className="absolute inset-x-0 -bottom-px h-px w-full bg-indigo-600"></span>
  );

  return (
    <ul className="flex border-b border-gray-100">
      <li className="flex-1">
        <div
          className="relative block p-4"
          onClick={(e) => props.setHover([true, false, false, false])}
        >
          {props.hover[0] ? select : null}

          <div className="flex items-center justify-center group">
            <FontAwesomeIcon
              icon={faBell}
              className={
                props.hover[0]
                  ? "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-white group-hover:text-indigo-500"
              }
            />

            <span
              className={
                props.hover[0]
                  ? "ml-3 text-sm font-medium text-gray-900 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "ml-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-500"
              }
            >
              {" "}
              Notificaciones{" "}
            </span>
          </div>
        </div>
      </li>

      <li className="flex-1">
        <div
          className="relative block p-4"
          onClick={(e) => props.setHover([false, true, false, false])}
        >
          {props.hover[1] ? select : null}
          <div className="flex items-center justify-center group">
            <FontAwesomeIcon
              icon={faMessage}
              className={
                props.hover[1]
                  ? "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-white group-hover:text-indigo-500"
              }
            />

            <span
              className={
                props.hover[1]
                  ? "ml-3 text-sm font-medium text-gray-900 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "ml-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-500"
              }
            >
              {" "}
              Messages{" "}
            </span>
          </div>
        </div>
      </li>

      <li className="flex-1">
        <div
          className="relative block p-4"
          onClick={(e) => props.setHover([false, false, true, false])}
        >
          {props.hover[2] ? select : null}
          <div className="flex items-center justify-center group">
            <FontAwesomeIcon
              icon={faBookmark}
              className={
                props.hover[2]
                  ? "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-white group-hover:text-indigo-500"
              }
            />

            <span
              className={
                props.hover[2]
                  ? "ml-3 text-sm font-medium text-gray-900 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "ml-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-500"
              }
            >
              {" "}
              Guardados{" "}
            </span>
          </div>
        </div>
      </li>

      <li className="flex-1">
        <div
          className="relative block p-4"
          onClick={(e) => props.setHover([false, false, false, true])}
        >
          {props.hover[3] ? select : null}
          <div className="flex items-center justify-center group">
            <FontAwesomeIcon
              icon={faGear}
              className={
                props.hover[3]
                  ? "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "h-5 w-5 flex-shrink-0 text-gray-500 dark:text-white group-hover:text-indigo-500"
              }
            />

            <span
              className={
                props.hover[3]
                  ? "ml-3 text-sm font-medium text-gray-900 dark:text-indigo-500 group-hover:text-indigo-500"
                  : "ml-3 text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-500"
              }
            >
              Ajustes
            </span>
          </div>
        </div>
      </li>
    </ul>
  );
}

interface NavMobileProps {
  hover: boolean[];
  setHover: React.Dispatch<React.SetStateAction<boolean[]>>;
}

export function SubMenu2(props: NavMobileProps) {
  const select = "-mb-px border-b border-current p-4 text-pink-600";
  const normal =
    "-mb-px border-b border-transparent p-4 dark:text-white hover:text-pink-600";

  return (
    <nav className="flex justify-around border-b border-gray-100 text-lg font-medium">
      <div
        onClick={(e) => props.setHover([true, false, false, false])}
        className={props.hover[0] ? select : normal}
      >
        <FontAwesomeIcon icon={faBell} />
      </div>

      <div
        onClick={(e) => props.setHover([false, true, false, false])}
        className={props.hover[1] ? select : normal}
      >
        <FontAwesomeIcon icon={faMessage} />
      </div>

      <div
        onClick={(e) => props.setHover([false, false, true, false])}
        className={props.hover[2] ? select : normal}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </div>

      <div
        onClick={(e) => props.setHover([false, false, false, true])}
        className={props.hover[3] ? select : normal}
      >
        <FontAwesomeIcon icon={faGear} />
      </div>
    </nav>
  );
}
