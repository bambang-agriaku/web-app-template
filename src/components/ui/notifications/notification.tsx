import { Snackbar, Alert, AlertTitle } from "@mui/material";
import type { AlertProps } from "@mui/material";

export type NotificationType = {
  id: string;
  type: AlertProps["severity"];
  title: string;
  message?: string;
};

export type NotificationProps = {
  notification: NotificationType;
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <Snackbar
      open
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      onClose={() => onDismiss(id)}
      autoHideDuration={6000}
    >
      <Alert
        severity={type}
        onClose={() => onDismiss(id)}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};
