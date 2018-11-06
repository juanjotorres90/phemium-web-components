import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'phemium-card',
    styleUrl: 'phemium-card.css'
})
export class PhemiumCard {

    @Prop() phemiumForm: any;
    @State() formValues: any[] = [];

    componentWillLoad() {
        console.log(this.phemiumForm);
    }

    handleSubmit() {
        console.log(this.formValues);
    }

    handleChange(event) {
        this.formValues[event.target.id] = event.target.value;
    }


    handleSelect(event) {
        this.formValues[event.target.id] = event.target.value;
    }

    render() {
        return (
            <form onSubmit={() => this.handleSubmit()}>
                {this.phemiumForm.fields.map((field) => {
                    if (field.library_field.type == 1) {
                        return <input type="text" onInput={(event) => this.handleChange(event)} />;
                    } else if (field.library_field.type == 3 || field.library_field.type == 4) {
                        return (
                            <select onInput={(event) => this.handleSelect(event)}>
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
                        return <input type="file" />
                    }
                })}
                <input type="submit" />
            </form>
        )
    }
}
