/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface PhemiumCard {
    'buttonText': string;
    'formElement': any;
    'inputFileClass': string;
    'inputFileHidden': boolean;
    'phemiumForm': any;
  }
  interface PhemiumCardAttributes extends StencilHTMLAttributes {
    'buttonText'?: string;
    'formElement'?: any;
    'inputFileClass'?: string;
    'inputFileHidden'?: boolean;
    'onFormCompleted'?: (event: CustomEvent) => void;
    'phemiumForm'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'PhemiumCard': Components.PhemiumCard;
  }

  interface StencilIntrinsicElements {
    'phemium-card': Components.PhemiumCardAttributes;
  }


  interface HTMLPhemiumCardElement extends Components.PhemiumCard, HTMLStencilElement {}
  var HTMLPhemiumCardElement: {
    prototype: HTMLPhemiumCardElement;
    new (): HTMLPhemiumCardElement;
  };

  interface HTMLElementTagNameMap {
    'phemium-card': HTMLPhemiumCardElement
  }

  interface ElementTagNameMap {
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
