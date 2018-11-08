import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'phemium-card',
    styleUrl: 'phemium-card.css'
})
export class PhemiumCard {

    @Prop() phemiumForm: any;
    @State() formValues: any[] = [];
    @Prop() inputFileHidden: boolean = false;
    @Prop({ mutable: true }) inputFileClass: string;
    @Prop({ mutable: true }) formElement: any;

    @Event() formCompleted: EventEmitter;

    componentWillLoad() {
        // console.log(this.phemiumForm);
        this.inputFileHidden ? this.inputFileClass = 'input-hidden' : 'input-visible';
    }

    handleSubmit(event) {
        event.preventDefault();
        this.formCompleted.emit([...event.target.elements].filter((element) => {
            return element.type != 'submit';
        }).map((input) => {
            return input.value;
        }));
    }

    handleChange(event, fieldId) {
        this.formValues[fieldId] = event.target.value;
    }


    handleSelect(event, fieldId) {
        this.formValues[fieldId] = event.target.value;
    }

    render() {
        if (this.phemiumForm) {
            return [
                <form id="phemiumForm" class="main-form" onSubmit={(event) => this.handleSubmit(event)}>
                    {this.phemiumForm.fields.map((field, index) => {
                        if (field.library_field.type == 1) {
                            return <input class="form-field" type="text" onInput={(event) => this.handleChange(event, index)} />;
                        } else if (field.library_field.type == 3 || field.library_field.type == 4) {
                            return (
                                <select class="form-field" onInput={(event) => this.handleSelect(event, index)}>
                                    {field.library_field.options.map((option) => {
                                        return <option value={option.value}>{option.labels.map((label) => {
                                            if (label.id == "es") {
                                                return label.value;
                                            }
                                        })}</option>
                                    })}
                                </select>
                            )
                        } else if (field.library_field.type == 17) {
                            return [
                                <div class="form-field file-field">
                                    <slot name="file-start"></slot>
                                    <input class={this.inputFileClass} type="file" />
                                    <slot name="file-end"></slot>
                                </div>
                            ]
                        }
                    })}
                    <input class="form-submit" type="submit" />
                </form>
            ]
        }
    }
}
