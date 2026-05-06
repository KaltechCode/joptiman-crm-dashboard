import { Stack } from "@mui/material";
import React from "react";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import CarriersItems from "./CarriersItems";
import Carrier1 from "../../assets/Carrier1.png";
import Carrier2 from "../../assets/Carrier2.png";
import Carrier3 from "../../assets/Carriers 3.png";
import Carrier4 from "../../assets/Carrier 4.png";
import Carrier5 from "../../assets/Carrier5.png";
import Carrier6 from "../../assets/Carrier 6.png";
import Carrier7 from "../../assets/Carrier 7.png";
import Carrier8 from "../../assets/Carrier8.png";
import Carrier9 from "../../assets/carrier9.png";
import UnitedHealthCare from "../../assets/United HealthCare.png";
import LSPN from "../../assets/LSPNPic.png";
import UnitedAmerica from "../../assets/UnitedAmericanPic.png";
import Cigna from "../../assets/CignaPic.png";
import Debtmerica from "../../assets/DeptmericaPic.png";
import Prudential from "../../assets/PrudentialPic.png";
import MutualOfUmaha from "../../assets/MutualOfUmahaPic.png";
import HealthSherpa from "../../assets/HealthSherpa.png";
import Symetra from "../../assets/Symetra.png";
import NationalLife from "../../assets/NationalLifePic.png";
import AmericanGeneral from "../../assets/AmericanGeneralLife.png";
import LicolnNational from "../../assets/Lincoln National.png";
import PrucoLife from "../../assets/Pruco Life.png";
import Allianzlife from "../../assets/Allianz.png";
import FidelityGuarantyLife from "../../assets/Fidelity & Guaranty Life.png";
import PacificLife from "../../assets/Pacific Life.png";

import "./style.scss";
const Carriers = () => {
  return (
    <>
      <Header />
      <div style={{ marginTop: "56px" }}>
        <div
          style={{
            display: "flex",
            height: "92vh",
          }}
        >
          <SideBar />
          <Stack className="carriers-container">
            <Stack className="carriers-inner-container">
              <CarriersItems
                carrierPic={Carrier3}
                url={
                  "https://secure.transamerica.com/login/sign-in/login.html?_ga=2.49544806.1513904153.1708785280-2023475507.1686661885"
                }
              />
              <CarriersItems
                carrierPic={Carrier4}
                url={"	https://www.athene.com/"}
              />
              <CarriersItems
                carrierPic={Carrier5}
                url={"	https://nationwidefinancial.com/"}
              />
              <CarriersItems
                carrierPic={Carrier6}
                url={"https://www.northamericancompany.com/"}
              />
              <CarriersItems
                carrierPic={Carrier7}
                url={
                  "https://accounts.hioscar.com/account/login/?client_context=business"
                }
              />
              <CarriersItems
                carrierPic={Carrier8}
                url={"https://www.aetna.com/insurance-producer.html"}
              />
              <CarriersItems
                carrierPic={Carrier9}
                url={"https://www.bcbstx.com/producer"}
              />
              <CarriersItems
                carrierPic={HealthSherpa}
                url={"https://shop.uhcexchange.com/sessions/new"}
              />
              <CarriersItems
                carrierPic={UnitedHealthCare}
                url={"https://www.uhc.com/agents-brokers"}
              />
              <CarriersItems
                carrierPic={LSPN}
                url={"https://www.legacyShield.com"}
                url2={"https://www.legacyShield.com/EstatePlan-Solutions"}
              />
              <CarriersItems
                carrierPic={Cigna}
                url={"https://cignaforbrokers.com/public/login"}
              />
              <CarriersItems
                carrierPic={
                  "https://www.cms.gov/themes/custom/cms_evo/logo.svg"
                }
                url={"https://portal.cms.gov/portal/"}
              />
              <CarriersItems
                carrierPic={Symetra}
                url={"https://sso.account.symetra.com"}
              />
              <CarriersItems
                carrierPic={NationalLife}
                url={"https://www.nationallife.com/Financial-Professionals"}
              />
              <CarriersItems
                carrierPic={AmericanGeneral}
                url={"https://www.corebridgefinancial.com/home#"}
              />
              <CarriersItems
                carrierPic={LicolnNational}
                url={"https://www.lincolnfinancial.com/public/professionals"}
              />
              <CarriersItems
                carrierPic={PrucoLife}
                url={"https://www.prudential.com/advisor-login"}
              />
              <CarriersItems
                carrierPic={Allianzlife}
                url={"https://www.allianzlife.com/for-financial-professionals"}
              />

              <CarriersItems
                carrierPic={FidelityGuarantyLife}
                url={"https://www.fglife.com/"}
              />
              <CarriersItems
                carrierPic={PacificLife}
                url={"https://loginportal.pacificlife.com/centrallogin"}
              />
            </Stack>
          </Stack>
        </div>
      </div>
    </>
  );
};

export default Carriers;
