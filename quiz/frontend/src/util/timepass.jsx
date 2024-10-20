// import React, { useState } from 'react';
// import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
// import { Icon } from '@iconify/react'; // Importing Iconify icons
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CustomNavbar = () => {
//   // State to manage the navbar toggle
//   const [navbarOpen, setNavbarOpen] = useState(false);

//   // Function to handle navbar toggle
//   const handleNavbarToggle = () => {
//     setNavbarOpen(!navbarOpen);
//   };

//   return (
//     <Navbar expand="lg" bg="light" className="py-2">
//       <Container fluid>
//       <Navbar.Brand href="#" className="fw-bold">
//           Logo
//         </Navbar.Brand>
//         {/* Toggle button for mobile view */}
//         <button
//           className="border-0 bg-light"
//           onClick={handleNavbarToggle}
//           aria-controls="navbar-content"
//           aria-expanded={navbarOpen}
//           aria-label="Toggle navigation"
//         >
//           {navbarOpen ? (
//             <Icon icon="line-md:menu-to-close-transition" width="24" height="24" />
//           ) : (
//             <Icon icon="clarity:menu-line" width="24" height="24" />
//           )}
//         </button>

//         {/* Collapsible content */}
//         <Navbar.Collapse id="navbar-content" className={navbarOpen ? 'show' : ''}>
//           {/* Right-aligned menu items */}
//           <Nav className="ms-auto">
//             <Nav.Link href="#" className="px-3">
//               Home
//             </Nav.Link>
//             <Nav.Link href="#" className="px-3">
//               Setting
//             </Nav.Link>
//             <Nav.Link href="#" className="px-3">
//               Assignment
//             </Nav.Link>

//             {/* Profile dropdown */}
//             <NavDropdown
//               title={
//                 <img
//                   src="https://via.placeholder.com/30"
//                   alt="profile"
//                   className="rounded-circle"
//                   style={{ width: '30px', height: '30px' }}
//                 />
//               }
//               id="profile-dropdown"
//               align="end"
//             >
//               <NavDropdown.Item href="#">Profile</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#">Logout</NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default CustomNavbar;

import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Icon } from '@iconify/react'; // Importing Iconify icons
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = () => {
  // State to manage the navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Function to handle navbar toggle
  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <Navbar expand="lg" bg="light" className="py-2">
      <Container fluid>
        <Navbar.Brand href="#" className="fw-bold">
          Logo
        </Navbar.Brand>
        
        {/* Toggle button for mobile view */}
        <button
          className="border-0 bg-light d-lg-none" // Hide this button on lg and larger screens
          onClick={handleNavbarToggle}
          aria-controls="navbar-content"
          aria-expanded={navbarOpen}
          aria-label="Toggle navigation"
        >
          {navbarOpen ? (
            <Icon icon="line-md:menu-to-close-transition" width="24" height="24" />
          ) : (
            <Icon icon="clarity:menu-line" width="24" height="24" />
          )}
        </button>

        {/* Collapsible content */}
        <Navbar.Collapse id="navbar-content" className={navbarOpen ? 'show' : ''}>
          {/* Right-aligned menu items */}
          <Nav className="ms-auto">
            <Nav.Link href="#" className="px-3">
              Home
            </Nav.Link>
            <Nav.Link href="#" className="px-3">
              Setting
            </Nav.Link>
            <Nav.Link href="#" className="px-3">
              Assignment
            </Nav.Link>

            {/* Profile dropdown */}
            <NavDropdown
              title={
                <img
                  src="https://via.placeholder.com/30"
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: '30px', height: '30px' }}
                />
              }
              id="profile-dropdown"
              align="end"
            >
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
