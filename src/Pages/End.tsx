import { useState, useEffect } from 'react';
import SuccessParticipatedImg from '../assets/success_participated.png';

// components
import Header from '../Components/Base/Header';

export default function End() {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setName(parsedData.name);
    }
  }, []);

  return (
    <>
      <Header />
      <section id="center" className="end-page">
        <img src={SuccessParticipatedImg} alt="Success" height={250} width={250}/>
        <h1>Tak for din deltagelse!</h1>
        <p>Tak for din deltagelse, <strong className="participated-name">{name}</strong>!</p>
        <p>Vi ønsker dig held og lykke i lodtrækningen!</p>
        <p>Vi gemmer dine oplysninger indtil dagens lodtrækning er afsluttet.</p>
      </section>
    </>
  );
}