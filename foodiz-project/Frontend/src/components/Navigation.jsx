// import React from 'react'
// import { Link } from 'react-router-dom'
// import { Navbar, Nav, Container } from 'react-bootstrap';
// export default function Navbar() {
//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-light transparent-navbar"> {/* Update className name for navbar */}
//         <div className="container-fluid navigation">
//           <Link className="navbar-brand" to="/">Foodizz</Link>
//           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="navbarNav">

//             <ul className="navbar-nav">
//               <li>

//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-secondary text-white mx-3" aria-current="page" to="/">Home</button>
//               </li>
//               <li className="nav-item">
//                 <button className="btn btn-secondary text-white " to="/login">Login</button>
//               </li>
//             </ul>

//           </div>
//         </div>
//       </nav>
//     </div>
//   )

// }



// new version
import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap'; // Import necessary components
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navigation() {
  const [cartView,setCartView] = useState(false)
  let navigate = useNavigate();
  let data = useCart();
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    console.log("hello")
  }
  return (
    <Navbar expand="lg" className="transparent-navbar">
      <Container fluid className="navigation">
        <Navbar.Brand as={Link} to="/">Foodizz</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className=" text-white active mx-3 fs-5">Home</Nav.Link>
            {
              (localStorage.getItem('authToken'))
                ? <Nav.Link as={Link} to="/" className=" text-white active mx-2 fs-5">Orders</Nav.Link>
                : ''
            }
          </Nav>
          {
            !(localStorage.getItem('authToken'))
              ? <div className='d-flex'>
                <Nav.Link as={Link} to="/login" className="btn text-success ui-button ">Login</Nav.Link>
                <Nav.Link as={Link} to="/login" className="btn text-success mx-2 ui-button">signup</Nav.Link>
              </div>
              :
              <div>
                <div className="btn fs-5 ui-button text-success" onClick={()=>(setCartView(true))}>
                  My Cart {"  "}
                  <Badge pill bg="success">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
                <div className="btn text-danger fs-5 mx-2 ui-button" onClick={handleLogout}>
                  Logout
                </div>
              </div>

          }

        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
