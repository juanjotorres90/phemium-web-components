# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2019-??-??

### Added

- Added tailwind to handle easy css properties.
- Added css properties to allow users of this component customize it.

### Changed

- Update stencil core version to 1.1.4. Before this release it was still on beta versions.
- Cleaned properties used on the component. Instead of having several properties now it receives a single configuration property to handle initialization of the card.
- Changed how input file is used. Before this release we had 2 inputs (hidding real input file and showing fake input text) to allow users to see this input customized, not and input type file by default.
- Changed full readme. Now it has explains correctly how to install and use the component and it's parts.

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

- Fixed error that was reseting form in case we selected a new file.
- Fixed error while uploading files. Now phemium-card is sending correctly data to phemium.
- Changed z-index for input type file to fix future style problems.
