import { useState, useEffect } from 'react'
import XboxController from './assets/xbox_controller 1.png'
import XboxTshirt from './assets/xbox_tshirt.png'
import './App.css'

import {useNavigate} from 'react-router'

// Components
import Header from './Components/Base/Header'

function App() {
  const [isAccessible, setIsAccessible] = useState<boolean>(true);
  const [today, setToday] = useState<Date>(new Date());

  const navigate = useNavigate();

  useEffect(() => {

    const cookieName = (cookieName: string) => {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return cookie.split('=')[1];
        }
      }
      return null;
    }

    if (
      (localStorage.getItem('isStarted') && localStorage.getItem('isStarted') === 'true') ||
      cookieName('isStarted') === 'true'
    ) {
      navigate('/started', { viewTransition: true, state: { from: 'home' } });
    } else if (cookieName('isParticipated') === 'true') {
      navigate('/ended', { viewTransition: true, state: { from: 'home' } });
    } else {
      handleAccessibility();
    }
  }, [navigate]);

  const handleAccessibility = () => {
    const today = new Date();
    // we need to handle certain dates where the event is active but the website should be accessible for everyone, e.g. during the event itself
    const eventStartDate = new Date('2026-04-24');
    const lastDateOfEvent = new Date('2024-04-26');

    const isEventActive = today >= eventStartDate && today <= lastDateOfEvent;

    if (today.getDay() === 0 || today.getDay() === 6) {
      setIsAccessible(false);
    } else {
      setIsAccessible(true);
    }

    // if the event is active and the date is not lower than start date or higher than end date, we need to make the website accessible for everyone, even on weekends
    if ( today >= eventStartDate && today <= lastDateOfEvent) {
      setIsAccessible(true);
      setToday(today);
    }

    if (isEventActive) {
      setIsAccessible(true);
    }
  }

  const handleStart = () => {
    localStorage.setItem('isStarted', 'true');
    // set a cookie that expires in 1 day to indicate that the user has started the quiz, this is used to prevent users from accessing the quiz page without starting the quiz from the home page

    // set expiration to 1 day but needs to reset at 00:00 every day, so we need to calculate the remaining time until the end of the day and set the max-age accordingly
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const maxAge = Math.floor((endOfDay.getTime() - now.getTime()) / 1000);

    document.cookie = `isStarted=true; max-age=${maxAge}; path=/`;
    navigate('/started', { viewTransition: true, state: { from: 'home' } });
  }

  return (
    <>
      <Header />
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
      <section>
        <h3>Skal vi komme igang?</h3>
        <p>Er du klar til at deltage i konkurrencen?</p>
        <button onClick={handleStart} className="cta-button">Ja, lad os komme igang!</button>
      </section>
    </>
  )
}

export default App
