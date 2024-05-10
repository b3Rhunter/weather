// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import axios from 'axios';
import Logo from './assets/logo.svg'

function App() {
  const [day1Data, setDay1Data] = useState(null);
  const [day2Data, setDay2Data] = useState(null);
  const [day3Data, setDay3Data] = useState(null);
  const [tstorm, setTstorm] = useState(null);
  const [watches, setWatches] = useState();
  const [discussions, setDiscussions] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const day1Response = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Day%201.json');
        console.log(day1Response.data)
        setDay1Data(day1Response.data);

        const day2Response = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Day%202.json');
        setDay2Data(day2Response.data);

        const day3Response = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Day%203.json');
        setDay3Data(day3Response.data);

        const tstormResponse = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Thunderstorm.json');
        setTstorm(tstormResponse.data);

        const watchesResponse = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Watches.json');
        setWatches(watchesResponse.data);

        const discussionsResponse = await axios.get('https://weather-7b816-default-rtdb.firebaseio.com/forecast/Discussions.json');
        setDiscussions(discussionsResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className='app'>

        <nav className='navbar'>
          <NavLink to="/" id='logo' className={({ isActive }) => isActive ? 'active' : ''}>
            <img src={Logo} alt="SPC Logo" className='logo' />
          </NavLink>
          <NavLink to="/day1" className={({ isActive }) => isActive ? 'active' : ''}>Day 1</NavLink>
          <NavLink to="/day2" className={({ isActive }) => isActive ? 'active' : ''}>Day 2</NavLink>
          <NavLink to="/day3" className={({ isActive }) => isActive ? 'active' : ''}>Day 3</NavLink>
          <NavLink to="/watches" className={({ isActive }) => isActive ? 'active' : ''}>Watches</NavLink>
          <NavLink to="/discussions" className={({ isActive }) => isActive ? 'active' : ''}>Discussions</NavLink>
        </nav>



        <Routes>
          <Route
            path="/"
            element={
              <div className="page">
                <h2>Thunderstorm Outlook</h2>
                {tstorm ? (
                  <img src={tstorm.imageUrl} alt="Thunderstorm Outlook" />
                ) : (
                  <p>No thunderstorm outlook available</p>
                )}
              </div>
            }
          />
          <Route path="/day1" element={
            <div className='page'>
              <h2>Day 1 Outlook</h2>
              {day1Data && <img src={day1Data.imageUrl} alt="Day 1 Outlook" />}
              {day1Data && <pre>{day1Data.text}</pre>}
            </div>
          } />
          <Route path="/day2" element={
            <div className='page'>
              <h2>Day 2 Outlook</h2>
              {day2Data && <img src={day2Data.imageUrl} alt="Day 2 Outlook" />}
              {day2Data && <pre>{day2Data.text}</pre>}
            </div>
          } />
          <Route path="/day3" element={
            <div className='page'>
              <h2>Day 3 Outlook</h2>
              {day3Data && <img src={day3Data.imageUrl} alt="Day 3 Outlook" />}
              {day3Data && <pre>{day3Data.text}</pre>}
            </div>
          } />
          <Route
            path="/watches"
            element={
              <div className="page">
                <h2>Watches and Warnings</h2>
                {watches && watches.length > 0 ? (
                  watches.map((watch, index) => (
                    <div key={index} className="watchPage">
                      <img className="watchImg" src={watch.imageUrl} alt={`Watch ${index + 1}`} />
                      <pre>{watch.text}</pre>
                    </div>
                  ))
                ) : (
                  <p>No current watches or warnings</p>
                )}
              </div>
            }
          />

          <Route
            path="/discussions"
            element={
              <div className="page">
                <h2>Meso Discussions</h2>
                {discussions && discussions.length > 0 ? (
                  discussions.map((discussion, index) => (
                    <div className='cont' key={index}>
                      <img className="disImg" src={discussion.imageUrl} alt={`Discussion ${index + 1}`} />
                      <pre>{discussion.text}</pre>
                    </div>
                  ))
                ) : (
                  <p>No current discussions</p>
                )}
              </div>
            }
          />
        </Routes>


        <footer>
          <p>created by: Stanton Sailsbury</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
