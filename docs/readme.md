# Bootstrap4 + Angular2 Form Generator

Library provides Angular components that help quickly generate Bootstrap Form from JavaScript object. 

Live Demo
<iframe style="width: 100%; height: 600px" src="http://embed.plnkr.co/oFBOR6C1ylYquLA8oA4G/" frameborder="0" allowfullscren="allowfullscren"></iframe>


# Form Config

Form config is a array of Form Control objects that describes input fields.

## Main Form Control Properties

[see: `BsfControlOptions`](https://github.com/Venzhyk/ng-bootstrap-form-generator/blob/master/src/bsf.options.ts)

* field - name of model field. It is the only required property for all Form Controls
* type - control type, by default it's input 
* title - caption, displayed next to control
* helpText - small text that shown under input field
* helpTextHtml - same, but allows to use html tags
* defaultValue - controll default value, if model does't provide value this one will be used
* disabled - make field disabled, all validations are ignored
* required - make field required
* validator - see: [Angular Validators](https://angular.io/docs/ts/latest/api/forms/index/Validators-class.html) [Reactive Form Validation](https://angular.io/docs/ts/latest/cookbook/form-validation.html#!#reactive)
* asyncValidator - see [AsyncValidatorFn](https://angular.io/docs/ts/latest/api/forms/index/AsyncValidatorFn-interface.html)
* validationMessage

```typescript
  [
    {
        field: 'password',
        type: 'password',
        title: 'Password',
        helpText: 'Password should be strong',
        required: true,
        minlength: 6
    },
    ...
  ]

```
## Form Controls

### Input

### Select

### Checkbox

### Radio button

### Date


## Form Group

### Model
### Nested Models


## Validation

### Simple Validation

#### Required
##### ReuiredTrue
#### Pattern
#### Min/Max Length

### Validation Messages

### Custom Validators


## Form Layout
