import { Component, Prop, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "phemium-card",
  styleUrl: "phemium-card.css"
})
export class PhemiumCard {

  @Prop() API_ENDPOINT: string;
  @Prop() FIRST_FILE: number = 0;
  @Prop() phemiumForm: any;
  @Prop() showSubmitButton: boolean = true;
  @Prop() userId: number;
  @Prop() userToken: string;
  @Prop() inputFileHidden: boolean = false;
  @Prop() buttonText: string;
  @Prop({ mutable: true }) inputFileClass: string;
  @Prop({ mutable: true }) formElement: any;
  @Prop({ mutable: true }) fakeInputValue: string = "Insertar archivo";
  @State() formValues: any[] = [];
  @State() hasFiles: boolean = false;
  @State() file: any = {
    item: "",
    fieldId: 0
  };

  @Event() formCompleted: EventEmitter;

  componentWillLoad() {

  }

  // Resets inputs of type select and initialize array to return with phemium form values
  componentWillUpdate() {
    // console.log(this.phemiumForm);
    this.inputFileClass = this.inputFileHidden ? "input-hidden" : "input-visible";
    this.phemiumForm && this.formValues.length == 0 ? this.formValues = this.phemiumForm.fields.map((field) => {
      return {
        library_field_id: field.library_field_id,
        text: ""
      }
    }) : null;
    const phemiumFormElement = (document.getElementById("phemiumForm") as HTMLFormElement);
    const formElements = phemiumFormElement ? Array.from(phemiumFormElement.elements) : null;
    if (formElements) {
      formElements.filter((element: any) => {
        return element.type != 'submit';
      }).map((input: any) => {
        input.value = input.type == "select-one" ? "" : null;
      })
    }
  }

  // Function to handle submit event when user finishes inserting values. It uploads resources if needed and emits an event with 
  // an array containing all form values on it, prepared to send to phemium.
  async handleSubmit(event) {
    event.preventDefault();
    if (this.hasFiles == true) {
      const resource = await this.uploadResource(this.file.item);
      this.handleInputChange(resource.resource_url, this.file.fieldId);
    }
    this.formCompleted.emit(this.formValues);
    this.hasFiles = false;
  }

  // Function to handle input values and update the array with them
  handleInputChange(event, libraryFieldId) {
    const inputValue = event.target && event.target.type != "file" ? event.target.value : event;
    this.formValues.filter((field) => {
      return field.library_field_id == libraryFieldId;
    }).map((fieldValue) => {
      fieldValue.text = inputValue;
    })
  }

  // Function to handle file input. It takes the file item url and the field id and creates an object with them.
  // It also sets a boolean to true. This boolean is needed to tell handleSubmit() if user has selected a file and proceed with the upload.
  handleFileChange(event, libraryFieldId) {
    const currentValue = event.target.value;
    this.fakeInputValue = currentValue;
    this.file.item = event.target.files[this.FIRST_FILE];
    this.file.fieldId = libraryFieldId;
    this.hasFiles = true;
  }

  //Function to handle checkbox input changes and update phemium form with the values automatically on every change.
  async handleCheckboxChange(event, libraryFieldId) {
    const entity = "cards";
    const method = "update_field_values";
    let formData = new FormData();
    formData.append('token', this.userToken);
    formData.append('entity', entity);
    formData.append('method', method);
    formData.append('arguments', `[{"enduser_id":${this.userId}},[{"library_field_id":${libraryFieldId},"text":"${event.target.checked}"}],"es",${this.phemiumForm.id},false]`);

    let response: void | Promise<any>;
    try {
      const res = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        body: formData
      });
      response = await res.json();
    }
    catch (error) {
      response = console.error('Error:', error);
    }
    return response;
  }

  // Function designed to handle the upload of a resource to Phemium. It return a resource_url if phemium managed to save the file.
  async uploadResource(file: any) {
    const entity = "resources";
    const method = "upload_resource";
    let formData = new FormData();
    formData.append('token', this.userToken);
    formData.append('entity', entity);
    formData.append('method', method);
    formData.append('arguments', `["${file.name}"]`);
    formData.append('file', file);

    let response: void | Promise<any>;
    try {
      const res = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        body: formData
      });
      response = await res.json();
    }
    catch (error) {
      response = console.error('Error:', error);
    }
    return response;
  }

  //Function to get the field name to set labels and placeholders
  getFieldName(field: any, language: string) {
    return field.library_field.labels.filter(lang => {
      return (lang.id = language);
    })[0].value;
  }

  render() {
    if (this.phemiumForm) {
      return [
        <form id="phemiumForm" class="main-form" onSubmit={(event) => this.handleSubmit(event)}>
          {this.phemiumForm.fields.map((field) => {
            const fieldName = this.getFieldName(field, "es");
            if (field.library_field.type == 1) {
              return (
                <input
                  class="form-field"
                  type="text"
                  placeholder={fieldName}
                  onInput={(event) => this.handleInputChange(event, field.library_field_id)} />
              );
            } else if (field.library_field.type == 3 || field.library_field.type == 4) {
              return [
                <select class="form-field" onInput={(event) => this.handleInputChange(event, field.library_field_id)}>
                  <option value="" disabled selected hidden>
                    {fieldName}
                  </option>
                  {field.library_field.options.map(option => {
                    return (
                      <option value={option.value}>
                        {option.labels.map(label => {
                          if (label.id == "es") {
                            return label.value;
                          }
                        })}
                      </option>
                    );
                  })}
                </select>
              ];
            } else if (field.library_field.type == 17) {
              return [
                <div class="fake-inut-file-container">
                  <input id="fakeInputFile" class="form-field file-field" value={this.fakeInputValue} />
                  <input type="file" class={`${this.inputFileClass} form-field`}
                    onChange={(event) => this.handleFileChange(event, field.library_field_id)} />
                  <slot name="file-end" />
                </div>
              ];
            } else if (field.library_field.type == 13) {
              return [
                <div class="input-checkbox-container">
                  <span class="notifications-text">
                    {fieldName}
                  </span>
                  <label class="switch notifications-toggle">
                    <input id={field.library_field.identification} type="checkbox" onChange={(event) => this.handleCheckboxChange(event, field.library_field_id)} />
                    <span class="slider round"></span>
                  </label>
                </div>
              ];
            }
          })}
          {this.showSubmitButton ? <input class="form-submit" type="submit" value={this.buttonText} /> : null}
        </form>
      ];
    } else {
      return null;
    }
  }
}
