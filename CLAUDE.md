# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Multi-page website for a learning support company (toiee Lab certified partner) offering "Beyond Learning" seminars and consultation services.

## Project Structure

```
/
├── public/                 # All website files
│   ├── index.html          # Homepage with hero and service overview
│   ├── about.html          # Company info and philosophy
│   ├── services.html       # Services overview page
│   ├── seminars/           # Individual seminar detail pages
│   │   ├── creative-question.html
│   │   ├── leadership.html
│   │   ├── communication.html
│   │   ├── goodself.html
│   │   ├── means-purpose.html
│   │   ├── meta-memory.html
│   │   ├── reflection.html
│   │   ├── reading.html
│   │   └── mental-model.html
│   ├── consultation.html   # Individual consultation details
│   ├── testimonials.html   # Case studies and customer voices
│   ├── faq.html           # Frequently asked questions
│   ├── contact.html       # Contact and application forms
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── favicon.ico
└── CLAUDE.md              # Project documentation
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS (CDN)
- **Animations**: AOS + Animate.css
- **Icons**: Lucide icons
- **Fonts**: Google Fonts (Japanese support)
- **Images**: Unsplash.com

## Design System

- **Colors**: 
  - Primary: Soft Navy (#2563EB)
  - Accent: Light Blue (#60A5FA), Soft Pink (#F9A8D4), Light Green (#86EFAC)
  - Background: White (#FFFFFF), Light Gray (#F8FAFC)
- **Design**: Apple-inspired minimal with warm elements
- **Responsive**: Mobile-first approach

## Development Commands

- Open any HTML file directly in browser for testing
- Use browser dev tools for responsive testing
- Validate HTML using W3C validator
- Test forms functionality manually

## Architecture Notes

### Page Structure Pattern
All pages follow a consistent structure:
1. **Header**: Fixed navigation with mobile menu toggle
2. **Main Content**: Semantic sections with AOS animations
3. **Footer**: Company info, links, and contact details

### CSS Architecture
- **Custom Properties**: Defined in `:root` for consistent theming
- **Component Classes**: `.btn-primary`, `.card-hover`, `.seminar-card` etc.
- **Utility Classes**: Tailwind CSS for rapid styling
- **Animation Classes**: AOS data attributes + custom CSS transitions

### JavaScript Features
- **Mobile Navigation**: Hamburger menu with smooth transitions
- **Smooth Scrolling**: Internal anchor navigation
- **Form Validation**: Client-side validation with error messaging
- **Interactive Elements**: FAQ accordions, testimonial carousels
- **Performance**: Lazy loading, intersection observers

### Content Strategy
- **9 Core Seminars**: Each with unique branding and detailed pages
- **Individual Consultation**: Separate service offering
- **toiee Lab Partnership**: Prominent brand association throughout
- **Japanese Language**: Native content with proper typography

### SEO Implementation
- Semantic HTML structure (header, nav, main, section, article, footer)
- Meta tags for description, keywords, og:image
- Alt attributes for all images
- Proper heading hierarchy (H1-H6)
- Structured data implementation

## Important Instructions

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.