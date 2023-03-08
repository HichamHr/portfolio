import React from "react";
import {
    Outlet,
} from 'react-router-dom';
import ScrollToTop from "../ScrollToTop";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import UseScrollToTop from "../../hooks/useScrollToTop";

export default function UserLayout() {

  return (
          <>

               <ScrollToTop />
               <AppHeader />
               <div>
                   <Outlet/>
               </div>
               <AppFooter />
               <UseScrollToTop />
          </>
  );
}
