import React, { useState } from 'react';
import Main from './components/Main/Main';
import Tour from 'reactour';

import VideosState from './context/videos/VideosState';

function App() {
    const [isTourOpen, setOpen] = useState(false);
    const [isShowingMore, setShowingMore] = useState(false);
    const [customComps, setCustomComps] = useState(false);
    const accentColor = 'linear-gradient(to right, #1c8f9e, #5cb7b7)';

    const showTour = () => {
        setOpen(true);
    };

    return (
        <VideosState>
            <div style={{ backgroundColor: '#3A3D4D' }}>
                <Main showTour={showTour} />
                <footer style={{ margin: '0px', textAlign: 'center' }}>
                    <p
                        style={{
                            margin: '0px',
                            padding: '50px',
                            color: '#CCCCCC'
                        }}
                    >
                        Hecho con ❤️ por{' '}
                        <a
                            href="https://agustinannacondia.site/"
                            target="__blank"
                            style={{ color: '#FFFFFF', textDecoration: 'none' }}
                        >
                            <strong>Agustin Annacondia</strong>
                        </a>
                    </p>
                </footer>
                <Tour
                    onRequestClose={() => setOpen(false)}
                    steps={tourConfig}
                    isOpen={isTourOpen}
                    maskClassName="mask"
                    className="helper"
                    rounded={5}
                    accentColor={accentColor}
                />
            </div>
        </VideosState>
    );
}

const tourConfig = [
    {
        selector: '[data-tour="first-step"]',
        content: 'Comienza buscando videos desde nuestro buscador 🔎'
    },
    {
        selector: '[data-tour="second-step"]',
        content: 'Arrastra los videos que quieras agregar desde este panel 👈'
    },
    {
        selector: '[data-tour="third-step"]',
        content:
            'Y crea tu playlist favorita de una forma mucho mas divertida! 🔥'
    }
];

export default App;
