class Variable {
    #title;
    #instances;

    constructor(title, isInEditor=false) {
      this.#title = title;
      this.#instances = [];
    }

    get title() {
      return this.#title;
    }

    set title(newTitle) {
      if ( ! (typeof newTitle === 'string' || newTitle instanceof String) ) {
        console.log("ERROR: Variable title must be a string!");
      } else if (newTitle.includes(' ')) {
        console.log("ERROR: Variable names can't have spaces!")
      } else {
        this.#title = newTitle;
      }
    }

    get instances() {
      return [...this.#instances];
    }

    removeInstance = (instanceId) => {
      const index = this.#instances.indexOf(instanceId);
      if (index > -1) {
        this.#instances.splice(index, index);
      } else {
        console.log("ERROR: instanceId not found in variable.")
      }
    }

    addInstance = (instanceId) => {
      if ( ! Number.isInteger(instanceId) ){
        console.log('ERROR: instanceID must be an integer' + `not ${instanceId}`);
      } else if (this.#instances.includes(instanceId)) {
        console.log('ERROR: instaceID already exists.');
      } else {
        this.#instances.push(instanceId);
      }
    }

    isInstance = (instanceId) => {
      return this.#instances.includes(instanceId);
    }

    isInEditor = () => {
      return !(this.#instances.length === 0);
    }
}

export class Choice extends Variable {
  #choices;

  constructor(title, isInEditor) {
    super(title, isInEditor);
    this.#choices = [];
  }

  addChoice = (choiceToAdd) => {
    if ( ! (typeof choiceToAdd === 'string' || choiceToAdd instanceof String) ) {
      console.log("ERROR: Choice value must be a string!");
    } else if ( this.#choices.includes(choiceToAdd) ) {
      console.log("ERROR: Choice value already exists!");
    } else {
      this.#choices.add(choiceToAdd);
    }
  }

  removeChoice = (choiceToRemove) => {
    if ( ! this.#choices.includes(choiceToRemove )) {
      console.log("ERROR: Choice value doesn't exist!")
    } else {
      const index = this.#choices.indexOf(choiceToRemove);
      this.#choices.slice(index, index);
    }
  }
}