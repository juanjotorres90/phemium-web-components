import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

@Component({
  tag: 'phemium-card',
  styleUrl: 'phemium-card.css',
  shadow: true
})
export class PhemiumCard {
  FIRST_FILE: number = 0;
  cardInputTypes = {
    TEXT: 1,
    SELECT: 3,
    FILE: 17,
    SELECTION: 4
  };
  formValues: any[] = [];
  file: any = {
    item: '',
    fieldId: 0
  };
  initForm: string;
  hasFiles = false;

  @Prop() card: any;
  @Prop() language = 'es';
  @Prop() config = {
    apiEndpoint: '',
    token: '',
    userId: 0,
    hideSubmitButton: false,
    selectionStyle: 'checkbox',
    showStaticText: true,
    soloText: false,
    submitButtonText: 'Continuar',
    maxFileSize: null,
    formStyle: 'single-column',
    inputChecked: false
  };

  @State() fakeInputValue = 'Insertar archivo';

  @Event() formCompleted: EventEmitter;
  @Event() changedCheckbox: EventEmitter;
  @Event() showInformation: EventEmitter;
  @Event() exceedFileSize: EventEmitter;
  @Event() uploadingFiles: EventEmitter;
  @Event() filesUploaded: EventEmitter;

  /**
   *  Resets inputs of type select and initialize array to return with phemium form values
   */
  componentWillUpdate() {
    this.card && this.formValues.length == 0 && this.initForm != this.card.external_id
      ? (this.formValues = this.card.fields.map(field => {
          if (field.library_field.type == 17) {
            return {
              library_field_id: field.library_field_id,
              files: []
            };
          } else {
            return {
              library_field_id: field.library_field_id,
              text: ''
            };
          }
        }))
      : null;
    const phemiumFormElement = document.getElementById('phemiumForm') as HTMLFormElement;
    const formElements = phemiumFormElement ? Array.from(phemiumFormElement.elements) : null;
    if (formElements && this.initForm != this.card.external_id) {
      formElements
        .filter((element: any) => {
          return element.type != 'submit';
        })
        .map((input: any) => {
          input.value = input.type == 'select-one' ? '' : null;
        });
    }
    this.initForm = this.card.external_id;
  }

  /**
   * Function to handle submit event when user finishes inserting values. It uploads resources if needed and emits an event with
   *  an array containing all form values on it, prepared to send to phemium.
   * @param event property event emited by input type submit.
   */
  async handleSubmit(event) {
    event.preventDefault();
    if (this.hasFiles == true) {
      this.uploadingFiles.emit();
      const resource = await this.uploadResource(this.file.item);
      this.filesUploaded.emit();
      this.handleInputChange(resource.resource_id, this.file.fieldId, true);
    }
    this.formCompleted.emit(this.formValues);
    this.hasFiles = false;
  }

  /**
   * Function to handle input values and update the array with them.
   * @param event Property event emited by input.
   * @param libraryFieldId Id of the modified field in the phemium form.
   */
  handleInputChange(event: any, libraryFieldId: number, isFile?: boolean) {
    const inputValue = event.target && event.target.type != 'file' ? event.target.value : event;
    this.formValues
      .filter(field => {
        return field.library_field_id == libraryFieldId;
      })
      .map(fieldValue => {
        if (isFile) {
          fieldValue.files = [...fieldValue.files, { id: event, value: this.fakeInputValue }];
        } else {
          fieldValue.text = inputValue;
        }
      });
  }

  /**
   * Function to handle file input. It takes the file item url and the field id and creates an object with them.
   * It also sets a boolean to true. This boolean is needed to tell handleSubmit() if user has selected a file and proceed with the upload.
   * @param event Property event emited by input.
   * @param libraryFieldId Id of the modified field in the phemium form.
   */
  handleFileChange(event, libraryFieldId) {
    if (this.config.maxFileSize !== null && event.target.files[this.FIRST_FILE].size > this.config.maxFileSize) {
      this.exceedFileSize.emit();
    } else {
      const currentValue = event.target.files[this.FIRST_FILE].name;
      this.file.item = event.target.files[this.FIRST_FILE];
      this.file.fieldId = libraryFieldId;
      this.hasFiles = true;
      this.fakeInputValue = currentValue;
    }
  }

  /**
   * Function to handle checkbox input changes and update phemium form with the values automatically on every change.
   * @param event Property event emited by input.
   * @param libraryFieldId Id of the modified field in the phemium form.
   */
  async handleCheckboxChange(checked, libraryFieldId) {
    const entity = 'cards';
    const method = 'update_field_values';
    let formData = new FormData();
    formData.append('token', this.config.token);
    formData.append('entity', entity);
    formData.append('method', method);

    if (this.config.selectionStyle !== 'toggle' && this.config.selectionStyle !== 'checkbox') {
      formData.append(
        'arguments',
        `[{"enduser_id":${this.config.userId}},[{"library_field_id":${libraryFieldId},"options":[${checked}]}],"es",${
          this.card.id
        },false]`
      );
    } else {
      formData.append(
        'arguments',
        `[{"enduser_id":${this.config.userId}},[{"library_field_id":${libraryFieldId},"options":[${checked}]}],"es",${
          this.card.id
        },false]`
      );
    }

    let response: void | Promise<any>;
    try {
      const res = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        body: formData
      });
      response = await res.json();
    } catch (error) {
      response = console.error('Error:', error);
    }
    if (this.config.selectionStyle !== 'toggle' && this.config.selectionStyle !== 'checkbox') {
      this.changedCheckbox.emit(checked);
    } else {
      this.changedCheckbox.emit(checked);
    }

    return response;
  }

  /**
   * Function designed to handle the upload of a resource to Phemium. It return a resource_url if phemium managed to save the file.
   * @param file Url of the file the function has to upload to phemium.
   * @returns Url of the file saved in phemium
   */
  async uploadResource(file: any) {
    const entity = 'resources';
    const method = 'upload_resource';
    let formData = new FormData();
    formData.append('token', this.config.token);
    formData.append('entity', entity);
    formData.append('method', method);
    formData.append('arguments', `["${file.name}"]`);
    formData.append('file', file);

    let response: void | Promise<any>;
    try {
      const res = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        body: formData
      });
      response = await res.json();
    } catch (error) {
      response = console.error('Error:', error);
    }
    return response;
  }

  /**
   * Function to get the field name to set labels and placeholders
   * @param field Object of the field in phemium form.
   * @param language String with the language the function has to display the field name.
   */
  getFieldName(field: any, language: string) {
    return field.library_field.labels.filter(lang => {
      return (lang.id = language);
    })[0].value;
  }

  /**
   * Function to delete files when user selected one and emit an event in case is needed to make some
   * changes when this action happens.
   */
  handleFileButton(field) {
    if (this.hasFiles) {
      this.file = {
        item: '',
        fieldId: 0
      };
      this.hasFiles = false;
      this.fakeInputValue = 'Inserte un archivo';
    } else {
      this.inputFile(field);
    }
  }
  /**
   *
   * @param field Object of the field in phemium form.
   * Function that takes the static text from a field in the current language.
   */
  getStaticText(field) {
    const staticText = field.library_field.helps.find(text => {
      return text.id == this.language;
    });
    return staticText.value;
  }
  /**
   *
   * @param field Object of the field in phemium form.
   * Function that takes the static text from a field in the current language.
   */
  inputFile(field) {
    const input = document.createElement('input');
    input.type = 'file';
    input.click();
    input.onchange = () => this.handleFileChange(event, field);
  }

  render() {
    if (this.card) {
      return [
        <form id='phemiumForm' class={`w-full ${this.config.formStyle}`} onSubmit={event => this.handleSubmit(event)}>
          {this.card.fields.map(field => {
            const fieldName = this.getFieldName(field, 'es');
            if (field.library_field.type == this.cardInputTypes.TEXT) {
              return (
                <input
                  class='card-field'
                  type='text'
                  placeholder={fieldName}
                  onInput={event => this.handleInputChange(event, field.library_field_id)}
                />
              );
            } else if (field.library_field.type == this.cardInputTypes.SELECT) {
              return [
                <select class='card-field' onInput={event => this.handleInputChange(event, field.library_field_id)}>
                  <option value='' disabled selected hidden>
                    {fieldName}
                  </option>
                  {field.library_field.options.map(option => {
                    return (
                      <option value={option.value}>
                        {option.labels.map(label => {
                          if (label.id == 'es') {
                            return label.value;
                          }
                        })}
                      </option>
                    );
                  })}
                </select>
              ];
            } else if (field.library_field.type == this.cardInputTypes.FILE) {
              return (
                <div class='card-field flex justify-center items-center'>
                  <span
                    id='fakeInputFile'
                    class='w-full h-full cursor-pointer flex items-center bg-white text-left truncate'
                    onClick={() => {
                      this.inputFile(field.library_field_id);
                    }}
                  >
                    {this.fakeInputValue}
                  </span>
                  <svg
                    class={`w-8 cursor-pointer field-file-button ${this.hasFiles ? 'delete-position' : ''}`}
                    onClick={() => this.handleFileButton(field.library_field_id)}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                  >
                    <path d='M346.5 240H272v-74.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-74.5c-8.8 0-16 6-16 16s7.5 16 16 16H240v74.5c0 9.5 7 16 16 16s16-7.2 16-16V272h74.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z' />
                    <path d='M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z' />
                  </svg>
                  {/* {this.hasFiles ? <div class='fake-button' onClick={() => this.handleFileButton()} /> : null} */}
                </div>
              );
            } else if (field.library_field.type == this.cardInputTypes.SELECTION) {
              //13
              if (this.config.selectionStyle === 'toggle') {
                return (
                  <div class='card-field'>
                    <span class=''>{fieldName}</span>
                    <label class='switch'>
                      <input
                        id={field.library_field.identification}
                        type='checkbox'
                        onChange={(event: any) => this.handleCheckboxChange(event.target.checked, field.library_field_id)}
                      />
                      <span class='slider round' />
                    </label>
                  </div>
                );
              } else if (this.config.selectionStyle === 'checkbox') {
                return (
                  <div class='card-field flex justify-between items-center'>
                    <div class='flex'>
                      <input
                        type='checkbox'
                        class=''
                        checked={this.config.inputChecked}
                        onChange={(event: any) => this.handleCheckboxChange(event.target.checked, field.library_field_id)}
                      />
                      <span class='ml-2'>Condiciones legales</span>
                    </div>
                    <span
                      class='cursor-pointer inner-button'
                      onClick={() => {
                        this.showInformation.emit();
                      }}
                    >
                      Ver
                    </span>
                  </div>
                );
              } else {
                if (!this.config.soloText) {
                  return (
                    <div class='w-full flex justify-center items-center mt-4 p-8'>
                      <div class='flex justify-between w-1/2'>
                        <button
                          id='refuseButton'
                          class='refuse-button'
                          onClick={() => this.handleCheckboxChange(false, field.library_field_id)}
                        >
                          Descartar
                        </button>
                        <button
                          id='acceptButton'
                          class='accept-button'
                          onClick={() => this.handleCheckboxChange(true, field.library_field_id)}
                        >
                          Aceptar
                        </button>
                      </div>
                    </div>
                  );
                }
              }
            } else if (field.library_field.type == 12 && this.config.showStaticText) {
              return <div class='static-text-container' innerHTML={this.getStaticText(field)} />;
            }
          })}
          {!this.config.hideSubmitButton ? (
            <input class='submit-button outline-none cursor-pointer' type='submit' value={this.config.submitButtonText} />
          ) : null}
        </form>
      ];
    } else {
      return null;
    }
  }
}
