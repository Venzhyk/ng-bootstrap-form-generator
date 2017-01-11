
# Bootstrap4 + Angular2 Form Generator

Generate simple Bootstrap4 forms from Json object

Library provides Angular components that help quickly generate Bootstrap 4 form from JSON object.
Supports validators, help message, and error message.

Based on ReactiveFormsModule from @angular/forms.
Available custom and all angular built in validators.

## Install

### Add npm package
Install npm package into your Angular 2 application
`npm install --save ng-bootstrap-form-generator`
Once installed you need to import the main module:

Import the `BootstrapFormGeneratorModule` module into your app module and add it to your app module's imports
```typescript
import { BootstrapFormGeneratorModule } from 'ng-bootstrap-form-generator';
@NgModule({
    imports: [BootstrapFormGeneratorModule, ...]
})
export class AppModule {
} 
```

### Add bootstrap and jquery

Add css and scripts into your `index.html`
```html
<!doctype html>
<html>
  <head>

  ...

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ"
      crossorigin="anonymous">
  </head>

  <body>
          <app-root>Loading...</app-root>

    <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/tether/1.3.1/js/tether.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
  </body>
</html>
```
Check [Bootstrap 4 Download](https://v4-alpha.getbootstrap.com/getting-started/download/) page for more details

## Dependencies
* [Angular 2](https://angular.io) (tested with 2.0.0)
* [Bootstrap 4](https://v4-alpha.getbootstrap.com) (tested with 4.0.0-alpha.6)



## Known isues
