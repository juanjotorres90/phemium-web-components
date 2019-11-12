declare const window;

import {
  Component,
  Prop,
  h,
  State,
  Method,
  Event,
  EventEmitter
} from "@stencil/core";
@Component({
  tag: "phemium-push",
  styleUrl: "phemium-push.css",
  shadow: true
})
export class PhemiumPush {
  @Prop({ reflectToAttr: true }) active = false;
  @Prop() showNotification = false;
  @Prop() customHandler = false;

  @State() notificationBox: any;
  @State() title: string;
  @State() message: string;

  @Event() onNotification: EventEmitter<any>;

  API_ENDPOINT: string;
  pushInstance: any;
  pushPayload: any;
  pushVoip: any;
  appID: string;
  phemiumConfig: any;
  firebaseConfig: any;

  async componentDidLoad() {
    this.draggable(this.notificationBox);
  }

  @Method()
  async initialize(phemiumConfig: any, firebaseConfig: any, appID: string) {
    this.phemiumConfig = phemiumConfig;
    this.API_ENDPOINT = `https://api-${this.phemiumConfig.environment}.phemium.com/v1/api/`;
    this.firebaseConfig = firebaseConfig;
    this.appID = appID;
    !window.cordova
      ? await this.askForPermissionToReceiveNotifications()
      : await this.initializePhonegapPush();
  }

  async askForPermissionToReceiveNotifications() {
    const firebase = await import("../../utils/firebase");
    // Initialize Firebase
    firebase.app.initializeApp(this.firebaseConfig);
    try {
      const messaging = firebase.app.messaging();
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await messaging.getToken();
        console.log("Your registration token is: ", token);
        await this.initializePhemiumPush(token);

        // Handle background received notifications.
        navigator.serviceWorker.addEventListener("message", event => {
          if (!event.data.fromBackground) {
            return;
          }
          this.receivedNotificationData(event.data);
        });

        // Handle incoming messages. Called when:
        // - a message is received while the app has focus
        // - the user clicks on an app notification created by a service worker
        //   `messaging.setBackgroundMessageHandler` handler.
        messaging.onMessage(payload => {
          this.receivedNotificationData(payload);
        });

        messaging.onTokenRefresh(async () => {
          const token = await messaging.getToken();
          this.initializePhemiumPush(token);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async initializePhonegapPush() {
    if (!this.phemiumConfig.token) {
      return;
    }

    this.pushInstance = window.PushNotification.init({
      android: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      }
    });

    this.pushInstance.on("notification", data => {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData

      console.log("Notification received: ", data);
      this.receivedNotificationData(data);
    });

    this.pushInstance.on("error", e => {
      console.log(e.message);
    });

    this.pushInstance.on("registration", async data => {
      console.log("Your registration token is: ", data.registrationId);
      await this.initializePhemiumPush(data.registrationId);
    });
  }

  initializePhemiumPush(registrationToken: any) {
    return new Promise(async (resolve, reject) => {
      const entity = "endusers";
      const method = "update_push_notications_token_info";
      const token = this.phemiumConfig.token;
      let formDataPush = new FormData();
      formDataPush.append("token", token);
      formDataPush.append("entity", entity);
      formDataPush.append("method", method);
      if (window.cordova) {
        formDataPush.append(
          "arguments",
          `[{
            "platform":"${window.device.platform.toLowerCase()}", 
            "app_id":"${this.appID}",
            "registration_token":"${registrationToken}",
            "device_uuid":"${window.device.uuid}",
            "ios_environment": "sandbox"
          }]`
        );
      } else {
        formDataPush.append(
          "arguments",
          `[{
            "platform":"browser",
            "app_id":"${this.firebaseConfig.projectId}",
            "registration_token":"${registrationToken}"
          }]`
        );
      }

      try {
        const res = await fetch(this.API_ENDPOINT, {
          method: "POST",
          body: formDataPush
        });
        await res.json();
        console.log("Phemium push notifications initialized correctly");
        resolve(registrationToken);
      } catch (error) {
        console.error(
          "Error initalizing Phemium push notifications. Error: ",
          error
        );
        reject(error);
      }
    });
  }

  receivedNotificationData(payload) {
    if (!payload.data && !payload.additionalData) {
      return;
    }

    // Transform data to have the same structure on all platforms
    this.pushPayload = {
      data: payload.data || payload.additionalData,
      message: payload.message || payload.data.body,
      title: payload.data
        ? payload.data.title
        : payload.title || this.phemiumConfig.portal
    };

    // Parse params in case of string to check later if consultation id is present
    if (
      this.pushPayload.data.params &&
      typeof this.pushPayload.data.params === "string"
    ) {
      this.pushPayload.data.params = JSON.parse(this.pushPayload.data.params);
    }

    // Check if it is a phemium push notification by locating consultation_id in params
    if (
      !this.pushPayload.data.params ||
      !this.pushPayload.data.params.phemium
    ) {
      return;
    }

    // Trigger handler or show notification depending on settings or push type
    if (
      this.pushPayload.data.type === "CONSULTATION_CALL_REQUEST" ||
      !this.showNotification
    ) {
      this.onNotificationHandler();
    } else {
      this.title = this.pushPayload.title;
      this.message = this.pushPayload.message;
      this.active = true;
    }
  }

  onNotificationHandler() {
    if (this.customHandler || !window.cordova) {
      this.onNotification.emit(this.pushPayload);
    } else {
      this.openEnduser();
    }
    this.active = false;
  }

  openEnduser() {
    if (window.cordova) {
      var test_settings = {
        action:
          this.pushPayload.data.type === "CONSULTATION_CALL_REQUEST"
            ? "call_request"
            : null,
        appointment_external_id: null,
        consultation_id: this.pushPayload.data.params.consultation_id,
        customer_id: null,
        enduser_token: this.phemiumConfig.token,
        environment: this.phemiumConfig.environment,
        extraUseCallkit: "false",
        face2face: "false",
        lng: null,
        origin_url: "",
        portal_name: this.phemiumConfig.portal,
        service_id: "",
        show_consultations_by_status: null,
        theme: "csi",
        tls: "0",
        voip_notifications: "false",
        wkwebview_type: "ionic"
      };
      const plugin = new window.plugins.PhemiumEnduserPlugin();
      plugin.open_consultation(test_settings);
    } else {
      // window.phemiumEEL.set_callback('redirect', () => {
      //   this.router.navigateByUrl('consultations');
      // });
      const phemiumConfig = {
        phemium_environment_url: this.API_ENDPOINT,
        customer: this.phemiumConfig.customer, //dubto
        portal: this.phemiumConfig.portal,
        token: this.phemiumConfig.token,
        enduser_id: this.phemiumConfig.enduser_id,
        consultation_id: this.pushPayload.data.params.consultation_id,
        open_urls_target: "fsw",
        hide_header: "false",
        action:
          this.pushPayload.data.type === "CONSULTATION_CALL_REQUEST"
            ? "call_request"
            : null
      };
      console.log("embedder config: ", phemiumConfig);

      // const webAppElement = document.querySelector('#phemium-webapp');
      const webAppElement = document.createElement("div");
      webAppElement.id = "#phemium-webapp";
      webAppElement.style.width = "100vw";
      webAppElement.style.height = "100vh";
      webAppElement.style.position = "absolute";
      document.body.appendChild(webAppElement);
      window.phemiumEEL.init(phemiumConfig);
      window.phemiumEEL.consultationLoaded(async () => {
        console.log("loaded");
      });

      window.phemiumEEL.set_iframe(webAppElement);
    }
  }

  draggable(el) {
    el.addEventListener("touchstart", e => {
      const offsetX =
        e.touches[0].clientX - parseInt(window.getComputedStyle(el).left);
      const mouseMoveHandler = e => {
        if (e.touches[0].clientX - offsetX < 0) {
          return;
        }
        el.style.left = e.touches[0].clientX - offsetX + "px";
      };

      const reset = () => {
        el.style.transition = "all 0.5s";
        const percentageMoved = (el.offsetLeft / window.innerWidth) * 100;

        if (percentageMoved > 50) {
          el.style.left = "100%";
          setTimeout(() => {
            el.style.left = "0px";
          }, 500);
          this.active = false;
        } else {
          el.style.left = "0px";
        }

        window.removeEventListener("touchmove", mouseMoveHandler);
        window.removeEventListener("touchend", reset);
        setTimeout(() => {
          el.style.transition = "left 0s, opacity 0.5s";
        }, 500);
      };

      window.addEventListener("touchmove", mouseMoveHandler);
      window.addEventListener("touchend", reset);
    });
  }

  render() {
    return [
      <div
        ref={el => (this.notificationBox = el as HTMLDivElement)}
        id="notificationBox"
        class="w-full h-20 absolute notification--color flex flex-col justify-center pl-4 items-start cursor-pointer"
        onClick={() => {
          this.onNotificationHandler();
        }}
      >
        <span class="w-2/3 text-white break-words">{this.title}</span>
        <span class="w-2/3 text-white break-words">{this.message}</span>
        <svg
          class="w-10 absolute right-0 pr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="white"
            d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"
          />
        </svg>
      </div>
    ];
  }
}
