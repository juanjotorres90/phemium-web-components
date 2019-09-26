declare const window;

import { Component, Prop, h, State, Method, Listen } from '@stencil/core';
@Component({
  tag: 'phemium-push',
  styleUrl: 'phemium-push.css',
  shadow: true
})
export class PhemiumPush {
  API_ENDPOINT = 'https://api-dev.phemium.com/v1/api/';
  pushInstance: any;
  pushPayload: any;
  pushVoip: any;
  consultationId: number;

  @State() notificationBox: any;
  @State() message: string;

  @Prop({ reflectToAttr: true }) active = false;
  @Prop() appId: string;
  @Prop() token: string;
  @Prop() phemiumConfig: any;
  @Prop() firebaseConfig: any;

  @Listen('deviceready', { target: 'document' })
  protected async devicereadyHandler() {
    await this.initializePhonegapPush();
  }

  async componentWillLoad() {
    !window.cordova ? this.askForPermissioToReceiveNotifications() : null;
  }

  async componentDidLoad() {
    this.draggable(this.notificationBox);
  }

  componentDidUpdate() {}

  @Method()
  async showPushInstances() {}

  async askForPermissioToReceiveNotifications() {
    const firebase = await import('../../utils/firebase');
    // Initialize Firebase
    firebase.app.initializeApp(this.firebaseConfig);
    try {
      const messaging = firebase.app.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();
      await this.initializePhemiumPush(token);

      // Handle incoming messages. Called when:
      // - a message is received while the app has focus
      // - the user clicks on an app notification created by a service worker
      //   `messaging.setBackgroundMessageHandler` handler.
      messaging.onMessage(payload => {
        if (!payload.data && !payload.data.consultation_id) {
          return;
        }
        this.pushPayload = payload;
        this.consultationId = payload.data.consultation_id;
        if (this.pushPayload.data.type === 'call_request') {
          this.openEnduser();
        } else {
          this.active = true;
        }
      });
      messaging.onTokenRefresh(async () => {
        const token = await messaging.getToken();
        this.initializePhemiumPush(token);
      });
    } catch (error) {
      // console.log(error);
    }
  }

  async initializePhonegapPush() {
    if (!this.token) {
      return;
    }

    this.pushInstance = window.PushNotification.init({
      android: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      },
      ios: {
        alert: 'true',
        badge: 'true',
        sound: 'true'
      }
    });

    this.pushInstance.on('notification', data => {
      // data.message,
      // data.title,
      // data.count,
      // data.sound,
      // data.image,
      // data.additionalData

      if (data.additionalData.foreground) {
        this.consultationId = data.additionalData.consultation_id;
        this.message = data.message;
        this.active = true;
      } else {
        this.consultationId = data.additionalData.consultation_id;
        this.pushPayload = data;
        this.openEnduser();
      }
    });

    this.pushInstance.on('error', e => {
      // e.message
    });

    this.pushInstance.on('registration', async data => {
      // data.registrationId
      await this.initializePhemiumPush(data.registrationId);
    });
  }

  initializePhemiumPush(registrationToken: any) {
    return new Promise(async (resolve, reject) => {
      const entity = 'endusers';
      const method = 'update_push_notications_token_info';
      const token = this.phemiumConfig.token;
      let formDataPush = new FormData();
      formDataPush.append('token', token);
      formDataPush.append('entity', entity);
      formDataPush.append('method', method);
      if (window.cordova) {
        formDataPush.append(
          'arguments',
          `[{
            "platform":"${window.device.platform.toLowerCase()}", 
            "app_id":"${this.appId}",
            "registration_token":"${registrationToken}",
            "device_uuid":"${window.device.uuid}",
            "ios_environment": "sandbox"
          }]`
        );
      } else {
        formDataPush.append(
          'arguments',
          `[{
            "platform":"browser", 
            "app_id":"${this.firebaseConfig.projectId}",
            "registration_token":"${registrationToken}"
          }]`
        );
      }

      let response: void | Promise<any>;
      try {
        const res = await fetch(this.API_ENDPOINT, {
          method: 'POST',
          body: formDataPush
        });
        response = await res.json();
        resolve(registrationToken);
      } catch (error) {
        response = console.error('Error:', error);
        reject(error);
      }
    });
  }

  openEnduser() {
    console.log('PUSH DATA', this.pushPayload);

    if (window.cordova) {
      var test_settings = {
        action: this.pushPayload.data.type === 'call_request' ? 'call_request' : null,
        appointment_external_id: null,
        consultation_id: this.consultationId,
        customer_id: null,
        enduser_token: this.phemiumConfig.token,
        environment: 'dev',
        extraUseCallkit: 'false',
        face2face: 'false',
        lng: null,
        origin_url: '',
        portal_name: this.phemiumConfig.portal,
        service_id: '',
        show_consultations_by_status: null,
        theme: 'csi',
        tls: '0',
        voip_notifications: 'false',
        wkwebview_type: 'ionic'
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
        consultation_id: this.consultationId,
        open_urls_target: 'fsw',
        hide_header: 'false',
        action: this.pushPayload.data.type === 'call_request' ? 'call_request' : null
      };
      console.log('embedder config: ', phemiumConfig);

      const webAppElement = document.querySelector('#phemium-webapp');
      window.phemiumEEL.init(phemiumConfig);
      window.phemiumEEL.consultationLoaded(async () => {
        console.log('loaded');
      });

      window.phemiumEEL.set_iframe(webAppElement);
    }
    this.active = false;
  }

  draggable(el) {
    el.addEventListener('touchstart', e => {
      const offsetX = e.touches[0].clientX - parseInt(window.getComputedStyle(el).left);
      const mouseMoveHandler = e => {
        if (e.touches[0].clientX - offsetX < 0) {
          return;
        }
        el.style.left = e.touches[0].clientX - offsetX + 'px';
      };

      const reset = () => {
        el.style.transition = 'all 0.5s';
        const percentageMoved = (el.offsetLeft / window.innerWidth) * 100;

        if (percentageMoved > 50) {
          el.style.left = '100%';
          setTimeout(() => {
            el.style.left = '0px';
          }, 500);
          this.active = false;
        } else {
          el.style.left = '0px';
        }

        window.removeEventListener('touchmove', mouseMoveHandler);
        window.removeEventListener('touchend', reset);
        setTimeout(() => {
          el.style.transition = 'left 0s, opacity 0.5s';
        }, 500);
      };

      window.addEventListener('touchmove', mouseMoveHandler);
      window.addEventListener('touchend', reset);
    });
  }

  render() {
    return [
      <div
        ref={el => (this.notificationBox = el as HTMLInputElement)}
        id='notificationBox'
        class='w-full h-20 absolute bg-blue-600 flex flex-col justify-center pl-4 items-start cursor-pointer'
        onClick={() => {
          this.openEnduser();
        }}
      >
        <span class='w-2/3 text-white break-words'>{this.message}</span>
        <svg class='w-10 absolute right-0 pr-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path
            fill='white'
            d='M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z'
          />
        </svg>
      </div>
    ];
  }
}
