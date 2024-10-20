// import React from "react";
// import AvgMArk from "../assets/AvgMark.png";
// import PracticeTest from "../assets/PracticeTest.png";
// import TestComplete from "../assets/TestComplete.png";
// import TestPending from "../assets/TestPending.png";
// import { useTestUserQuery } from "../service/LoginService";
// // import {}
// const CommonView = () => {
//   const { data: test } = useTestUserQuery();
//   console.log(test);
//   const { data: activeTest } = useTestUserQuery();
//   console.log(activeTest);

//   return (
//     <div
//       style={{ height: "90vh", margin: 0 }}
//       className="bg-secondary bg-opacity-10 card border-0 rounded-0"
//     >
//       <div className="mx-sm-3 mx-md-5 mx-xxl-5 mx-3 mt-sm-3 mt-lg-5 mt-3">
//         <div className="card">
//           <div className="mx-4 mt-5 mb-4 ">
//             <h4>{test && test[0]?.user?.name}</h4>
//             <h3>Welcome to Our Application</h3>
//           </div>
//         </div>
//         <h4 className="mt-5 mb-4">Your Dashboard</h4>
//         {/* {//ddddddddddddddd} */}
//         <div className="row g-3 mt-3 mx-3">
//           <div className="col-12 col-md-6 col-lg-3">
//             {" "}
//             {/* Full width on mobile, half width on medium and larger */}
//             <div className="bg-white rounded-3 card border-0">
//               <div
//                 className="bg-primary rounded-top-3"
//                 style={{ height: "8px" }}
//               ></div>
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">
//                   <h5>{test && test.length}</h5>
//                 </div>
//                 <div className="col-6 text-end">
//                   <img
//                     src={TestComplete}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="fw-bold text-center my-3">Test Completed</div>
//             </div>
//           </div>

//           <div className="col-12 col-md-6 col-lg-3">
//             {" "}
//             {/* Repeat for additional columns */}
//             <div className="bg-white rounded-3 card border-0 ">
//               <div
//                 className="bg-success    rounded-top-3"
//                 style={{ height: "8px" }}
//               ></div>
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">
//                   <h5>{test && test.length}</h5>
//                 </div>
//                 <div className="col-6 text-end">
//                 <img
//                     src={PracticeTest}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="fw-bold text-center my-3">Practice Test</div>
//             </div>
//           </div>
//           {/* ldllllllllllllllll */}
//           <div className="col-12 col-md-6 col-lg-3">
//             <div className="bg-white rounded-3 card border-0">
//               <div
//                 className="bg-danger  rounded-top-3"
//                 style={{ height: "8px" }}
//               ></div>
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">
//                   <h5>{test && test.length}</h5>
//                 </div>
//                 <div className="col-6 text-end">
//                 <img
//                     src={TestPending}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="fw-bold text-center my-3">Assignment Pending</div>
//             </div>
//           </div>
// {/* lllllllllllllllllll */}
//           <div className="col-12 col-md-6 col-lg-3">
//             <div className="bg-white rounded-3 card border-0">
//               <div
//                 className="bg-primary rounded-top-3"
//                 style={{ height: "8px" }}
//               ></div>
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">
//                   <h5>{test && test.length}</h5>
//                 </div>
//                 <div className="col-6 text-end">
//                 <img
//                     src={AvgMArk}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="fw-bold text-center my-3">Average MArk</div>
//             </div>
//           </div>
//         </div>

//         {/* <div
//           className="row justify-content-between "
//           style={{ height: "125px" }}
//         >
//           <div className="card col-12 col-md-6 col-lg-3 bg-light border-0">
//             <div className="col-12 bg-white rounded-3 h-100">
//             <div className="my-0 rounded-top-3 bg-primary mt-0 " style={{ height: '7px' }} />
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">{test && test.length}</div>
//                 <div className="col-6 text-end">
//                   <img
//                     src={TestComplete}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="mt-3 fw-bold text-center">Test Completed</div>
//             </div>
//           </div>
//           <div className="card col-12 col-md-6 col-lg-3 bg-primary border-0">
//             <div className="col-12 mt-4 mt-md-0 bg-white rounded-3 h-100">
//             <div className="my-0 rounded-top-3 bg-success opacity-50" style={{ height: '10px' }} />
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">12</div>
//                 <div className="col-6 text-end">
//                   <img
//                     src={PracticeTest}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="mt-3 fw-bold text-center">Practice Test</div>
//             </div>
//           </div>
//           <div className="card col-12 col-md-6 col-lg-3  bg-primary border-0">
//             <div className="col-12 mt-4 mt-lg-0 bg-white rounded-3 h-100">
//             <hr className="my-0 rounded-top-3 bg-danger" style={{ height: '10px' }} />
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">12</div>
//                 <div className="col-6 text-end">
//                   <img
//                     src={TestPending}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="mt-3 fw-bold text-center">Assignment Pending</div>
//             </div>
//           </div>
//           <div className="card col-12 col-md-6 col-lg-3 bg-primary border-0">
//             <div className="col-12 mt-4 mt-lg-0 bg-white rounded-3 h-100">
//             <hr className="my-0 rounded-top-3 bg-info" style={{ height: '10px'}} />
//               <div className="row mt-3 mx-3">
//                 <div className="col-6">{}</div>
//                 <div className="col-6 text-end">
//                   <img
//                     src={AvgMArk}
//                     alt=""
//                     width="50"
//                     height="50"
//                     className="rounded-3"
//                   />
//                 </div>
//               </div>
//               <div className="mt-3 fw-bold text-center">Average Mark</div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default CommonView;
