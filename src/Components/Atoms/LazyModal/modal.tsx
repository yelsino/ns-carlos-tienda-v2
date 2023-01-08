import { useRef } from "react";
import styles from "./modal.module.css";

export default function Modal({ children, title, root }) {
  const ref = useRef(null);
  function handleClose() {
    ref.current.classList.add(styles.fadeOut);
    ref.current.addEventListener("animationend", (e) => {
      root.unmount();
    });
  }
  return (
    <div className=" bg-red-400  w-full h-screen right-0 top-0 absolute flex justify-center items-center" ref={ref}>
          <button onClick={handleClose} className="absolute top-5 right-5 text-red-600 font-bold" >
              CERRAR
         </button>
        <div className="bg-black">{children}</div>
    </div>
  );
}
