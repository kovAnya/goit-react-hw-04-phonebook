import { FilterInput } from './Filter.styled';
import PropTypes from 'prop-types';

export const Filter = ({ value, onFilter }) => {
  return (
    <div>
      <label htmlFor="filter">Find contacts by name</label>
      <FilterInput
        type="text"
        name="filter"
        value={value}
        onChange={onFilter}
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
};
