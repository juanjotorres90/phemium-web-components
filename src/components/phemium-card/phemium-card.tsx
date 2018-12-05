import { Component, Prop, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "phemium-card",
  styleUrl: "phemium-card.css"
})
export class PhemiumCard {
  @Prop() phemiumForm: any;
  @Prop() inputFileHidden: boolean = false;
  @Prop() buttonText: string;
  @Prop({ mutable: true }) inputFileClass: string;
  @Prop({ mutable: true }) formElement: any;
  @State() formValues: any[] = [];

  @Event() formCompleted: EventEmitter;

  componentWillLoad() {
    this.inputFileHidden ? (this.inputFileClass = "input-hidden") : "input-visible";
  }
  componentWillUpdate() {
    // console.log(this.phemiumForm);
    const formElements = Array.from((document.getElementById("phemiumForm") as HTMLFormElement).elements);
    formElements.filter((element: any) => {
      return element.type != 'submit';
    }).map((input: any) => {
      input.value = input.type == "select-one" ? "" : null;
    })
  }

  componentDidUpdate() {
    this.phemiumForm && this.formValues.length == 0 ? this.formValues = this.phemiumForm.fields.map((field) => {
      return {
        library_field_id: field.library_field_id,
        text: ""
      }
    }) : null;
  }

  handleSubmit(event) {
    event.preventDefault();
    this.formCompleted.emit(this.formValues);
  }

  handleInputChange(event, libraryFieldId) {
    this.formValues.filter((field) => {
      return field.library_field_id == libraryFieldId;
    }).map((fieldValue) => {
      console.log(fieldValue);

      fieldValue.text = event.target.value;
    })
    event.target.type == "file" ? (document.getElementById('fakeInputFile') as HTMLInputElement).value = event.target.value : null;
  }

  render() {
    if (this.phemiumForm) {
      return [
        <form id="phemiumForm" class="main-form" onSubmit={event => this.handleSubmit(event)}>
          {this.phemiumForm.fields.map((field) => {
            if (field.library_field.type == 1) {
              return (
                <input
                  class="form-field"
                  type="text"
                  placeholder={
                    field.library_field.labels.filter(language => {
                      return (language.id = "es");
                    })[0].value
                  }
                  onInput={event => this.handleInputChange(event, field.library_field_id)}
                />
              );
            } else if (field.library_field.type == 3 || field.library_field.type == 4) {
              return [
                <select class="form-field" onInput={event => this.handleInputChange(event, field.library_field_id)}>
                  <option value="" disabled selected hidden>
                    {field.library_field.labels.filter(language => {
                      return (language.id = "es");
                    })[0].value}
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
                  <input id="fakeInputFile" class="form-field file-field" value="Insertar archivo" />
                  <input class={`${this.inputFileClass} form-field`} type="file" onInput={event => this.handleInputChange(event, field.library_field_id)} />
                  <slot name="file-end" />
                </div>
              ];
            }
          })}
          <input class="form-submit" type="submit" value={this.buttonText} />
        </form>
      ];
    } else {
      return null;
    }
  }
}
