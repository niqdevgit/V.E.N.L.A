import MainTree from "./mainTree";


// eslint-disable-next-line react/prop-types
const MainMenu = ({user,setUser}) => {
  
    const handleVisitorClick = () => {
        setUser('Vieras')
    }

    const handleVisitorOutClick = () => {
      setUser(null)
  }


    console.log(user)
  return (
    <div className="main-menu">
      <h1>V.E.N.L.A</h1>
      {user ? (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }} >
                  <p style={{ marginRight: '15px' }}>Hei,{user}!</p>  
                  <button onClick={handleVisitorOutClick}>Kirjaudu ulos</button>
                  </div>
                    <MainTree />
                    
                </div>
            ) : (
                <div>
                    <p>Jotain lorem ipsumia mikä on sovelluksen idea.....</p>
                    <button><a href="/kirjaudu">Kirjaudu</a></button>
                    <button onClick={handleVisitorClick}>Käytä vieraana💀</button>
                </div>
            )}
    </div>
  );
};

export default MainMenu;
