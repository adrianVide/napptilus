import "./SearchInput.css";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const SearchInput = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        className="input-control"
      />
    </div>
  );
};

export default SearchInput;
