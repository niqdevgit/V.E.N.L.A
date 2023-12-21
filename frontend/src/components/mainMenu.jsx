// eslint-disable-next-line react/prop-types
const MainMenu = ({user,setUser}) => {
  
    const handleClick = () => {
        setUser('Vieras')
    }
    console.log(user)
  return (
    <div className="main-menu">
      <h1>V.E.N.L.A</h1>
      <p>Welcome, {user}!</p>
      <p>Jotain lorem ipsumia mikä on sovelluksen idea.....</p>
    <button><a href="/kirjaudu">Kirjaudu</a></button><button onClick={handleClick}>Käytä vieraana💀</button>
      {/*if user is null, we suggest login. otherwise functional buttons here  */}
    </div>
  );
};

export default MainMenu;
