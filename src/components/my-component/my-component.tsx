import { Component, State } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {
  @State() form: any;

  componentWillLoad() {
    let userToken: string = "e6eabc1a6036ebf954f679b658635f1e5fddda60";
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

  render() {
    return (
      <phemium-card phemiumForm={this.form}></ phemium-card>
    );
  }
}
