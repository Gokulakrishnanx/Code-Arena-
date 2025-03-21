document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.querySelector('.start-btn');
    
    startButton.addEventListener('click', () => {
        // Add a smooth animation to the button
        startButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startButton.style.transform = 'scale(1)';
        }, 100);
        
        // You can add your navigation logic here
        console.log('Let\'s Start button clicked!');
    });
}); 