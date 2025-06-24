import { nanoid } from "nanoid";
import { create } from "zustand";
import type { NotificationType } from "./notification";

type NotificationsStore = {
  notifications: NotificationType[];
  addNotification: (notification: Omit<NotificationType, "id">) => void;
  dismissNotification: (id: string) => void;
};

export const useNotifications = create<NotificationsStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: nanoid(), ...notification },
      ],
    })),
  dismissNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id,
      ),
    })),
}));
