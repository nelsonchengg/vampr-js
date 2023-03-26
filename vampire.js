class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberFromOriginal = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      numberFromOriginal++;
      currentVampire = currentVampire.creator;
    }
    return numberFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name) {
      return this;
    }

    for (const infected of this.offspring) {
      if (infected.vampireWithName(name)) {
        return infected.vampireWithName(name);
      };
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let descendents = 0;
    descendents += this.offspring.length;

    for (const infected of this.offspring) {
      descendents += infected.totalDescendents;
    }
    return descendents;
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millenialVampires = [];

    if (this.yearConverted > 1980) {
      millenialVampires.push(this);
    }

    for (const infected of this.offspring) {
      millenialVampires = millenialVampires.concat(infected.allMillennialVampires);
    }
    return millenialVampires;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let thisNumber = this.numberOfVampiresFromOriginal;
    let otherNumber = vampire.numberOfVampiresFromOriginal;
    let thisVampire = this;
    let otherVampire = vampire;

    while (thisNumber > otherNumber) {
      thisVampire = thisVampire.creator;
      thisNumber--;
    }

    while (otherNumber > thisNumber) {
      otherVampire = otherVampire.creator;
      otherNumber--;
    }

    while (thisVampire !== otherVampire) {
      thisVampire = thisVampire.creator;
      otherVampire = otherVampire.creator;
    }
    return thisVampire;
  }
}

module.exports = Vampire;

