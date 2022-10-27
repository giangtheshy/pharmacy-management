import React, { FC, PropsWithChildren, Suspense } from "react";
import { useSelector } from "react-redux";
import { Theme } from "../../../config/constant/enum";
import { RootState } from "../../../store/reducers";

const CustomThemeApp: FC<PropsWithChildren> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.common.theme);

  const LightThemeComponent = React.lazy(() => import("./LightApp"));
  const DarkThemeComponent = React.lazy(() => import("./DarkApp"));

  return (
    <>
      {theme == Theme.DARK ? (
        <Suspense fallback={<div>Loading...</div>}>
          <DarkThemeComponent>{children}</DarkThemeComponent>
        </Suspense>
      ): (
        <Suspense fallback={<div>Loading...</div>}>
          <LightThemeComponent>{children}</LightThemeComponent>
        </Suspense>
      )}
    </>
  );
};

export default CustomThemeApp;
