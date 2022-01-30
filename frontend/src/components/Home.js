import React, { useEffect, useState } from "react";
import { useBackendUrl } from "./context/Context";
import Socials from "./Socials";
import FadeIn from "react-fade-in";
import HomeCard from "./HomeCard";
import HomeCSS from "./css/HomeCard.module.css";
import Loading from "./Loading";
import axios from "axios";

export default function Home() {
  const backendUrl = useBackendUrl();
  const [homeContent, setHomeContent] = useState();
  const [loading, setLoading] = useState(false);

  const onStart = async () => {
    await axios.get(`${backendUrl}/gethomecontent`).then((res) => {
      setHomeContent(res.data);
    });
    setLoading(true);
  };

  useEffect(() => {
    onStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FadeIn delay={150} transitionDuration={700}>
      {loading ? (
        <FadeIn delay={150} transitionDuration={700}>
          <HomeCard
            pfp={homeContent.profilePic}
            description={homeContent.intro}
          />
          <Socials />
          <div className={HomeCSS.pdfDiv}>
            <iframe
              id={HomeCSS.pdf}
              src={homeContent.resume}
              type="application/pdf"
              title="pdf"
            />
          </div>
        </FadeIn>
      ) : (
        <Loading />
      )}
    </FadeIn>
  );
}
