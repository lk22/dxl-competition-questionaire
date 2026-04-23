import { useState, useEffect } from 'react'
import XboxController from './assets/xbox_controller 1.png'
import XboxTshirt from './assets/xbox_tshirt.png'
import './App.css'

import {useNavigate} from 'react-router'

// Components
import Header from './Components/Base/Header'

function App() {
  const [isAccessible, setIsAccessible] = useState<boolean>(true);
  const [today] = useState<Date>(new Date());
  const [allowedParticipateDates] = useState<string[]>(['Thu Apr 23 2026', 'Fri Apr 24 2026', 'Sat Apr 25 2026', 'Sun Apr 26 2026']);

  const navigate = useNavigate();

  useEffect(() => {
  const getCookie = (name: string) => {
    const found = document.cookie
      .split('; ')
      .find((c) => c.startsWith(name + '='));
    return found ? found.split('=')[1] : null;
  };

  const todayStr = new Date().toDateString();
  const participatedDate = getCookie('participatedDate');

  const isAllowedDate = allowedParticipateDates.includes(todayStr);
  const isNewDayComparedToCookie =
    participatedDate !== null && participatedDate !== todayStr;

  // Only clear when cookie belongs to another day
  if (isNewDayComparedToCookie) {
    document.cookie = 'participatedDate=; max-age=0; path=/';
    document.cookie = 'isStarted=; max-age=0; path=/';
    document.cookie = 'isParticipated=; max-age=0; path=/';
    localStorage.removeItem('isStarted');
    localStorage.removeItem('data');
  }

  if (!isAllowedDate) {
    setIsAccessible(false);
    return;
  }

  if (localStorage.getItem('isStarted') === 'true' && getCookie('isParticipated') !== 'true') {
    navigate('/quiz', { viewTransition: true, state: { from: 'home' } });
    return;
  }

  if (getCookie('isParticipated') === 'true' || getCookie('isStarted') === 'true') {
    navigate('/quiz-ended', { viewTransition: true, state: { from: 'home' } });
    return;
  }

  setIsAccessible(true);
}, [navigate, allowedParticipateDates]);


  const handleStart = () => {
    localStorage.setItem('isStarted', 'true');
    document.cookie = 'isStarted=true; max-age=86400; path=/'; // expires in 1 day
    // set a cookie that expires in 1 day to indicate that the user has started the quiz, this is used to prevent users from accessing the quiz page without starting the quiz from the home page

    // set expiration to 1 day but needs to reset at 00:00 every day, so we need to calculate the remaining time until the end of the day and set the max-age accordingly
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const maxAge = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);
    document.cookie = `participatedDate=${now.toDateString()}; max-age=${maxAge}; path=/`;
    document.cookie = `isStarted=true; max-age=${maxAge}; path=/`;
    navigate('/quiz', { viewTransition: true, state: { from: 'home' } });
  }

  return (
    <>
      <Header />
        {isAccessible ? (
          <>
        <section>
          <div className="hero">
            {/* <img src={heroImg} className="base" width="170" height="179" alt="" />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" /> */}
          </div>
            <div>
              <h1>DXL Missionen</h1>
              {isAccessible ? <p>{today.toDateString()}</p> : <p>Website is not accessible</p>}
              <p>
                <strong>Danish Xbox League</strong> afholder til dette års Gamebox Festival en konkurrence hver dag hvor du får chancen for at vinde fede XBOX præmier
              </p>
              <p>
                Der bliver trukket en vinder for hver dag under festivalen
              </p>
              <p>
                I tidsrummet:
              </p>
              <p><strong>Fredag: 19:00</strong></p>
              <p><strong>Lørdag: 19:00</strong></p>
              <p><strong>Søndag: 18:00</strong></p>
            </div>
          </section>
          <section className="prices-grid">
            <div className="price">
              <div className="image-item">
                  <img src={XboxController} alt="Xbox Controller" height={400} />
              </div>
              <h3>Xbox Controller</h3>
            </div>
            <div className="price">
              <div className="image-item">
                  <img src={XboxTshirt} alt="Xbox T-shirt" height={300} />
              </div>
              <h3>Xbox T-shirt</h3>
            </div>
          </section>
          <section>
            <p>
              For at deltage i konkurrencen for hver dag skal du klare forskellige opgaver der foretages på Danish Xbox League’s stand du finder under festivalen
            </p>
            <h3>
              Praktisk info
            </h3>
            <ul>
              <li>Hver deltager kan kun deltage 1 gang pr. dag.</li>
              <li>Alle 3 aktiviteter skal gennemføres for at deltage.</li>
              <li>En fra standen skal godkende deltagelsen.</li>
              <li>Vinderen trækkes blandt dagens gyldige deltagelser.</li>
            </ul>
          </section>
          <section id="get-started">
            <h3>Skal vi komme igang?</h3>
            <p>Er du klar til at deltage i konkurrencen?</p>
            <button onClick={handleStart} className="cta-button">Ja, lad os komme igang!</button>
          </section>
          </>
        ) : (
          <>
            <section>
              <h1>DXL Missionen</h1>
              <p>Vi er kede af det, men denne side er kun tilgængelig under selve festivalen. som forløber sig i datoerne (24/04 - 26/04)</p>
            </section>
          </>
        )}
    </>
  )
}

export default App
