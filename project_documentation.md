# Project Documentation: Tourism Web App

## 1. Overview & Aesthetics
This is a **modern, static tourism website** designed with a premium, travel-centric aesthetic.
- **Theme**: "Glassmorphism" & High-End Travel.
- **Color Palette**: 
  - **Primary**: Deep Blue & White.
  - **Gradients**: Purple-to-Blue (`#667eea` to `#764ba2`) for buttons and accents.
  - **Backgrounds**: High-resolution travel landscapes with dark overlays for text readability.
- **Typography**: 
  - **Headings**: `Montserrat` (Bold, Modern, Uppercase).
  - **Body**: `Poppins` (Clean, Readable, Sans-serif).
- **Visuals**:
  - Semi-transparent "frosted glass" cards (`backdrop-filter: blur`).
  - Large, high-quality images from Unsplash.
  - Smooth hover animations (lift and scale effects).

---

## 2. Structure & Navigation
The website functions as a **Single Page Application (SPA)** hybrid.
- **Main View (`index.html`)**: Contains the landing page and all "places" content. Navigation between these sections happens instantly using JavaScript (No page reload).
- **External Pages**: 
  - **Start Trip** (Booking Form)
  - **Register** (Sign Up)
  - **Login** (Sign In)
  - **Success** (Confirmation Page)

---

## 3. Sections (Main Page)

### A. Home Section (Landing)
- **Background**: Full-screen scenic travel image with a parallax effect.
- **Navbar**: Sticky, glass-effect bar with links:
  - `Home` (`#home`)
  - `Start Trip` (Links to `form for trip/index.html`)
  - `Create an Account` (Links to `register/index.html`)
  - `Login` (Links to `login form1/index.html`)
  - `Search Bar` (Visual only).
- **Hero Card**: A central glass card displaying:
  - **Title**: "TOURISM" (Large, Bold).
  - **Subtitle**: "Plan your trip."
  - **Button**: "Get Started" (Navigates to *Favourite Places*).

### B. Favourite Places Section
- **Layout**: A list of beautiful destination cards.
- **Interaction**: Clicking any card opens its **Detailed View**.
- **Destinations**:
  1.  **Taj Mahal**: Image + Brief Description.
  2.  **Golden Temple**: Image + Brief Description.
  3.  **Mysore Palace**: Image + Brief Description.
  4.  **Varanasi Temple**: Image + Brief Description.
  5.  **Haridwar**: Image + Brief Description.
- **Button**: "Back" (Returns to *Home*).

### C. Detailed Views (Hidden by default)
Each destination has a dedicated full-screen detailed view containing:
- **Title**: Large destination name.
- **Image Carousel**: Auto-sliding gallery of 3 high-res images.
- **Content**:
  - Detailed description / History.
  - Key Facts & Highlights (Bulleted lists with emojis: 📍, ✨, 🏛️).
  - "How to Reach" information.
- **Button**: "Back" (Returns to *Favourite Places*).

---

## 4. Separate Pages

### A. Register Page
- **Design**: Centered, glass-morphism card on a blue gradient background.
- **Fields**: Full Name, Phone, Address, Email, Password, Confirm Password.
- **Actions**: "Sign Up" button (Redirects to Success), "Sign In" link.

### B. Login Page
- **Design**: Simple, clean form.
- **Fields**: Username, Password.
- **Actions**: "Login" button, "Cancel" button (Returns to Home).

### C. Start Trip (Booking)
- **Design**: Functional form for trip planning.
- **Fields**: Name, Phone, Email, Trip Details (From/To), Pickup Address.
- **Action**: "Submit" (Redirects to Success).

---

## 5. Technical Implementation
- **Tech Stack**: HTML5, CSS3, JavaScript (Vanilla).
- **External Libraries**: 
  - Bootstrap 4 (Grid & Carousel).
  - Google Fonts (Montserrat, Poppins).
  - Unsplash Source (Images).
- **Logic**: A custom `display(sectionId)` function in `index.html` handles the showing/hiding of sections to mimic an app-like experience.
