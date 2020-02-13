import { Component, OnInit } from "@angular/core";
import { messaging, Message } from "nativescript-plugin-firebase/messaging";

require("nativescript-plugin-firebase");

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  ngOnInit() {
    console.log(`Notifications enabled? ${messaging.areNotificationsEnabled()}`);

    messaging.registerForPushNotifications({
      onPushTokenReceivedCallback: (token: string): void => {
        console.log("Firebase plugin received a push token: " + token);
      },

      onMessageReceivedCallback: (message: Message) => {
        console.log("Push message received: ", JSON.stringify(message));
      },

      // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
      showNotifications: true,

      // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
      showNotificationsWhenInForeground: true
    }).then(() => console.log("Registered for push"));

    messaging.getCurrentPushToken()
      .then(token => console.log(`Current push token: ${token}`));
    
    messaging.addOnMessageReceivedCallback(message => {
      console.log('addOnMessageReceived: ', JSON.stringify(message));
      
    })
  }
}
