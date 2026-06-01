export function isPushSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window
}

export function getPushPermission(): NotificationPermission | "unsupported" {
  if (!isPushSupported()) return "unsupported"
  return Notification.permission
}

export async function requestPushPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) return "denied"
  if (Notification.permission === "granted") return "granted"
  return await Notification.requestPermission()
}

export function sendPushNotification(title: string, body: string, icon = "/favicon.ico"): void {
  if (!isPushSupported() || Notification.permission !== "granted") return
  try {
    new Notification(title, { body, icon })
  } catch {
    // Safari may throw in some contexts — silently ignore
  }
}
