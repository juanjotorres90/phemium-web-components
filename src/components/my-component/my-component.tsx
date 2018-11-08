import { Component, State, Listen } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() form: any;
  @Listen('formCompleted')
  formCompletedHandler(event: CustomEvent) {
    console.log(event.detail);
  }

  componentWillLoad() {
    this.loginCustomer();
  }

  render() {
    return (
      <phemium-card phemiumForm={this.form} inputFileHidden={true}>
        <span slot="file-start">Insertar archivo</span>
      </ phemium-card>
    );
  }

  loginCustomer() {
    let entity = "login";
    let formData = new FormData();
    // formData.append('token', '');
    formData.append('entity', entity);
    formData.append('method', 'login_customer');
    formData.append('arguments', '["cigna","phemium123456"]');

    return fetch("https://api-prerelease.phemium.com/v1/api/",
      {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response);

        this.getPhemiumForm(response)
      });
  }

  getPhemiumForm(token) {
    let userToken: string = token;
    let entity = "cards";
    let formData = new FormData();
    formData.append('token', userToken);
    formData.append('entity', entity);
    formData.append('method', 'get_card_definition');
    formData.append('arguments', '[1]');

    return fetch("https://api-prerelease.phemium.com/v1/api/",
      {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        this.form = response;
      });
  }
}
