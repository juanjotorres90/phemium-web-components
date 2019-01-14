# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2019-01-11

### Added

- Show static text from a phemium form field and added some inputs to handle diferent use cases.
- Show "checkbox like" inputs as buttons (accept and discard) in case it is needed.
- Handle input delete event to correctly change value of input file and emits an event.

### Fixed
- Fixed error that was reseting form in case we selected a new file.
- Fixed error while uploading files. Now phemium-card is sending correctly data to phemium.

## [1.1.0] - 2018-12-20

### Added

- Phemium-card component displaying inputs of type checkbox with toggle slide style.
- Updating in phemium results of checkbox input automatically when users checks it.

### Fixed

- Changed z-index for input type file to fix future style problems.

## [1.0.0] - 2018-12-13

### Added

- Phemium-card component displaying inputs of type text, file and select.
- Uploading resources in case user selects a file.
- Returning array prepared to send to phemium.