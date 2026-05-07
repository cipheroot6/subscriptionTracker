import { useState, useEffect } from 'react';
import LpNav from '../components/LpNav';
import LpHero from '../components/LpHero';
import LpProofStrip from '../components/LpProofStrip';
import LpProblem from '../components/LpProblem';
import LpFeatures from '../components/LpFeatures';
import LpAnalyticsSection from '../components/LpAnalyticsSection';
import LpHowItWorks from '../components/LpHowItWorks';
import LpAbout from '../components/LpAbout';
import LpCta from '../components/LpCta';
import LpFooter from '../components/LpFooter';
import './landingPage.css';

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  // prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <div className="lp-page">
      <LpNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <LpHero />
      <LpProofStrip />
      <LpProblem />
      <LpFeatures />
      <LpAnalyticsSection />
      <LpHowItWorks />
      <LpAbout />
      <LpCta />
      <LpFooter />
    </div>
  );
}
