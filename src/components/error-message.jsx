import { Button } from "@heroui/react";
import { AlertCircle } from "lucide-react";

export default function ErrorMessage({
  message = "Bir hata oluştu",
  onRetry,
  fullScreen = false,
}) {
  const content = (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full bg-danger/10 dark:bg-danger/20">
          <AlertCircle className="w-12 h-12 text-danger" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-foreground">Hata!</h2>
      <p className="text-default-500 mb-6 max-w-md mx-auto">{message}</p>
      {onRetry && (
        <Button color="primary" onClick={onRetry}>
          Tekrar Dene
        </Button>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center items-center p-8">{content}</div>;
}
