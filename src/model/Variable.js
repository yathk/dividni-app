let NEXT_ID = 0

export const CHOICE_COLOUR = '#fc6203'
export const RANDOM_COLOUR = '#57b0ff'

export class Variable {
    #id;
    #title;
    #instances;
    #colour;
    #choices;
    #type
    #min
    #max
    #multiplier

    constructor(title, id, type) {
      this.#id = id;
      this.#title = title;
      this.#instances = new Set();
      this.#type = type;
      this.#choices = [];
      this.#min = 0;
      this.#max = 10;
      this.#multiplier = 1;

      if (type === 'choice') {
        this.#colour = CHOICE_COLOUR;
      } else if (type === 'random') {
        this.#colour = RANDOM_COLOUR;
      }
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

    get type() {
      return this.#type;
    }

    set type(newType) {
      this.#type = newType;
    }

    changeType = (newType) => {
      if (newType === 'choice') {
        this.#type = newType;
        this.#colour = CHOICE_COLOUR;
      } else if (newType === 'random') {
        this.#type = newType;
        console.log('changing to ' + RANDOM_COLOUR)
        this.#colour = RANDOM_COLOUR;
      }
    }

    get colour() {
      return this.#colour
    }

    set colour(newColour) {
      this.#colour = newColour
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

    // Choice methods
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

    // Random methods
    get min() {
      return this.#min
    }
  
    set min(newMin) {
      if (typeof newMin === 'number') {
        this.#min = newMin
      } else {
        console.log(`ERROR: ${newMin} is not a number!`)
      }
    }
  
    get max() {
      return this.#max
    }
  
    set max(newMax) {
      if (typeof newMax === 'number') {
        this.#max = newMax
      } else {
        console.log(`ERROR: ${newMax} is not a number!`)
      }
    }
  
    get multiplier() {
      return this.#multiplier
    }
  
    set multiplier(newMulti) {
      if (typeof newMulti === 'number') {
        this.#multiplier = newMulti
      } else {
        console.log(`ERROR: ${newMulti} is not a number!`)
      }
    }

    preview = () => {
      const type = this.#type
      switch (type) {
        case 'choice':
          if (this.#choices.length > 0) {
            const randIndex = Math.floor(Math.random() * this.#choices.length)
            return this.#choices[randIndex]
          } else {
            return "&lt;No choices defined&gt;"
          }
        case 'random':
          const randNum = Math.floor(Math.random() * ((this.#max+1) - this.#min) + this.#min)
          return randNum * this.#multiplier
      }
    }
}
