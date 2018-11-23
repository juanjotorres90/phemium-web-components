import { Component, Prop, State, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "phemium-card",
  styleUrl: "phemium-card.css"
})
export class PhemiumCard {
  @Prop() phemiumForm: any;
  @State() formValues: any[] = [];
  @Prop() inputFileHidden: boolean = false;
  @Prop() buttonText: string;
  @Prop({ mutable: true }) inputFileClass: string;
  @Prop({ mutable: true }) formElement: any;

  @Event() formCompleted: EventEmitter;

  componentWillLoad() {
    console.log(this.phemiumForm);
    this.inputFileHidden ? (this.inputFileClass = "input-hidden") : "input-visible";
  }
  componentWillUpdate() {
    const formElements = Array.from((document.getElementById("phemiumForm") as HTMLFormElement).elements);
    formElements.filter((element: any) => {
      return element.type != 'submit';
    }).map((input: any) => {
      input.value = input.type == "select-one" ? "" : null;
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const elements = Array.from(event.target.elements);
    const values = elements
      .filter((element: any) => {
        return element.type != "submit";
      })
      .map((input: any) => {
        return input.value;
      });
    console.log("values: ", values);

    this.formCompleted.emit(values);
  }

  handleChange(event, fieldId) {
    this.formValues[fieldId] = event.target.value;
  }

  handleSelect(event, fieldId) {
    this.formValues[fieldId] = event.target.value;
  }

  handleInputFile(event, fieldId) {
    this.formValues[fieldId] = event.target.value;
    console.log(event);
    (document.getElementById('fakeInputFile') as HTMLInputElement).value = event.target.value;
  }

  render() {
    if (this.phemiumForm) {
      return [
        <form id="phemiumForm" class="main-form" onSubmit={event => this.handleSubmit(event)}>
          {this.phemiumForm.fields.map((field, index) => {
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
                  onInput={event => this.handleChange(event, index)}
                />
              );
            } else if (field.library_field.type == 3 || field.library_field.type == 4) {
              return [
                <select class="form-field" onInput={event => this.handleSelect(event, index)}>
                  <option value="" disabled selected hidden>
                    Motivo
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
                  <input class={`${this.inputFileClass} form-field`} type="file" onInput={event => this.handleInputFile(event, index)} />
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
