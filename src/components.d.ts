/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface MyComponent {}
  interface MyComponentAttributes extends StencilHTMLAttributes {}

  interface PhemiumCard {
    'formElement': any;
    'inputFileClass': string;
    'inputFileHidden': boolean;
    'phemiumForm': any;
  }
  interface PhemiumCardAttributes extends StencilHTMLAttributes {
    'formElement'?: any;
    'inputFileClass'?: string;
    'inputFileHidden'?: boolean;
    'onFormCompleted'?: (event: CustomEvent) => void;
    'phemiumForm'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'MyComponent': Components.MyComponent;
    'PhemiumCard': Components.PhemiumCard;
  }

  interface StencilIntrinsicElements {
    'my-component': Components.MyComponentAttributes;
    'phemium-card': Components.PhemiumCardAttributes;
  }


  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLPhemiumCardElement extends Components.PhemiumCard, HTMLStencilElement {}
  var HTMLPhemiumCardElement: {
    prototype: HTMLPhemiumCardElement;
    new (): HTMLPhemiumCardElement;
  };

  interface HTMLElementTagNameMap {
    'my-component': HTMLMyComponentElement
    'phemium-card': HTMLPhemiumCardElement
  }

  interface ElementTagNameMap {
    'my-component': HTMLMyComponentElement;
    'phemium-card': HTMLPhemiumCardElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
