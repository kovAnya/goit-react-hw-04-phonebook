import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { List } from './ContactList.styled';
import PropTypes from 'prop-types';

export const ContactList = ({ contacts, filterValue, onDelete }) => {
  return (
    <List>
      {contacts
        .filter(contact =>
          contact.name.toLowerCase().includes(filterValue.toLowerCase())
        )
        .map(contact => {
          return (
            <ContactListItem
              key={contact.id}
              name={contact.name}
              phone={contact.number}
              onDelete={onDelete}
            />
          );
        })}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  filterValue: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
