import React, { useEffect, useState } from 'react';
import { ref, onValue } from "firebase/database"
import database from './backend.js'
import Lightbulb from './Lightbulb.jsx'
import LightEffect from './LightEffect.jsx'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const dbRef = ref(database, 'LuminaApp');

      const unsubscribe = onValue(dbRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
              setLoading(false); 
          }
      });

      return () => unsubscribe();
  }, []);
  
  return (
    <>
      {loading ? (""): 
      (
        <>
        <LightEffect />
        <Lightbulb />
        </>
      )}
    </>
  )
}

export default App
