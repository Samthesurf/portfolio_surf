# Engineering Hub 🎓

> A comprehensive, AI-powered educational platform designed for engineering students, featuring intelligent quiz generation, real-time course management, and gamified learning experiences.

[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?logo=flutter&logoColor=white)](https://flutter.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://cloudflare.com/)
[![Google AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🌟 Project Overview

**Engineering Hub** is a cross-platform mobile and web application that transforms how engineering students access course materials, practice for exams, and track their academic progress. Built with Clean Architecture principles, it leverages cutting-edge AI to provide personalized learning experiences.

### 🎯 Key Highlights

| Metric | Value |
|--------|-------|
| **Platforms** | Android, Web (iOS-ready) |
| **Architecture** | Clean Architecture with BLoC/GetX |
| **AI Integration** | Google Gemini |
| **Real-time DB** | Firebase Firestore |
| **Edge CDN** | Cloudflare R2 + Workers |

---

## ✨ Core Features

### 🤖 AI-Powered Learning (TuteBot)

The flagship feature powered by **Google Gemini AI**:

- **Dynamic Quiz Generation** – Automatically generates MCQs, Theory questions, and Fill-in-the-Gap exercises based on course materials
- **RAG-lite Pipeline** – Uses specific course context to produce highly relevant educational content
- **Intelligent Answer Evaluation** – Evaluates long-form answers with detailed AI feedback, strengths analysis, and improvement suggestions
- **Image-Based Evaluation** – Students can submit handwritten solutions via camera, which are analyzed using Gemini's vision capabilities
- **LaTeX Rendering** – Full support for mathematical and scientific notation parsing

### 📚 Course & Content Management

- **Hierarchical Organization** – Courses organized by Department (EEE, MCT, PET, etc.) and Level (100-500)
- **Multi-level Caching** – Memory + Hive + Disk caching for uninterrupted offline study
- **Professional PDF Viewer** – In-app viewing optimized for textbooks and notes on both mobile and web

### 📖 Edge-Powered Document Delivery

Custom infrastructure for blazing-fast document access:

- **Cloudflare R2 Storage** – S3-compatible object storage with zero egress fees
- **Custom Edge Worker** – Cloudflare Worker proxy with range-request support for large PDFs
- **Global CDN Caching** – Assets cached at edge locations worldwide for sub-100ms latency

### 📅 Smart Schedule System

- **Departmental Timetables** – Centralized class schedules for all engineering departments
- **Home Screen Widgets** – Native Android widgets showing next class at-a-glance
- **Push Notifications** – Class reminders 30 minutes before each session
- **Streak Tracking Widget** – Gamified daily practice reminders to maintain learning streaks

### 🎮 Gamification & Engagement

- **Study Streaks** – Daily practice tracking with streak preservation mechanics
- **Intelligent Reminders** – 10 PM urgent and 11 PM countdown notifications to encourage daily practice
- **Confetti Celebrations** – Rewarding animations on quiz completion
- **Progress Tracking** – Visual analytics of study patterns and performance

### 🔐 Authentication & Security

- **Multi-Provider Auth** – Email/Password and Google Sign-In
- **Firebase App Check** – Play Integrity (Android) and DeviceCheck (iOS) for production security
- **Secure Account Management** – Profile completion wizard, email verification, and GDPR-compliant account deletion

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Flutter Application                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Presentation│  │   Domain    │  │         Data            │  │
│  │   (BLoC)    │◄──│ (Use Cases) │◄──│ (Repos & DataSources)   │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Firebase    │   │  Cloudflare   │   │   Google AI   │
│   Platform    │   │     Edge      │   │   (Gemini)    │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ • Auth        │   │ • R2 Storage  │   │ • Generative  │
│ • Firestore   │   │ • Workers     │   │ • Multimodal  │
│ • Cloud Func  │   │ • Global CDN  │   │ • Vision API  │
│ • Analytics   │   │               │   │               │
│ • Crashlytics │   │               │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
```

### Clean Architecture Layers

```
lib/
├── presentation/     # UI & State Management (BLoC/GetX)
│   ├── screens/      # Feature screens (Quiz, Study, Schedule, etc.)
│   ├── blocs/        # Business Logic Components
│   └── widgets/      # Reusable UI components
├── domain/           # Pure Business Logic
│   ├── entities/     # Core business objects
│   ├── repositories/ # Repository interfaces
│   └── usecases/     # Application-specific business rules
├── data/             # Data Providers
│   ├── models/       # Data transfer objects
│   ├── repositories/ # Repository implementations
│   └── datasources/  # Remote & local data sources
└── core/             # Shared Infrastructure
    ├── services/     # AI, Storage, Auth, Notifications
    ├── di/           # Dependency Injection (GetIt)
    └── router/       # Navigation configuration
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Flutter 3.x** | Cross-platform UI framework |
| **Dart** | Strongly-typed programming language |
| **flutter_bloc** | Predictable state management |
| **GetX** | Dependency injection & navigation |
| **Hive** | Fast, lightweight local storage |

### AI & Intelligence
| Technology | Purpose |
|------------|---------|
| **Google Gemini AI** | LLM for quiz generation & answer evaluation |
| **Firebase AI SDK** | Secure, managed AI backend integration |
| **Custom JSON Sanitization** | LaTeX-safe parsing pipeline |

### Backend & Infrastructure
| Technology | Purpose |
|------------|---------|
| **Firebase Auth** | User authentication & management |
| **Cloud Firestore** | Real-time NoSQL database |
| **Firebase Cloud Functions** | Serverless backend logic (Python/Node) |
| **Firebase Analytics** | User behavior tracking |
| **Firebase Crashlytics** | Real-time crash reporting |
| **Firebase Performance** | App performance monitoring |

### Edge Computing & Storage
| Technology | Purpose |
|------------|---------|
| **Cloudflare R2** | S3-compatible object storage |
| **Cloudflare Workers** | Edge proxy for document delivery |
| **Global CDN** | Low-latency worldwide access |

---

## 🔬 Technical Highlights

### 1. AI Reliability & LaTeX Sanitization Pipeline

To ensure Gemini produces parseable JSON with valid mathematical expressions:

```dart
// Multi-stage sanitization for AI responses
1. Markdown stripping → Removes ```json wrappers
2. LaTeX escaping → Double-escapes backslashes (\frac → \\frac)
3. Truncation detection → Graceful failover for incomplete responses
```

### 2. Optimized Document Delivery (R2 Cache Proxy)

Custom Cloudflare Worker for high-performance PDF delivery:

- **Range Request Support** – Essential for streaming large textbooks
- **Edge Caching** – 1-year cache with immutable directive
- **CORS Management** – Fine-grained origin control for secure in-browser viewing

### 3. Hybrid Upload Strategy

Platform-aware upload implementation:

- **Mobile** – Direct S3 Signature V4 signing for high-speed R2 uploads
- **Web** – Cloud Function-based pre-signed URL generation (browser CORS limitations)

### 4. Advanced Startup Diagnostics

Production-grade initialization with deferred loading:

- Critical path services initialized synchronously
- Non-critical services (Analytics, Crashlytics, Widgets) loaded post-frame
- Debug overlay for development diagnostics

---

## 📱 App Screens

| Screen | Description |
|--------|-------------|
| **Home Dashboard** | Overview of courses, streak status, and quick actions |
| **Study Hub** | Browse courses by level/department, access textbooks & notes |
| **Quiz Mode** | AI-generated MCQ, Theory, and Fill-the-Gap questions |
| **Schedule** | Departmental timetables with notifications |
| **Profile** | User settings, streak stats, and account management |
| **Onboarding** | Guided setup for new users |

---

## 🚀 Deployment

| Platform | Hosting |
|----------|---------|
| **Web** | Vercel / Firebase Hosting |
| **Android** | Google Play Store (APK available) |
| **Edge Worker** | Cloudflare Workers |

---

## 📊 Project Metrics

- **Version**: 1.0.3+48
- **SDK**: Flutter 3.x / Dart SDK ^3.7.0
- **Dependencies**: 50+ packages
- **Codebase**: 200+ files across Dart, TypeScript, and Python

---

## 🗺️ Roadmap

- [ ] Social study groups & collaboration
- [ ] Real-time document annotation
- [ ] Advanced RAG implementation for department-wide knowledge search
- [ ] iOS home screen widget parity
- [ ] Offline-first quiz mode with sync

---

## 👨‍💻 Developer

**Samuel Surf (Nasurf)**

*Built with ❤️ for the next generation of Engineers.*

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
