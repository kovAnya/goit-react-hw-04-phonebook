import { Item, DeleteBtn } from './ContactListItem.styled';
import PropTypes from 'prop-types';

export const ContactListItem = ({ name, phone, onDelete }) => {
  return (
    <Item>
      {name}: {phone}
      <DeleteBtn type="button" data-name={name} onClick={onDelete}>
        Delete
      </DeleteBtn>
    </Item>
  );
};

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};
