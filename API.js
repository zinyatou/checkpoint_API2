const mongoose = require('mongoose');

// Connexion à la base de données en utilisant l'URI stockée dans le fichier .env
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Création du schéma pour la personne
const personSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  âge: Number,
  favoriteFoods: [String]
});

// Création du modèle basé sur le schéma
const Person = mongoose.model('Person', personSchema);

// Création et enregistrement d'une personne
const newPerson = new Person({
  nom: "John Doe",
  âge: 30,
  favoriteFoods: ["Pizza", "Burger"]
});

newPerson.save((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Person saved:", data);
  }
});

// Création de plusieurs personnes en utilisant Model.create()
const arrayOfPeople = [
  { nom: "Alice", âge: 25, favoriteFoods: ["Sushi", "Pasta"] },
  { nom: "Bob", âge: 28, favoriteFoods: ["Taco", "Burrito"] }
];

Person.create(arrayOfPeople, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log("People created:", data);
  }
});

// Recherche de personnes par nom en utilisant Model.find()
Person.find({ nom: "Alice" }, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log("People named Alice:", data);
  }
});

// Recherche d'une personne par aliment préféré en utilisant Model.findOne()
Person.findOne({ favoriteFoods: "Pizza" }, (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Person who likes Pizza:", data);
  }
});

// Mise à jour d'une personne par _id
const personId = "your_person_id_here";
Person.findById(personId, (error, person) => {
  if (error) {
    console.error(error);
  } else {
    person.favoriteFoods.push("Hamburger");
    person.save((error, updatedPerson) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Person updated:", updatedPerson);
      }
    });
  }
});

// Mise à jour d'une personne par nom en utilisant model.findOneAndUpdate()
const personName = "Alice";
Person.findOneAndUpdate(
  { nom: personName },
  { âge: 20 },
  { new: true },
  (error, updatedPerson) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Person updated:", updatedPerson);
    }
  }
});

// Suppression d'une personne par _id en utilisant model.findByIdAndRemove()
const personIdToDelete = "your_person_id_here";
Person.findByIdAndRemove(personIdToDelete, (error, removedPerson) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Person removed:", removedPerson);
  }
});

// Suppression de plusieurs personnes par nom en utilisant Model.remove()
const nameToRemove = "Mary";
Person.remove({ nom: nameToRemove }, (error, result) => {
  if (error) {
    console.error(error);
  } else {
    console.log("People named Mary removed:", result);
  }
});

// Recherche de personnes qui aiment les burritos avec des options de requête en chaîne
Person.find({ favoriteFoods: "Burrito" })
  .sort({ nom: 1 })       // Trie par nom en ordre croissant
  .limit(2)               // Limite les résultats à 2 documents
  .select("-âge")         // Masque l'âge dans les résultats
  .exec((error, data) => {
    if (error) {
      console.error(error);
    } else {
      console.log("People who like Burritos:", data);
    }
  });
