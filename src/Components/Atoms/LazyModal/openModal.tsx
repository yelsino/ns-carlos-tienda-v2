import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";

export default function openModal() {
  const Modal = lazy(() => import("./settingsModal"));
  // let modalDiv = document.createElement("div");
  let modalDiv = document.getElementById("modal");
  document.body.appendChild(modalDiv);

  const root = createRoot(modalDiv!); 
  root.render(
    <Suspense fallback={<div>Loading</div>}>
      <Modal root={root} title={"MODAL"} />
    </Suspense>
  );


}


