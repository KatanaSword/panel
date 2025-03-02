import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
const Homepage = React.lazy(() => import("./pages/Homepage"));

const ProjectRouter = () => {
  return (
    <React.Suspense
      fallback={
        <div className="">
          <p></p>
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default ProjectRouter;
