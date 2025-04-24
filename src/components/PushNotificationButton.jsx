import React, { useState } from "react";
import { notificationSuscription } from "../api/reserves";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
const PushNotificationButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const publicVapidKey =
    "BOuHRwWTwxWNkpgu68L7bkKQP-20xyO8-s2doI4NnUuYTrVjoO3iOmi--H4zQ0k9Dpihu-o0_RZ-LW588INRwm0";

  // Convierte la clave pública VAPID de Base64 a Uint8Array
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  };

  // Maneja la suscripción para notificaciones push
  const handleSubscription = async () => {
    try {
      // Verifica compatibilidad con Notifications y Service Worker
      if (!("Notification" in window) || !("serviceWorker" in navigator)) {
        alert(
          "Tu navegador no soporta notificaciones push. Por favor, usa un navegador compatible."
        );
        return;
      }

      // Solicitar permisos de notificaciones
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.error("Permiso de notificaciones denegado.");
        alert("Por favor, permite las notificaciones para continuar.");
        return;
      }
      console.log("Permiso de notificaciones concedido.");

      // Verifica la compatibilidad con PushManager
      if (!("PushManager" in window)) {
        alert(
          "Tu navegador no soporta Push Notifications. Intenta actualizarlo o usa otro navegador."
        );
        return;
      }

      // Registra el Service Worker
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registrado correctamente:", registration);

      // Crea la suscripción push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
      console.log("Suscripción creada:", subscription);

      // Envía la suscripción al backend
      const response = await notificationSuscription(subscription);
      if (response.status === 201) {
        console.log("Suscripción enviada al servidor correctamente.");
        setIsSubscribed(true);
      } else {
        console.error("Error al enviar la suscripción al servidor.");
        alert(
          "Hubo un problema al registrar las notificaciones. Intenta más tarde."
        );
      }
    } catch (error) {
      console.error("Error al gestionar la suscripción:", error);
      alert(
        "Ocurrió un error al activar las notificaciones. Por favor, intenta de nuevo."
      );
    }
  };

  return (
      <Button
        onClick={handleSubscription}
        disabled={isSubscribed}
        variant="contained"
        color={isSubscribed ? "success" : "primary"}
        startIcon={
          isSubscribed ? <NotificationsActiveIcon /> : <NotificationsOffIcon />
        }
      >
        {isSubscribed ? "Notificaciones activadas" : "Activar"}
      </Button>
  
  );
};

export default PushNotificationButton;
