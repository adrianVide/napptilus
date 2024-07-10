import "./Header.css";
import SearchInput from "../SearchInput/SearchInput";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

const Header = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <>
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h1 className="header-title">Find your Oompa Loompa</h1>
      <p className="header-subtitle">There are more than 100k</p>
    </>
  );
};

export default Header;
