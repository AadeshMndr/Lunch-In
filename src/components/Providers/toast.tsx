import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

const ToastProvider: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" richColors={true} />
      {children}
    </>
  );
};

export default ToastProvider;
