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
    console.log('Received the custom todoCompleted event: ', event.detail);
  }

  componentWillLoad() {
    let userToken: string = "b067527c1c42881b2723150001d3cd0eb1108d13";
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

  componentDidLoad() {
    // console.log('forms:: ', document.forms);
  }

  render() {
    return (
      <phemium-card phemiumForm={this.form} inputFileHidden={true}>
        <span slot="file-start">Insertar archivo</span>
      </ phemium-card>
    );
  }
}
