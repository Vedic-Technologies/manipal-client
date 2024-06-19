/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cVF9D9PZygK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "../components/ui/button";
import tick from "./right.gif";

export default function JobDoneAlertVarient({
  isOpen,
  type,
  message,
  description,
  OnCancel,
}) {
  if (!isOpen) return null;
  let icon;
  let color;
  let animate;
  if (type === "success") {
    icon = <img src={tick} className="size-12" alt="" />;
    color = "bg-green-500";
    animate = "";
  }
  if (type === "error") {
    icon = <TriangleAlertIcon className="h-6 w-6" />;
    color = "bg-red-500";
    animate = "animate-pulse";
  }

  if (type === "notify") {
    //  icon = <TriangleAlertIcon className="h-6 w-6" />;
    //  color = "bg-red-500";
    return (
      <div
        className=" inset-0 flex items-center mb-60 justify-center z-10 "
        onClick={OnCancel}
      >
        <div className=" border dark:bg-gray-800 rounded-lg shadow-md bg-green-50 w-full max-w-md mx-4 px-10 py-2 flex flex-col items-center">
          <div className="text-sm center gap-5 font-medium text-gay-200 dark:text-gray-100">
            <span
              className={`size-8 flex items-center justify-center rounded-full bg-green-200 text-black `}
            >
              <CheckIcon className="size-4" />
            </span>
            {message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" inset-0 flex items-center justify-center z-10 h-screen w-screen backdrop-blur-sm ">
      <div className="bg-white border dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md mx-4 p-6 flex flex-col items-center">
        <div
          className={` flex items-center ${animate} transition-all  w-12 h-12 transition-500 justify-center rounded-full ${color} text-white mb-4 `}
        >
          {icon}
        </div>
        {message && (
          <h3 className="text-lg select-none font-medium text-gray-900 dark:text-gray-100 mb-2">
            {message}
          </h3>
        )}
        {description && (
          <p className="text-gray-500 dark:text-gray-400 mb-6">{description}</p>
        )}

        <Button
          variant="secondary"
          className="outline-none select-none"
          color="green"
          onClick={() => {
            OnCancel();
          }}
          autoFocus
        >
          OK
        </Button>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
