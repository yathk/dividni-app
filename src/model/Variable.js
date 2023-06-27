let NEXT_ID = 0

export class Variable {
    #id;
    #title;
    #instances;

    constructor(title, id) {
      this.#id = id;
      this.#title = title;
      this.#instances = new Set();
    }

    get id() {
      return this.#id;
    }

    get title() {
      return this.#title;
    }

    set title(newTitle) {
      if ( ! (typeof newTitle === 'string' || newTitle instanceof String) ) {
        console.log("ERROR: Variable title must be a string!");
      } else {
        this.#title = newTitle;
      }
    }

    get instances() {
      return [...this.#instances];
    }

    removeInstance = (instanceId) => {
      if (!this.#instances.delete(instanceId)) {
        console.log(`ERROR: instance ${instanceId} not found in variable.`)
      }
    }

    addInstance = (instanceId) => {
      if ( instanceId ){
        this.#instances.add(instanceId);
      } else {
        console.log(`ERROR: instance ${instanceId} is not valid`);
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

  constructor(title, id) {
    super(title, id);
    this.#choices = [];
  }

  set choices(newChoices) {
    this.#choices = newChoices
  }

  getChoices = () => {
    return [...this.#choices]
  }

  addChoice = (choiceToAdd) => {
    if ( ! (typeof choiceToAdd === 'string' || choiceToAdd instanceof String) ) {
      console.log("ERROR: Choice value must be a string!");
    } else if ( this.#choices.includes(choiceToAdd) ) {
      console.log("ERROR: Choice value already exists!");
    } else {
      this.#choices.push(choiceToAdd);
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