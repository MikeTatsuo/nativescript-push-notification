import { Component, OnInit } from "@angular/core";

import * as firebase from 'nativescript-plugin-firebase';

@Component({
  selector: "ns-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.init({
      showNotifications: true,
      showNotificationsWhenInForeground: true,
      onPushTokenReceivedCallback: (token) => {
        console.log("Firebase plugin received a push token: " + token);
      },
      onMessageReceivedCallback: (message: firebase.Message) => {
        console.log("Push message received: " + JSON.stringify(message));
      }
    }).then(() => console.log("Registered for push"))
      .catch(error => console.log("Push message erro: ", { error }));
  }
}
