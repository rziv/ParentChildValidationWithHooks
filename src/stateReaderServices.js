import { subjects } from "./subjects";

export class stateReaderServices {   

  getData(subject) {
    return this.isRegisteredSubject(subject)
      ? this[subject].getData()
      : {};
  }

  validate(subject) {
    return this.isRegisteredSubject(subject)
      ? this[subject].validate()
      : false;
  }

  addValidation(subject, validator) {
    if (this.isValidSubject(subject)) {
      if (!this.hasOwnProperty(subject)) {
        this[subject] = {}
      };
      this[subject].validate = validator;
    }
  }

  addDataFetcher(subject, dataFetcher) {
    if (this.isValidSubject(subject)) {
      if (!this.hasOwnProperty(subject)) {
        this[subject] = {}
      };
      this[subject].getData = dataFetcher;
    }
  }

  isValidSubject(subject) {    
    return Object.values(subjects).includes(subject);
  }

  isRegisteredSubject = function (subject) {
    return this.hasOwnProperty(subject) 
      ? typeof this[subject].validate == "function" &&
          typeof this[subject].getData == "function"
      : false;
  };
}
