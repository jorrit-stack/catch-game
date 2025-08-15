// js/ui.js
import { VIBE_MESSAGES } from './constants.js';
import { soundManager } from './soundManager.js';
import { gameState } from './gameState.js';

export function rotateVibeMessage() {
    const vibeElement = document.getElementById('vibeMessage');
    vibeElement.style.opacity = '0';

    setTimeout(() => {
        gameState.currentVibeIndex = (gameState.currentVibeIndex + 1) % VIBE_MESSAGES.length;
        vibeElement.textContent = VIBE_MESSAGES[gameState.currentVibeIndex];
        vibeElement.style.opacity = '1';
    }, 300);
}

export function createParticle() {
    const particle = document.createElement('div');
    
    // 30% chance for rainbow particle
    if (Math.random() < 0.3) {
        particle.className = 'particle rainbow-particle';
    } else {
        particle.className = 'particle';
    }
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 2) + 's';

    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 5000);
}

export function createSparkle() {
    const sparkle = document.createElement('div');
    
    // 40% chance for rainbow sparkle
    if (Math.random() < 0.4) {
        sparkle.className = 'rainbow-sparkle';
        sparkle.innerHTML = '🌈';
    } else {
        sparkle.className = 'sparkle';
        sparkle.innerHTML = '✨';
    }
    
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, sparkle.className.includes('rainbow') ? 3000 : 2000);
}

export function createCelebration() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            
            // Mix regular and rainbow celebrations
            const isRainbow = Math.random() < 0.5;
            if (isRainbow) {
                celebration.className = 'rainbow-celebration';
                celebration.innerHTML = ['🌈', '🎨', '🦄', '💫', '🌟'][Math.floor(Math.random() * 5)];
            } else {
                celebration.innerHTML = ['🎉', '✨', '🔥', '⚡', '🌟'][Math.floor(Math.random() * 5)];
                celebration.style.animation = 'celebration-pop 1s ease-out forwards';
            }
            
            celebration.style.position = 'fixed';
            celebration.style.left = Math.random() * 100 + '%';
            celebration.style.top = Math.random() * 100 + '%';
            celebration.style.fontSize = '2rem';
            celebration.style.pointerEvents = 'none';
            celebration.style.zIndex = '1000';

            document.body.appendChild(celebration);

            setTimeout(() => celebration.remove(), isRainbow ? 2000 : 1000);
        }, i * 100);
    }
}

export function createRainbowCelebration() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.className = 'rainbow-celebration';
            celebration.innerHTML = ['🌈', '🎨', '🦄', '💫', '🌟', '✨', '🎭', '🎪'][Math.floor(Math.random() * 8)];
            celebration.style.position = 'fixed';
            celebration.style.left = Math.random() * 100 + '%';
            celebration.style.top = Math.random() * 100 + '%';
            celebration.style.fontSize = '3rem';
            celebration.style.pointerEvents = 'none';
            celebration.style.zIndex = '1000';

            document.body.appendChild(celebration);

            setTimeout(() => celebration.remove(), 2000);
        }, i * 200);
    }
}

export function createThemeCelebration() {
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const celebration = document.createElement('div');
            celebration.innerHTML = ['🌟', '✨', '🎨', '🌈', '💫', '🎭'][Math.floor(Math.random() * 6)];
            celebration.style.position = 'fixed';
            celebration.style.left = Math.random() * 100 + '%';
            celebration.style.top = Math.random() * 100 + '%';
            celebration.style.fontSize = '2.5rem';
            celebration.style.pointerEvents = 'none';
            celebration.style.zIndex = '1000';
            celebration.style.animation = 'theme-celebration 2s ease-out forwards';

            document.body.appendChild(celebration);

            setTimeout(() => celebration.remove(), 2000);
        }, i * 150);
    }
}

export function createNegativeEffect() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const effect = document.createElement('div');
            effect.innerHTML = ['💀', '😈', '🔥', '💥', '⚡'][Math.floor(Math.random() * 5)];
            effect.style.position = 'fixed';
            effect.style.left = Math.random() * 100 + '%';
            effect.style.top = Math.random() * 100 + '%';
            effect.style.fontSize = '2rem';
            effect.style.pointerEvents = 'none';
            effect.style.zIndex = '1000';
            effect.style.color = '#ff0000';
            effect.style.animation = 'negative-effect 1s ease-out forwards';

            document.body.appendChild(effect);

            setTimeout(() => effect.remove(), 1000);
        }, i * 100);
    }
}

export function showPowerUp(text, duration) {
    const powerUpEl = document.createElement('div');
    powerUpEl.className = 'power-up';
    powerUpEl.textContent = text;
    powerUpEl.dataset.powerup = text;
    document.getElementById('powerUps').appendChild(powerUpEl);
}

export function removePowerUp(text) {
    const powerUpEl = document.querySelector(`[data-powerup="${text}"]`);
    if (powerUpEl) powerUpEl.remove();
}

export function updateVibeMessage() {
    let messages;

    if (gameState.streak >= 10) {
        messages = ["UNSTOPPABLE! 🔥🔥", "LEGENDARY STREAK! 👑", "DANCING GOD! ⚡⚡"];
    } else if (gameState.streak >= 5) {
        messages = ["ON FIRE! 🔥", "STREAK MASTER! ⚡", "UNSTOPPABLE! 🚀"];
    } else if (gameState.score >= 25) {
        messages = ["EXPERT CATCHER! 🎯", "DANCE MASTER! 💃", "LIGHTNING FAST! ⚡", "RAINBOW POWER! 🌈"];
    } else {
        messages = [
            "Nice catch! 🎯",
            "Smooth moves! 💃",
            "You got him! 🔥",
            "Dancing master! ⚡",
            "Keep it up! 🌟",
            "On fire! 🚀",
            "Rainbow magic! 🌈"
        ];
    }

    const vibeElement = document.getElementById('vibeMessage');
    vibeElement.textContent = messages[Math.floor(Math.random() * messages.length)];
    
    // Add rainbow border for high streaks
    if (gameState.streak >= 15) {
        vibeElement.classList.add('rainbow-border');
        setTimeout(() => vibeElement.classList.remove('rainbow-border'), 3000);
    }
}