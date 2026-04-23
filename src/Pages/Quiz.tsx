import React, { useEffect, useState } from 'react';
import Header from '../Components/Base/Header';

import {useNavigate} from 'react-router';

import {
  type ChallengeOneCompleted,
  type ChallengeTwoCompleted,
  type ChallengeThreeCompleted,
  type DailyQuestionAnswered,
  type DailyQuestionAnswer
} from '../Types/types';


export default function Quiz() {
  const [today] = useState<string>(new Date().toDateString());
  const [dailyQuestionAnswer, setDailyQuestionAnswer] = useState<DailyQuestionAnswer>({ dailyQuestionAnswer: '' });

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [challengeOneCompleted, setChallengeOneCompleted] = useState<ChallengeOneCompleted>({ challengeOneCompleted: false });
  const [challengeTwoCompleted, setChallengeTwoCompleted] = useState<ChallengeTwoCompleted>({ challengeTwoCompleted: false });
  const [challengeThreeCompleted, setChallengeThreeCompleted] = useState<ChallengeThreeCompleted>({ challengeThreeCompleted: false });
  const [dailyQuestionAnswered, setDailyQuestionAnswered] = useState<DailyQuestionAnswered>({ dailyQuestionAnswered: false });

  const navigate = useNavigate();

  useEffect(() => {
    if (! localStorage.getItem('isStarted')) {
      navigate('/', { viewTransition: true, state: { from: 'quiz' } });
    }
  }, [navigate]);

  useEffect(() => {
    console.log({
      dailyQuestionAnswer,
      name,
      email,
      phone,
      challengeOneCompleted,
      challengeTwoCompleted,
      challengeThreeCompleted,
      dailyQuestionAnswered
    })
  }, [dailyQuestionAnswer, name, email, phone, challengeOneCompleted, challengeTwoCompleted, challengeThreeCompleted, dailyQuestionAnswered]);

  const handleSubmitDailyQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem('dailyQuestion') as RadioNodeList).value;
    setDailyQuestionAnswered({ dailyQuestionAnswered: true });
    setDailyQuestionAnswer({ dailyQuestionAnswer: value });
  }

  const handleChallengeOneSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChallengeOneCompleted({ challengeOneCompleted: true });
  }

  const handleChallengeTwoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChallengeTwoCompleted({ challengeTwoCompleted: true });
  }

  const handleChallengeThreeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChallengeThreeCompleted({ challengeThreeCompleted: true });
  }

  const handleParticipationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isFormValid = name.trim() !== '' &&
                        email.trim() !== '' &&
                        challengeOneCompleted.challengeOneCompleted &&
                        challengeTwoCompleted.challengeTwoCompleted &&
                        challengeThreeCompleted.challengeThreeCompleted &&
                        dailyQuestionAnswered.dailyQuestionAnswered &&
                        dailyQuestionAnswer.dailyQuestionAnswer.trim() !== '';

    console.log(isFormValid);

    if (! isFormValid ) {
      alert('Du skal have godkendt alle opgaver og svare på dagens spørgsmål for at kunne deltage i konkurrencen');
      return;
    }

    const today = new Date().toDateString();
    if (today === "Fri Apr 24 2026" || today === "Sat Apr 25 2026" || today === "Sun Apr 26 2026") {
      localStorage.removeItem('isStarted');
      localStorage.setItem('isParticipated', 'true');
      localStorage.setItem('data', JSON.stringify({
        name,
        email,
        phone,
        challengeOneCompleted,
        challengeTwoCompleted,
        challengeThreeCompleted,
        dailyQuestionAnswered,
        dailyQuestionAnswer,
        completedParticipation: true
      }))
    }

    document.cookie = '';
    document.cookie = 'isParticipated=true; max-age=31536000; path=/'; // set a cookie that expires in 1 year to indicate that the user has participated in the quiz, this is used to prevent users from accessing the quiz page without starting the quiz from the home page

    localStorage.removeItem('isStarted');
    localStorage.setItem('isParticipated', 'true');
    localStorage.setItem('data', JSON.stringify({
      name,
      email,
      phone,
      challengeOneCompleted,
      challengeTwoCompleted,
      challengeThreeCompleted,
      dailyQuestionAnswered,
      dailyQuestionAnswer,
      completedParticipation: true
    }))

    try {
      fetch('https://danishxboxleague.dk/wp-json/dxl/api/v1/competition/participate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          challengeOneCompleted: challengeOneCompleted.challengeOneCompleted,
          challengeTwoCompleted: challengeTwoCompleted.challengeTwoCompleted,
          challengeThreeCompleted: challengeThreeCompleted.challengeThreeCompleted,
          dailyQuestionAnswered: dailyQuestionAnswered.dailyQuestionAnswered,
          dailyQuestionAnswer: dailyQuestionAnswer.dailyQuestionAnswer,
          completedDate: new Date().toISOString()
        })
      }).then(response => {
        if (! response.ok) {
          alert('Der skete en fejl under indsendelsen af din deltagelse. Prøv igen senere.');
          throw new Error('Network response was not ok');
        }


      })
    } catch (error) {
      console.error('Error submitting participation:', error);
      alert('Der skete en fejl under indsendelsen af din deltagelse. Prøv igen senere.');
      return;
    }

    navigate('/quiz-ended', { viewTransition: true, state: { from: 'quiz' } });
  }

  return (
    <>
      <Header />
      <section>
        <h1>DXL Missionen</h1>
        <p className="date">{today}</p>
      </section>
      <section id="challenges">
        <div className="challenge-item">
          <div className="item-header">
            <h3>Dagens spørgsmål</h3>
          </div>
          <div className="item-body">
            <p>Hvor mange medlemmer er der cirka i Danish Xbox League's facebook gruppe?</p>
            <form onSubmit={handleSubmitDailyQuestion}>
              <div className="check-input">
                <input type="radio" name="dailyQuestion" value="A" id="dailyQuestion" onChange={() => {
                  setDailyQuestionAnswer({ dailyQuestionAnswer: 'A' });
                  setDailyQuestionAnswered({ dailyQuestionAnswered: true });
                }} />
                <label htmlFor="dailyQuestion">A: Mellem 570 og 680 medlemmer</label>
              </div>
              <div className="check-input">
                <input type="radio" name="dailyQuestion" value="B" id="dailyQuestionTwo" onChange={() => {
                  setDailyQuestionAnswer({ dailyQuestionAnswer: 'B' });
                  setDailyQuestionAnswered({ dailyQuestionAnswered: true });
                }} />
                <label htmlFor="dailyQuestionTwo">B: Mellem 870 og 1.140 medlemmer</label>
              </div>
              <div className="check-input">
                <input type="radio" name="dailyQuestion" value="C" id="dailyQuestionThree" onChange={() => {
                  setDailyQuestionAnswer({ dailyQuestionAnswer: 'C' });
                  setDailyQuestionAnswered({ dailyQuestionAnswered: true });
                }} />
                <label htmlFor="dailyQuestionThree">C: Mellem 1.280 og 1.370 medlemmer</label>
              </div>
            </form>
          </div>
        </div>
        <div className="challenge-item">
          <div className="item-header">
            <h3>Spil Cornhold</h3>
          </div>
          <div className="item-body">
            <p>Tag et spil cornhole på standen, du har enten mulighed for at spille mod din partner eller mod et medlem på standen.</p>
            <form action="" onSubmit={handleChallengeOneSubmit}>
              <div className="check-input">
                <input type="checkbox" name="challengeOne" id="challengeOne" onChange={(e) => {
                  setChallengeOneCompleted({ challengeOneCompleted: e.currentTarget.checked });
                }} />
                <label htmlFor="challengeOne">Er denne opgave løst</label>
              </div>
            </form>
          </div>
        </div>
        <div className="challenge-item">
          <div className="item-header">
            <h3>Tag et billede ved My-Selfie kammeraet</h3>
          </div>
          <div className="item-body">
            <p>For at fuldføre denne opgave skal du tage et billede af dig selv eller med dig selv og en anden med My-Selfie kameraet</p>
            <form action="" onSubmit={handleChallengeTwoSubmit}>
              <div className="check-input">
                <input type="checkbox" name="challengeTwo" id="challengeTwo" onChange={(e) => {
                  setChallengeTwoCompleted({ challengeTwoCompleted: e.currentTarget.checked });
                }} />
                <label htmlFor="challengeTwo">Er denne opgave løst</label>
              </div>
            </form>
          </div>
        </div>
        <div className="challenge-item">
          <div className="item-header">
            <h3>Prøv et spil på en XBOX</h3>
          </div>
          <div className="item-body">
            <p>For at udføre denne opgave, skal du spille på en af de udvalgte XBOX maskiner der står rundt på DXL's stand, hvor du kan prøve forskellige typer spil.</p>
            <form action="" onSubmit={handleChallengeThreeSubmit}>
              <div className="check-input">
                <input type="checkbox" name="challengeThree" id="challengeThree" onChange={(e) => {
                  setChallengeThreeCompleted({ challengeThreeCompleted: e.currentTarget.checked });
                }} />
                <label htmlFor="challengeThree">Er denne opgave løst</label>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section id="participation">
        <h3>Kontakt oplysninger</h3>
        <p>Vi skal bruge nogle kontaktoplysninger for at kunne kontakte dig hvis du vinder dagens præmie.</p>
        <form onSubmit={handleParticipationSubmit}>
          <div className="input-group">
            <label htmlFor="name">Fulde navn</label>
            <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.currentTarget.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="phone">Telefonnummer</label>
            <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.currentTarget.value)} />
          </div>
          <button type="submit">Deltag i konkurrencen</button>
        </form>
      </section>
    </>
  );
}