// Create stars in the background
const createStars = () => {
    const starCount = 250; // Increase the number of stars for density
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Random size for the stars
        const size = Math.random() * 3 + 1; // Size between 1px and 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.opacity = Math.random(); // Random opacity for twinkling effect
        
        // Set animation for moving stars
        const animationDuration = Math.random() * 5 + 5; // Random duration between 5s and 10s
        star.style.animationDuration = `${animationDuration}s`; // Set duration for the animation
        star.style.animationDelay = `${Math.random() * 5}s`; // Random delay
        star.style.animationName = 'moveStar'; // Animation name
        
        document.body.appendChild(star);
    }
};

// Handle mouse movement for the custom cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.magic-cursor');
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;

    // Bigger star effect with trail
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = `${e.pageX}px`;
    star.style.top = `${e.pageY}px`;
    star.style.width = '10px'; // Larger cursor star
    star.style.height = '10px'; // Larger cursor star
    star.style.opacity = 0.8; // Make the cursor star slightly visible
    star.style.transition = 'transform 0.3s, opacity 0.7s'; // Add transition for effect
    star.style.transform = 'translate(-50%, -50%)'; // Center the star
    document.body.appendChild(star);
    
    // Animate star trail effect
    setTimeout(() => {
        star.style.transform = 'translate(-50%, -50%) scale(0)'; // Scale down
        star.style.opacity = 0; // Fade out
    }, 100); // Short delay before scaling down

    setTimeout(() => {
        star.remove();
    }, 700); // Remove after animation
});

// Scroll-triggered animation for the project boxes
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Trigger animation when project boxes come into view
function handleScroll() {
    const projectBoxes = document.querySelectorAll('.project-box');
    projectBoxes.forEach(box => {
        if (isInViewport(box)) {
            box.classList.add('show'); // Add the 'show' class to trigger the animation
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);

// Show welcome line after a delay
setTimeout(() => {
    const welcomeLine = document.querySelector('.welcome-line');
    welcomeLine.classList.add('show'); // Add class to show the line

    // After the welcome line is shown, move it to the top-left corner
    setTimeout(() => {
        welcomeLine.classList.add('move'); // Add class to move the line
    }, 1000); // Adjust this delay as needed
}, 500); // Initial delay before showing the line

// Initialize the stars on page load
createStars();

// Trigger scroll event on page load to check visible elements
handleScroll();

// Text to type with corresponding colors
const domains = [
    { text: '- Web Developer', color: '#FF5733' },   // Red
    { text: '- Java Developer', color: '#33FF57' },  // Green
    { text: '- 3D Animation', color: '#3357FF' }, 
    { text: '- Graphics Designer', color: '#3F57F7' },    // Blue
    // Add more domains as needed
];

// Typing animation function
const typeDomains = (element) => {
    let index = 0; // Start at the first domain
    element.innerHTML = '&nbsp;&nbsp;&nbsp;'; // Add initial spaces

    const typeNextDomain = () => {
        if (index < domains.length) {
            const domain = domains[index];
            // Clear the previous domain but keep the initial spaces
            element.innerHTML = '&nbsp;&nbsp;&nbsp;'; 

            // Create a span for colored text
            const span = document.createElement('span');
            span.style.color = domain.color; // Set the color for the domain
            element.appendChild(span); // Append the span for colored text

            // Type effect
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < domain.text.length) {
                    span.textContent += domain.text.charAt(charIndex); // Append characters to the span
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                    // Wait before typing the next domain
                    setTimeout(() => {
                        index++;
                        typeNextDomain(); // Move to the next domain
                    }, 1000); // Adjust delay as needed
                }
            }, 100); // Adjust typing speed as needed
        } else {
            // Restart the animation from the first domain
            index = 0; // Reset index to start over
            typeNextDomain(); // Start typing again
        }
    };

    typeNextDomain(); // Start typing
};

//
//Navbar section
//
// Call the typing animation on the desired element
const domainElement = document.querySelector('.domain-animation'); // Ensure this matches your HTML
typeDomains(domainElement);

// Handle button click events
document.getElementById('email-btn').addEventListener('click', () => {
    const contactMessage = document.getElementById('contact-message');
    contactMessage.textContent = 'You can reach me at: your.email@example.com'; // Replace with your email
});

document.getElementById('linkedin-btn').addEventListener('click', () => {
    const contactMessage = document.getElementById('contact-message');
    contactMessage.textContent = 'Check out my LinkedIn profile!'; // Add LinkedIn link if needed
    // Optionally redirect to LinkedIn
    window.open('https://www.linkedin.com/in/yourprofile', '_blank'); // Replace with your LinkedIn URL
});

document.getElementById('github-btn').addEventListener('click', () => {
    const contactMessage = document.getElementById('contact-message');
    contactMessage.textContent = 'Visit my GitHub repository!'; // Add GitHub link if needed
    // Optionally redirect to GitHub
    window.open('https://github.com/yourusername', '_blank'); // Replace with your GitHub URL
});
