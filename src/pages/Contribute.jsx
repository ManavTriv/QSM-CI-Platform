import React from "react";
import Navbar from "../components/Navbar";
import ContributeMessage from "../components/ContributeMessage.jsx";
/*
  Note: The error is caused by a mismatch in the casing of the filename.
  Make sure the file is named exactly 'ContributeMessage.jsx' (not 'ContributeMEssage.jsx') in your components folder.
  On case-sensitive file systems (like Linux), this matters.
*/
const Contribute = () => {
  return (
    <>
      <div className="bg-[#fffefb] min-h-screen w-full space-y-5">
        <Navbar />
        <ContributeMessage />
      </div>
    </>
  );
};

export default Contribute;
