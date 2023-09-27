import { useRef } from "react";
import {
  useGadgets,
  useMobileDetect,
  useTabletDetect,
} from "../utils/hooks/useDevice";
import Promo from "./Promo";
import AboutProject from "./AboutProject";
import AboutMe from "./AboutMe";
import Techs from "./Techs";
import styles from "./MainPage.module.css";

const Main = () => {
  const isGadgets = useGadgets();
  const isMobile = useMobileDetect();
  const isTablet = useTabletDetect();

  const aboutProjectSection = useRef(null);

  return (
    <main className={styles.main}>
      <Promo
        isGadgets={isGadgets}
        isMobile={isMobile}
        isTablet={isTablet}
        aboutProjectSection={aboutProjectSection}
      />
      <AboutProject ref={aboutProjectSection} isGadgets={isGadgets} />
      <Techs isTablet={isTablet} />
      <AboutMe isTablet={isTablet} />
    </main>
  );
};

export default Main;
