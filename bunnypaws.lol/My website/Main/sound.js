// Sound player with play/pause toggle and loop
document.addEventListener('DOMContentLoaded', () => {
    const soundButton = document.getElementById('sound');
    const audioFile = new Audio('./UT99.mp3');
    audioFile.loop = true; // Enable looping
    let isPlaying = false;

    if (!soundButton) {
        console.error('Sound button not found!');
        return;
    }

    console.log('Sound button found, setting up...');
    soundButton.textContent = '>> click me';

    soundButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('Button clicked, isPlaying:', isPlaying);
        
        if (!isPlaying) {
            // Play or resume
            isPlaying = true;
            soundButton.textContent = 'Pause';
            console.log('Playing sound...');
            audioFile.play().catch(err => {
                console.error('Error playing audio:', err);
                isPlaying = false;
                soundButton.textContent = 'Play';
            });
        } else {
            // Pause
            isPlaying = false;
            soundButton.textContent = 'Play';
            console.log('Paused sound');
            audioFile.pause();
        }
    });

    audioFile.addEventListener('error', (err) => {
        console.error('Audio error:', err);
        isPlaying = false;
        soundButton.textContent = 'Play';
    });
});
