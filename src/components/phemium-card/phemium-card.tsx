import { Component, Prop, Event, EventEmitter, State, h } from '@stencil/core';

@Component({
  tag: 'phemium-card',
  styleUrl: 'phemium-card.css'
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
  @Prop() config: any;
  @Prop() language: string;
  @Prop() inputChecked: boolean;

  @State() fakeInputValue = 'Insertar archivo';

  @Event() formCompleted: EventEmitter;
  @Event() changedCheckbox: EventEmitter;
  @Event() showInformation: EventEmitter;
  @Event() addFiles: EventEmitter;
  @Event() exceedFileSize: EventEmitter;
  @Event() deleteFiles: EventEmitter;
  @Event() uploadingFiles: EventEmitter;
  @Event() filesUploaded: EventEmitter;

  /**
   *  Resets inputs of type select and initialize array to return with phemium form values
   */
  componentWillUpdate() {
    // console.log(this.phemiumForm);
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
    // console.log(this.formValues);
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
      this.fakeInputValue = currentValue;
      this.file.item = event.target.files[this.FIRST_FILE];
      this.file.fieldId = libraryFieldId;
      this.hasFiles = true;
      this.addFiles.emit();
    }
  }

  /**
   * Function to handle checkbox input changes and update phemium form with the values automatically on every change.
   * @param event Property event emited by input.
   * @param libraryFieldId Id of the modified field in the phemium form.
   */
  async handleCheckboxChange(event, libraryFieldId) {
    const entity = 'cards';
    const method = 'update_field_values';
    let formData = new FormData();
    formData.append('token', this.config.token);
    formData.append('entity', entity);
    formData.append('method', method);
    if (!this.config.toggleStyle && !this.config.checkboxStyle) {
      formData.append(
        'arguments',
        `[{"enduser_id":${this.config.userId}},[{"library_field_id":${libraryFieldId},"options":[${event}]}],"es",${
          this.card.id
        },false]`
      );
    } else {
      formData.append(
        'arguments',
        `[{"enduser_id":${this.config.userId}},[{"library_field_id":${libraryFieldId},"options":[${event.target.checked}]}],"es",${
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
    if (!this.config.toggleStyle && !this.config.checkboxStyle) {
      this.changedCheckbox.emit(event);
    } else {
      this.changedCheckbox.emit(event.target.checked);
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
  handleFileButton() {
    if (this.hasFiles) {
      this.file = {
        item: '',
        fieldId: 0
      };
      this.hasFiles = false;
      this.fakeInputValue = '';
      (document.getElementById('mainInputFile') as HTMLFormElement).value = '';
      this.deleteFiles.emit();
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
        <form id='phemiumForm' class='main-form' onSubmit={event => this.handleSubmit(event)}>
          {this.card.fields.map(field => {
            const fieldName = this.getFieldName(field, 'es');
            if (field.library_field.type == this.cardInputTypes.TEXT) {
              return (
                <input
                  class='form-field'
                  type='text'
                  placeholder={fieldName}
                  onInput={event => this.handleInputChange(event, field.library_field_id)}
                />
              );
            } else if (field.library_field.type == this.cardInputTypes.SELECT) {
              return [
                <select class='form-field' onInput={event => this.handleInputChange(event, field.library_field_id)}>
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
                <div
                  class='fake-inut-file-container'
                  onClick={() => {
                    this.inputFile(field.library_field_id);
                  }}
                >
                  <input id='fakeInputFile' class='form-field file-field' value={this.fakeInputValue} disabled />
                  {/* {this.hasFiles ? <div class='fake-button' onClick={() => this.handleFileButton()} /> : null} */}
                </div>
              );
            } else if (field.library_field.type == this.cardInputTypes.SELECTION) {
              //13
              if (this.config.toggleStyle) {
                return (
                  <div class='notifications-checkbox-container'>
                    <span class='notifications-text'>{fieldName}</span>
                    <label class='switch notifications-toggle'>
                      <input
                        id={field.library_field.identification}
                        type='checkbox'
                        onChange={event => this.handleCheckboxChange(event, field.library_field_id)}
                      />
                      <span class='slider round' />
                    </label>
                  </div>
                );
              } else if (this.config.checkboxStyle) {
                return (
                  <div class='terms-checkbox-container'>
                    <input
                      type='checkbox'
                      class='input-checkbox-style'
                      checked={this.inputChecked}
                      onChange={event => this.handleCheckboxChange(event, field.library_field_id)}
                    />
                    <span class='terms-text'>Condiciones legales</span>
                    <span
                      class='see-terms'
                      onClick={() => {
                        this.showInformation.emit();
                      }}
                    >
                      Ver
                    </span>
                  </div>
                );
              } else {
                console.log(this.config.soloText);
                if (!this.config.soloText) {
                  return (
                    <div class='list-buttons-container'>
                      <button
                        id='refuseButton'
                        class='list-button'
                        onClick={() => this.handleCheckboxChange(false, field.library_field_id)}
                      >
                        Descartar
                      </button>
                      <button
                        id='acceptButton'
                        class='list-button'
                        onClick={() => this.handleCheckboxChange(true, field.library_field_id)}
                      >
                        Aceptar
                      </button>
                    </div>
                  );
                }
              }
            } else if (field.library_field.type == 12 && this.config.showStaticText) {
              return <div class='static-text-container' innerHTML={this.getStaticText(field)} />;
            }
          })}
          {!this.config.hideSubmitButton ? <input class='form-submit' type='submit' value={this.config.buttonText} /> : null}
        </form>
      ];
    } else {
      return null;
    }
  }
}
