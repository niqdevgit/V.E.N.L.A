const DeleteUser = (user) =>{
    console.log(user)
    return(
        <div>
            <a href="/">Palaa</a>
            <p>Kirjoita kenttään salasanasi jos haluat poistaa tilisi ja kaikki sen tiedot</p>
            <p>Poistoa ei voi perua!</p>
            <input></input>
            <p><a href="/unohtunutsalasana">Oletko unohtanut salasanasi?</a></p>
            
        </div>
    )
}

export default DeleteUser