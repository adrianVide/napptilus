import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="container">
      <div className="navbar">
        <a href="/" className="logo-title">
          <img
            className="logo"
            src="https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/logo-umpa-loompa.png"
            alt="logo"
          />
          <h1 className="title">Oompa Loompa's Crew</h1>
        </a>
      </div>
    </div>
  );
};

export default NavBar;
