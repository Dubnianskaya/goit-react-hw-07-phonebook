import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  add,
  deleting,
  setFilter,
  getContacts,
  getFilter,
} from "../../redux/contactSlice";
import Form from "../Form";
import ContactList from "../ContactList";
import Filter from "../Filter";
import { Container, PhonebookTitle, ContactsTitle } from "./App.styled";
import { nanoid } from "nanoid";

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const formSubmitHandler = ({ name, number }) => {
    const contactCard = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = contactCard.name.toLowerCase();
    const nameFilter = (contact) =>
      normalizedName === contact.name.toLowerCase();
    const contactSameNameChecked = contacts.some(nameFilter);

    if (contactSameNameChecked) {
      return alert(`${contactCard.name} is already in contacts`);
    } else {
      dispatch(add(contactCard));
    }
  };

  const changeFilter = (event) => {
    dispatch(setFilter(event.target.value));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLocaleLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = (contactId) => {
    dispatch(deleting(contactId));
  };

  return (
    <Container>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <Form onSubmit={formSubmitHandler} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onFilterChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
}

export default memo(App);
