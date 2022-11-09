/*
import { readline } from 'readline-sync';
readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
*/
const bombRules = {
  "white": {
    noCut : [ "white", "black"],
    mustCut : []
  },
  "red" : {
    noCut : [],
    mustCut : ["green"]
  },
  "black": {
    noCut : ["white","green","orange"],
    mustCut : []
  },
  "orange": {
    noCut : [],
    mustCut : ["red", "black"]
  },
  "green": {
    noCut : [],
    mustCut : ["orange", "white"]
  },
  "purple": {
    noCut : ["purple", "green", "orange", "white"],
    mustCut : []
  }
}


function defuseBomb( sequence ) {
  const cantCut = new Set()
  const isCut = new Set()
  const toCut = [ ... sequence ]
  while (toCut.length > 0 ) {
    const wire = toCut.shift()
    if (isCut.has(wire)) {
      continue
    }
    if (cantCut.has(wire)) {
      return false
    }
    isCut.add(wire)
    cantCut.add( ...(bombRules[wire].noCut) )
    for ( let anotherCut of bombRules[wire].mustCut) {
      if (!isCut.has(anotherCut)) {
        toCut.push(anotherCut)
      }
    }

  }
  return true;

}


const sequences = [
  [ "white", "red", "green", "white" ],
  [ "white", "orange", "green", "white"],
  [ "white", "red", "green", "white", "red"],
  [ "white", "orange", "green"],
  [ "white", "black"]
]

for (let sequence of sequences) {
  console.log( defuseBomb( sequence) ? "Bomb defused" : "Boom");
}
function isEnd( index, sequence) {
  console.log(`index ${index} sequence ${sequence}`)
  return index >= sequence.length
}
