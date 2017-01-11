
# Bootstrap4 + Angular2 Form Generator

Generate simple Bootstrap4 forms from Json object

Library provides Angular components that help quickly generate Bootstrap 4 form from Java Script object.
Supports validators, help message, and error message.

Based on ReactiveFormsModule from @angular/forms.
Available custom and all angular built-in validators.

[Demo]((https://embed.plnkr.co/oFBOR6C1ylYquLA8oA4G))
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

## Usage
 Full Demo: https://embed.plnkr.co/oFBOR6C1ylYquLA8oA4G 
 
### Create your data model object
```typescript
 data =  {
    id: '123',
    email: 'boby.mobi@example.com',
    name: 'Mobibob',
    password: 'AOe30&^@#!c2',
    howUserFindUs: '2',
    agreement: true,
  }
```

### Defile Form config
```typescript
formConfig = this.formConfig = [
      {
        field: 'id',
        type: 'hidden',
      },
      {
        field: 'email',
        type: 'email',
        title: 'Email',
        helpText: 'We will send confirmation email in order to finish registration',
        required: true
      },
      {
        field: 'name',
        type: 'text',
        title: 'User Name',
        required: true,
        maxlength: 15
      },
      {
        field: 'password',
        type: 'password',
        title: 'Password',
        helpText: 'Password should be strong',
        required: true,
        minlength: 6
      },
      {
        field: 'howUserFindUs',
        type: 'select',
        title: 'How did you find us?',
        helpText: 'You can keep this field empty',
        select: {
          emptyText: '-- How did you hear of us? --',
          options: [
            { text: 'Facebook', value: 1 },
            { text: 'LinkedIn', value: 2 },
            { text: 'Google', value: 3 },
            { text: 'Friends', value: 4 },
          ]
        }
      },
      {
        field: 'agreement',
        type: 'checkbox',
        title: 'I accept license agreement',
        helpTextHtml: 'Read <a href="#license  ">license</a> before accept',
        requiredTrue: true,
        validationMessage: {
          required: 'Please, read and accept agreement'
        },
      }
    ];

```
### Initialize `bsf-form`

```html
<bsf-form [options]='formConfig' [(value)]='data'></bsf-form>
```

You can add your own header and footer into `bsf-form`

```html
<bsf-form [options]='formConfig' [(value)]='data' #regForm>
  <bsf-before>
    <h5>New User</h5>
  </bsf-before>
  <bsf-after>
    <button type="button" class="btn btn-primary" (click)='sendForm(regForm.value, regForm.form.valid)'>Register</button>
    <button type="button" class="btn btn-default" (click)='reset()'>Clear</button>
    <span>{{message}}</span>
  </bsf-after>
</bsf-form>

```
