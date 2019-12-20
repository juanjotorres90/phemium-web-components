# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.4] - 2019-12-23

### Changed

- Check if foreground was false or coldstart was true when new notification is received in order to open directly enduser.

## [1.1.3] - 2019-12-19

### Changed

- Delete unnecessary enduser_id from open_consultation.

## [1.1.2] - 2019-12-18

### Fixed

- Fix unit test for firebase initialization task.
- Configurable iOS environment.

## [1.1.1] - 2019-11-29

### Changed

- Change settings passed to phemium enduser mobile to open consultation on app.

## [1.1.0] - 2019-11-20

### Added

- Add phemium-push web component.

## [1.0.6] - 2019-09-19

### Fixed

- Add prevent default on some buttons to avoid errors.

## [1.0.5] - 2019-09-17

### Changed

- Change the way how the form handles submit. It now has a public method to manage sumbit and emit an event with field values.

## [1.0.4] - 2019-09-17

### Changed

- Fix minor style issues.

### Added

- Add padding css variable to submit button.

## [1.0.3] - 2019-09-10

### Added

- Variable css to style margin and background color from fields.

## [1.0.1] - 2019-07-26

### Changed

- Update readme example of using web component. Now it shows clearly how you send a card to the component.
- Update styles.

## [1.0.0] - 2019-07-24

### Added

- Add tailwind to handle easy css properties.
- Add css properties to allow users of this component customize it.

### Changed

- Update stencil core version to 1.1.4. Before this release it was still on beta versions.
- Clean properties used on the component. Instead of having several properties now it receives a single configuration property to handle initialization of the card.
- Change how input file is used. Before this release we had 2 inputs (hidding real input file and showing fake input text) to allow users to see this input customized, not and input type file by default.
- Change full README.md. Now it has explains correctly how to install and use the component and it's parts.

## [0.0.1] - 2019-01-11

### Added

- Show static text from a phemium form field and added some inputs to handle diferent use cases.
- Show "checkbox like" inputs as buttons (accept and discard) in case it is needed.
- Handle input delete event to correctly change value of input file and emits an event.
- Phemium-card component displaying inputs of type text, file and select.
- Uploading resources in case user selects a file.
- Returning array prepared to send to phemium.
- Phemium-card component displaying inputs of type checkbox with toggle slide style.
- Updating in phemium results of checkbox input automatically when users checks it.

### Fixed

- Fix error that was reseting form in case we selected a new file.
- Fix error while uploading files. Now phemium-card is sending correctly data to phemium.
- Change z-index for input type file to fix future style problems.
