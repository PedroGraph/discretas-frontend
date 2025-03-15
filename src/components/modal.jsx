import { useRef } from "react";

const Modal = ({ id, title, children, onClose, onSubmit }) => {
  const dialogRef = useRef(null);

  const closeModal = () => {
    dialogRef.current?.close();
    document.getElementById(id).close();
    if (onClose) onClose();
  };

  return (
    <dialog
      id={id}
      ref={dialogRef}
      className="fixed inset-0 m-auto w-[500px] p-0 rounded-lg backdrop:bg-black/50 dark:bg-slate-800 open:animate-fade-in"
    >
      <form method="dialog" className="flex flex-col" onSubmit={onSubmit}>
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold dark:text-white">{title}</h2>
          {children}
        </div>
        <div className="border-t border-gray-200 p-4 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:text-white"
            onClick={closeModal}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-black text-white dark:bg-[#8941ff] hover:dark:bg-black hover:bg-[#8941ff]"
          >
            Guardar
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default Modal;
