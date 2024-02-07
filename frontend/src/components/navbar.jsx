import { FaArrowLeft } from "react-icons/fa"

const Navbar = () => {

    return (
        <div className="flex-box">
           <h1><a href="/" className='navbar-main-link'>V.E.N.L.A</a></h1>
           <p><FaArrowLeft /> paina tuota palataksesi alkuun</p>
        </div>
    )
}

export default Navbar