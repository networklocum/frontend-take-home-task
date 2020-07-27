# Lantum frontend take home task

Thank you for taking the time to complete our technical test. This is a common type of problem that you would come across when working at Lantum. This task should only take roughly two hours and when completed please commit your code to GitHub and email us the link to your repository. If you have any questions, please drop us an email and we will be happy to help.

## Task requirements

* Please complete the user story below according to the criteria.
* Build using React (you can use [create-react-app](https://create-react-app.dev/docs/getting-started/) for quick setup)
* Write asynchronous code
* You must include tests
* Instructions on how to run your code locally

## Instructions

The task is to create an application that displays a list of **available** shifts to the user. The application should then display the following information about each shift:
* Practice name
* Date of the shift
* Start and end time of the shift
* Hourly rate of shift
* Number of applications already made to the shift

### User story

**As a user** running the application

**I can view** a list of shifts when I load the page

**So that** I know which shifts are available for me to apply to

### Criteria

The API will return a list of shifts:
```
GET https://vvgv5rubu3.execute-api.eu-west-2.amazonaws.com/dev/sessions
```

Then only display shifts that fit the following criteria:
* The `staffType` for the shift must be the same as the `staffType` of the user
* The shift start date must be in the future
* The status must be `POSTED`
* A locum must not already be assigned to a shift

The user will be a GP and will have the following data structure:

```javascript
const locum = {
 id: '1234',
 firstName: 'John',
 lastName: 'Doe',
 staffType: 'gp',
 staffTypeId: '1',
};
```
