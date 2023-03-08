import React from 'react';
import classNames from 'classnames';
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";


export default ({ PrevClick,NexClick }) => {
  return (
      <>
          <div className="flow-root">
              <div  onClick={PrevClick} className="float-left shadow-md text-2xl cursor-pointer "><AiOutlineLeft/></div>
              <div onClick={NexClick} className="float-right shadow-md text-2xl cursor-pointer "><AiOutlineRight/></div>
          </div>
      </>
  )
};
