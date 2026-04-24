import { useState, useEffect } from 'react';
import SuccessParticipatedImg from '../assets/success_participated.png';
import {motion} from 'motion/react';

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
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
        <section id="center" className="end-page">
          <img src={SuccessParticipatedImg} alt="Success" height={250} width={250}/>
          <h1>Tak for din deltagelse!</h1>
          <p>Tak for din deltagelse, <strong className="participated-name">{name}</strong>!</p>
          <p>Vi ønsker dig held og lykke i lodtrækningen!</p>
          <p>Vi gemmer dine oplysninger indtil dagens lodtrækning er afsluttet.</p>
        </section>
      </motion.div>
    </>
  );
}