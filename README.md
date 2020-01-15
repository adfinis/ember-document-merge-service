# ember-document-merge-service
This addon contains Ember components that provide a UI for the 
[document-merge-service](https://github.com/adfinis-sygroup/document-merge-service/).

## Project
* Ember.js v3.8 or above
* Repository: [ember-document-merge-service](https://github.com/adfinis-sygroup/ember-document-merge-service)
* Maintainer: [Florian Mäder](mailto:florian.maeder@adfinis-sygroup.ch)

## Installation
```
ember install ember-document-merge-service
```

You will then have to configure Ember-Ajax in the consuming application.
```js
// app/services/ajax.js
import AjaxService from "ember-ajax/services/ajax";

export default AjaxService.extend({
  host: "http://localhost:8888",
  namespace: "/api/v1",
  contentType: "application/json; charset=utf-8"
});
```

## Usage
The addon is divided into three components that can be included individually.

### Upload
The upload component provides a form to select a file to upload and define a slug and label for the template. If the backend responds with an error, the message(s) will be added to the corresponding form elements.

### Delete
The delete component provides a list with the existing templates. Each templates comes with a delete link and deletion is guarded by a confirmation dialog.

### Merge
The merge component provides a dropdown to select from the existing templates which can then be merged with a data object.

## Contributing
See the [Contributing](CONTRIBUTING.md) guide for details.

## License
Copyright 2019, 2020 [Adfinis SyGroup AG](https://adfinis-sygroup.ch/) - Permission granted under the [LGPL-3.0-or-later](LICENSE).
