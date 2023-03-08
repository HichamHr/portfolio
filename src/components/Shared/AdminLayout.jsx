import React from "react";
import LayoutHeader from "./LayoutHeader";
import LayoutSideBar from "./LayoutSideBar";
import {
    Outlet,
} from 'react-router-dom';

export default function AdminLayout() {

  return (
          <div
              className="max-h-screen h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
              <LayoutHeader/>
            <LayoutSideBar/>
            <main className=" ml-14 mt-14 p-2 mb-0 md:ml-64 ">
              <Outlet/>
            </main>
          </div>
  );
}
