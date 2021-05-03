const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

const contactsPath = path.resolve('db', 'contacts.json');

async function parseContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8', (error) => {
      if (error) return console.log(error);
    });
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function listContacts() {
  try {
    const contacts = await parseContacts();

    console.table(contacts);
  } catch (err) {
    console.error(err.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await parseContacts();
    const contactToFind = contacts.find(({ id }) => id == contactId);

    console.table(contactToFind);
  } catch (err) {
    console.error(err.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await parseContacts();

    const contactfilter = contacts.filter(({ id }) => id != contactId);

    // await fs.writeFile(contactsPath, JSON.stringify(contactfilter, null, 2));

    console.table(contactfilter);
  } catch (err) {
    console.error(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await parseContacts();
    const id = shortid();
    const newListContacts = [...contacts, { id, name, email, phone }];

    // await fs.writeFile(contactsPath, JSON.stringify(newListContacts, null, 2));

    console.table(newListContacts);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };

// async function listContacts() {
//   try {
//     const contacts = await fs.readFile(contactsPath, 'utf-8', (err) => {
//       if (err) console.log(err);
//     });

//     console.table(JSON.parse(contacts));
//   } catch (err) {
//     console.error(err.message);
//   }
// }
