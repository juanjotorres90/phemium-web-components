import { Component, Prop, h, State, Listen, Method } from '@stencil/core';
// import { format } from '../../utils/utils';

declare const window;

@Component({
  tag: 'phemium-push',
  styleUrl: 'phemium-push.css',
  shadow: true
})
export class phemiumPush {
  API_ENDPOINT = 'https://api-dev.phemium.com/v1/api/';
  push: any;
  pushVoip: any;

  @State() notificationBox: any;

  @State() message: string;

  @Prop({ reflectToAttr: true }) active = false;
  @Prop() appId: string;

  @Listen('deviceready', { target: 'document' })
  protected devicereadyHandler(event) {
    console.log('Received the "deviceready" event: ', event);
    this.initPush();
  }

  componentDidLoad() {
    this.draggable(this.notificationBox);
  }

  @Method()
  async showPushInstances() {
    window.console.log(this.push);
    window.console.log(this.pushVoip);
  }

  async initPush() {
    await this.initializePush();
    await this.initializeVoip();
  }

  initializePush(){
    return new Promise((resolve, reject)=>{
      this.push = window.PushNotification.init({
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

  
      this.push.on('registration', async data => {
        // data.registrationId
        window.console.log('registration push');
  
        window.console.log('PUSH REGISTRATION DATA', data);
  
        // const args: any[] = [
        //   {
        //     platform: window.device.platform,
        //     app_id: this.appId,
        //     registration_token: data.registrationId,
        //     device_uuid: window.device.uuid,
        //     ios_environment: ''
        //   }
        // ];
  
        const entity = 'endusers';
        const method = 'update_push_notications_token_info';
        const token = 'a109482b1aeea8effe51f444734428b6c0a17f03';
        let formDataPush = new FormData();
        formDataPush.append('token', token);
        formDataPush.append('entity', entity);
        formDataPush.append('method', method);
        formDataPush.append(
          'arguments',
          `[
            {"platform":"${window.device.platform.toLowerCase()}", 
            "app_id":"${this.appId}",
            "registration_token":"${data.registrationId}",
            "device_uuid":"${window.device.uuid}",
            "ios_environment": "sandbox"}
          ]`
        );
  
        
  
        let response: void | Promise<any>;
        try {
          const res = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            body: formDataPush
          });
          response = await res.json();
          window.console.log(response);
          resolve();
        } catch (error) {
          response = console.error('Error:', error);
          reject();
        }
      });
  
      this.push.on('notification', data => {
        window.console.log('PUSH MESSAGE DATA: ', data.message);
        this.message = data.message;
        this.active = true;
  
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });
  
      this.push.on('error', e => {
        window.console.log('ERROR PUSH: ', e);
  
        // e.message
      });
    })
  }

  initializeVoip(){
    return new Promise((resolve, reject)=>{
      this.pushVoip = window.PushNotification.init({
        android: {
          alert: 'true',
          badge: 'true',
          sound: 'true'
        },
        ios: {
          voip: 'true'
        }
      });

      this.pushVoip.on('registration', async data => {
        // data.registrationId
        window.console.log('registration voip');
        window.console.log('PUSH REGISTRATION DATA', data);
  
        // const args: any[] = [
        //   {
        //     platform: window.device.platform,
        //     app_id: this.appId,
        //     registration_token: data.registrationId,
        //     device_uuid: window.device.uuid,
        //     ios_environment: ''
        //   }
        // ];
  
        const entity = 'endusers';
        const method = 'update_push_notications_token_info';
        const token = 'a109482b1aeea8effe51f444734428b6c0a17f03';
        let formDataPushVoip = new FormData();
        formDataPushVoip.append('token', token);
        formDataPushVoip.append('entity', entity);
        formDataPushVoip.append('method', method);
        formDataPushVoip.append(
          'arguments',
          `[
            {"platform":"${window.device.platform.toLowerCase()}", 
            "app_id":"${this.appId}.voip",
            "registration_token":"${data.registrationId}",
            "device_uuid":"${window.device.uuid}",
            "ios_environment": "sandbox"}
          ]`
        );
  
        let response: void | Promise<any>;
        try {
          const res = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            body: formDataPushVoip
          });
          response = await res.json();
          window.console.log(response);
          resolve();
        } catch (error) {
          response = console.error('Error:', error);
          reject();
        }
      });
  
      this.pushVoip.on('notification', data => {
        window.console.log('PUSH MESSAGE VOIP DATA: ', data.message);
        this.message = data.message;
        this.active = true;
  
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
      });
  
      this.pushVoip.on('error', e => {
        window.console.log('ERROR PUSH: ', e);
        // e.message
      });
    })
  }

  openEnduser() {
    // this.active = false;
    var test_settings = {
      action: null,
      appointment_external_id: null,
      consultation_id: '3',
      customer_id: null,
      enduser_token: 'a109482b1aeea8effe51f444734428b6c0a17f03',
      environment: 'dev',
      extraUseCallkit: 'false',
      face2face: 'false',
      lng: null,
      origin_url: '',
      portal_name: 'CSI',
      service_id: '',
      show_consultations_by_status: null,
      theme: 'csi',
      tls: '0',
      voip_notifications: 'false',
      wkwebview_type: 'ionic'
    };

    console.log(test_settings);

    window.localStorage.setItem('test_settings', JSON.stringify(test_settings));

    var plugin = new window.plugins.PhemiumEnduserPlugin();

    plugin.open_consultation(test_settings);
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
        // el.style.transition = 'left 0.5s, opacity 0.5s';
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
        <span class='w-2/3 text-white break-words font-semibold mt-2'>Medicina general y de familia</span>
        {/* <img src='/assets/arrow-right.svg' class='w-6 absolute right-0 pr-4' alt='' /> */}
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
