# CASAMANDUVA - Full Stack Interior Design Website

Premium interior design website with React frontend (SEO optimized) and Spring Boot backend.

## 🚀 Features

### Frontend (React + Vite)
- **SEO Optimized** for Google Ads & Meta Ads
  - Dynamic meta tags with React Helmet
  - Structured data (JSON-LD) for rich snippets
  - OpenGraph & Twitter Card meta tags
  - Semantic HTML5 structure
- **Visitor Notifications** - Welcome banner + browser notifications
- **Cost Estimator** - Interactive 1BHK, 2BHK, 3BHK calculator
- **Enquiry Forms** - Multiple forms saving to database
- **WhatsApp Integration** - Floating button with quick actions
- **Responsive Design** - Mobile-first luxury design
- **Animations** - Framer Motion scroll animations

### Backend (Spring Boot)
- **RESTful APIs** for all frontend operations
- **Database Integration** - JPA/Hibernate with MySQL support
- **Enquiry Management** - Store and manage customer enquiries
- **Visitor Tracking** - Track website visitors with analytics
- **BHK Estimation** - Dynamic pricing calculations
- **Email Notifications** - Send alerts for new enquiries
- **CORS Configured** - Ready for production deployment

## 📁 Project Structure

```
casamanduva-fullstack/
├── frontend/                  # React application
│   ├── public/
│   │   └── logo.jpg
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   ├── NotificationBanner.jsx
│   │   │   ├── SEO.jsx
│   │   │   ├── AnimatedSection.jsx
│   │   │   └── EnquiryForm.jsx
│   │   ├── pages/             # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Portfolio.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Estimator.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js         # API service functions
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html             # SEO-optimized HTML
│   ├── package.json
│   └── vite.config.js
│
└── backend/                   # Spring Boot application
    ├── src/main/java/com/casamanduva/
    │   ├── CasamanduvaApplication.java
    │   ├── config/
    │   │   ├── CorsConfig.java
    │   │   └── GlobalExceptionHandler.java
    │   ├── controller/
    │   │   ├── EnquiryController.java
    │   │   ├── VisitorController.java
    │   │   ├── EstimationController.java
    │   │   └── ContactController.java
    │   ├── service/
    │   │   ├── EnquiryService.java
    │   │   ├── VisitorService.java
    │   │   ├── EstimationService.java
    │   │   └── NotificationService.java
    │   ├── repository/
    │   │   ├── EnquiryRepository.java
    │   │   ├── VisitorRepository.java
    │   │   ├── EstimateEnquiryRepository.java
    │   │   └── NewsletterRepository.java
    │   ├── model/
    │   │   ├── Enquiry.java
    │   │   ├── Visitor.java
    │   │   ├── EstimateEnquiry.java
    │   │   └── NewsletterSubscriber.java
    │   └── dto/
    │       ├── EnquiryDTO.java
    │       ├── VisitorDTO.java
    │       ├── EstimateRequestDTO.java
    │       ├── EstimateResponseDTO.java
    │       ├── EstimateEnquiryDTO.java
    │       └── ApiResponse.java
    ├── src/main/resources/
    │   └── application.properties
    └── pom.xml
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ (for frontend)
- Java 17+ (for backend)
- MySQL 8.0+ (for production) or H2 (for development)
- Maven 3.8+

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Configure database (for production):**
   Edit `src/main/resources/application.properties`:
   ```properties
   # Uncomment and configure MySQL
   spring.datasource.url=jdbc:mysql://localhost:3306/casamanduva
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Configure email notifications (optional):**
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   app.notification.enabled=true
   ```

4. **Run the backend:**
   ```bash
   mvn spring-boot:run
   ```
   Backend will start at `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL (if needed):**
   Create `.env` file:
   ```
   VITE_API_URL=http://localhost:8080/api
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Frontend will start at `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📊 API Endpoints

### Enquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/enquiries` | Create new enquiry |
| GET | `/api/enquiries` | Get all enquiries |
| GET | `/api/enquiries/{id}` | Get enquiry by ID |
| PATCH | `/api/enquiries/{id}/status` | Update status |

### Visitors
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/visitors/track` | Track visitor (returns notification) |
| GET | `/api/visitors/stats` | Get visitor statistics |

### Estimations
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/estimations/bhk` | Get BHK configurations |
| POST | `/api/estimations/calculate` | Calculate estimate |
| POST | `/api/estimations/enquiry` | Save estimate enquiry |
| GET | `/api/estimations/quick/{bhkType}` | Quick estimate |

### Contact & Newsletter
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| GET | `/api/health` | Health check |

## 🎯 SEO Configuration

### Google Ads Setup
1. Add your Google Ads conversion tag in `index.html`
2. Replace `AW-XXXXXXXXX` with your actual tag ID
3. Configure conversion events in `EnquiryForm.jsx`

### Meta (Facebook) Pixel Setup
1. Add your Pixel ID in `index.html`
2. Replace `YOUR_PIXEL_ID` with actual ID
3. Track events are configured in form submissions

### Structured Data
The website includes:
- LocalBusiness schema
- Service schema with pricing
- BreadcrumbList schema
- FAQ schema on contact page

## 📱 BHK Estimation Pricing

| Type | Base Area | Essential | Premium | Luxury |
|------|-----------|-----------|---------|--------|
| 1BHK | 550 sq.ft | ₹3.5L+ | ₹5L+ | ₹7L+ |
| 2BHK | 950 sq.ft | ₹5.5L+ | ₹8L+ | ₹12L+ |
| 3BHK | 1400 sq.ft | ₹8.5L+ | ₹12L+ | ₹18L+ |

## 🚀 Production Deployment

### Backend (AWS EC2 / Docker)
```bash
# Build JAR
mvn clean package -DskipTests

# Run with production profile
java -jar target/casamanduva-backend-1.0.0.jar --spring.profiles.active=prod
```

### Frontend (Nginx / S3 + CloudFront)
```bash
# Build
npm run build

# Output is in dist/ folder
# Deploy to your web server or S3
```

### Environment Variables (Production)
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:mysql://your-rds-endpoint:3306/casamanduva
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=your-password
CORS_ALLOWED_ORIGINS=https://casamanduva.com

# Frontend
VITE_API_URL=https://api.casamanduva.com/api
```

## 📞 Contact

- **Phone:** +91 77300 51329
- **Email:** info@casamanduva.com
- **Location:** Hyderabad, India

## 📄 License

© 2025 CASAMANDUVA. All rights reserved.
