import { Spinner } from "@heroui/react";

export default function Loading({
  fullScreen = false,
  size = "lg",
  text = "Yükleniyor...",
}) {
  if (fullScreen) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <div className="text-center">
          <Spinner size={size} color="primary" />
          <p className="mt-4 text-default-500">{text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-8">
      <Spinner size={size} color="primary" />
    </div>
  );
}
