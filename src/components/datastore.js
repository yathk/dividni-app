import {Choice, Variable} from './variable_class.js';

// Helper
function checkVarType(newVar) {
  if ( !newVar instanceof Variable ) {
    console.log(`${newVar} is not a Variable type!`);
    return false;
  } 
  return true;
}

export class VariablesDataStore {
  savedVariables;

  constructor() {
    this.savedVariables = []
  }

  addVariable = (newVar) => {
    if (checkVarType(newVar)) {
      const sameVars = this.savedVariables.filter( v => v.title === newVar.title )
      if (sameVars.length > 0) {
        console.log(`${newVar.title} already in data store!`);
      } else {
        this.savedVariables.push(newVar);
      }
    }
  }

  removeVariable = (varToRemove) => {
    const index = this.savedVariables.indexOf(varToRemove)
    if (index > -1) {
      this.savedVariables.splice(index, 1)
    }
  }

  getVariable = (varName) => {
    for (const v of this.savedVariables) {
      if (v.title === varName) {
        return v;
      }
    }
  }

  syncInstances = (htmlDoc) => {
    // delete extra instances
    this.savedVariables.forEach((sv) => {
      sv.instances.forEach((inst) => {
        if ( !htmlDoc.getElementById('' + inst) ) {
          sv.removeInstance(inst)
        }
      })
    })
    // add remaining instances
    const variablesHtml = Array.from(htmlDoc.getElementsByClassName('variable'));
    variablesHtml.forEach((varHtml) => {
      const varId = parseInt(varHtml.getAttribute('id'));
      const varName = varHtml.innerText;
      const retrivedVar = this.getVariable(varName);
      if (retrivedVar) {
        retrivedVar.addInstance(varId);
      } else {
        const newVar = new Choice(varName);
        newVar.addInstance(varId);
        this.addVariable(newVar);
      }
    })
  }

  logVariables = () => console.log(this.savedVariables)
}
