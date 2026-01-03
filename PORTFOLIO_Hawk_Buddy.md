# Hawk Buddy 🦅

> An AI-powered productivity coach that aligns your phone usage with your personal goals, featuring intelligent app monitoring, conversational goal discovery, and real-time feedback.

[![Flutter](https://img.shields.io/badge/Flutter-3.38+-02569B?logo=flutter&logoColor=white)](https://flutter.dev/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://cloudflare.com/)
[![Google AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

---

## 🌟 Project Overview

**Hawk Buddy** is a cross-platform mobile application designed for professionals and remote workers who struggle with digital distractions. It uses AI to understand your goals, monitor your app usage patterns, and provide real-time encouragement when you stray off track—acting as your personal accountability partner.

### 🎯 Key Highlights

| Metric | Value |
|--------|-------|
| **Target Audience** | Young professionals & remote workers |
| **Problem Solved** | Digital distraction & phone addiction |
| **AI Integration** | Google Gemini (Flash + Pro models) |
| **Real-time DB** | Cloudflare D1 (SQLite at the edge) |
| **Backend** | FastAPI on Oracle Cloud |
| **Vector Search** | Cloudflare Vectorize |

---

## ✨ Core Features

### 🤖 AI Coaching Chat (Progress Check-ins)

The flagship feature powered by **Google Gemini AI**:

- **Daily Progress Conversations** – Natural language check-ins that feel like talking to a supportive mentor
- **Goal-Aware Context** – AI understands your specific goals and tailors responses accordingly
- **Progress Scoring** – Automatic percentage-based goal progress evaluation (0-100%)
- **Streak Tracking** – Gamified daily check-in streaks to build accountability habits
- **Notification Context** – Chat sessions incorporate context from usage notifications for seamless follow-up

### 🎯 Conversational Goal Discovery

A unique onboarding experience that uses AI to uncover your true goals:

- **Interactive Questionnaire** – Smart quiz to understand your challenges (doom scrolling, late nights, etc.)
- **AI-Powered Profiling** – Gemini analyzes responses to build a comprehensive user profile
- **Notification Profile Generation** – Creates personalized notification preferences based on your personality
- **Habit & Routine Builder** – Helps define morning routines, focus blocks, and healthy habits

### 📱 Intelligent App Monitoring

Background monitoring that categorizes your app usage in real-time:

- **App Classification (AI)** – Gemini categorizes apps by their typical use cases
- **Goal Alignment Analysis** – Real-time analysis: "Aligned", "Neutral", or "Misaligned" with your goals
- **Contextual Notifications** – Smart nudges when you're using apps that don't support your goals
- **Cooldown Management** – Prevents notification fatigue with intelligent rate limiting
- **Usage History** – Track your app usage patterns over time

### 🔔 Smart Notification System

Intelligent, non-intrusive notifications that respect your focus:

- **Misalignment Alerts** – Gentle nudges when distracted from goals
- **Cooldown System** – Atomically managed notification cooldowns via D1 database
- **Break Encouragement** – Positive reinforcement for healthy app usage patterns
- **Notification Profiles** – AI-generated based on your goal discovery responses

### 📊 Cozy Dashboard

A warm, inviting dashboard designed to encourage rather than judge:

- **Focus Score Display** – Today's goal alignment percentage
- **Streak Widget** – Current check-in streak with visual celebration
- **Peak Time Analysis** – When you're most productive
- **Screen Time Overview** – Daily usage breakdown
- **Time Logged Metrics** – Track aligned vs. misaligned time

### 🔐 Authentication & Security

- **Multi-Provider Auth** – Email/Password and Google Sign-In via Firebase
- **Secure Token Storage** – Using `flutter_secure_storage` for sensitive data
- **Firebase Admin Verification** – Server-side token verification
- **GDPR-Compliant Deletion** – Full user data deletion across all services

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       Flutter Application                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ Presentation│  │    BLoC     │  │        Services         │  │
│  │  (Screens)  │◄─►│  (Cubits)   │◄─►│  (API, Auth, Notif)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   Firebase    │   │   FastAPI     │   │  Cloudflare   │
│   Platform    │   │   Backend     │   │     Edge      │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ • Auth        │   │ • Onboarding  │   │ • D1 Database │
│ • Analytics   │   │ • Monitor API │   │ • Vectorize   │
│               │   │ • Chat API    │   │ • Workers     │
│               │   │ • Gemini AI   │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │  Oracle Cloud │
                    │  (Docker)     │
                    ├───────────────┤
                    │ • Caddy HTTPS │
                    │ • Uvicorn     │
                    │ • sslip.io    │
                    └───────────────┘
```

### Application Layer Structure

```
lib/
├── screens/              # UI Screens
│   ├── onboarding/       # Splash, Quiz, Challenges, Routine Builder
│   ├── settings/         # Notification preferences
│   ├── auth_screen.dart
│   ├── dashboard_screen.dart
│   ├── cozy_dashboard_screen.dart
│   ├── goal_discovery_screen.dart
│   ├── app_selection_screen.dart
│   ├── progress_chat_screen.dart
│   └── settings_screen.dart
├── bloc/                 # State Management (Cubits)
│   ├── auth_cubit.dart
│   ├── chat_cubit.dart
│   ├── progress_score_cubit.dart
│   ├── progress_streak_cubit.dart
│   ├── goal_discovery_cubit.dart
│   ├── theme_cubit.dart
│   └── onboarding_preferences_cubit.dart
├── services/             # Core Services
│   ├── api_service.dart
│   ├── auth_service.dart
│   ├── notification_service.dart
│   ├── background_service.dart
│   ├── usage_tracking_service.dart
│   └── restoration_service.dart
├── models/               # Data Models
│   ├── goal.dart
│   ├── chat.dart
│   ├── usage_feedback.dart
│   ├── app_selection.dart
│   └── onboarding_data.dart
├── core/                 # Shared Infrastructure
│   ├── theme.dart
│   ├── cozy_theme.dart
│   ├── routes.dart
│   └── constants.dart
└── widgets/              # Reusable Components
```

### Backend Structure

```
backend/
├── app/
│   ├── routers/          # API Endpoints
│   │   ├── auth.py       # Authentication
│   │   ├── onboarding.py # Goal discovery flow
│   │   ├── monitor.py    # Usage monitoring
│   │   ├── chat.py       # AI conversations
│   │   └── apps.py       # App management
│   ├── services/         # Business Logic
│   │   ├── gemini_service.py      # AI integration
│   │   ├── cloudflare_service.py  # Vectorize integration
│   │   ├── usage_store_service.py # D1 persistence
│   │   └── auth_service.py        # Firebase verification
│   ├── models/           # Pydantic models
│   └── main.py           # FastAPI entry point
├── cloudflare/
│   └── usage-store-worker/  # D1 Worker
│       ├── src/index.ts
│       └── migrations/      # SQL migrations
└── Dockerfile
```

---

## 🛠️ Technology Stack

### Frontend (Mobile App)
| Technology | Purpose |
|------------|---------|
| **Flutter 3.38+** | Cross-platform UI framework |
| **Dart SDK ^3.10** | Strongly-typed programming language |
| **flutter_bloc** | Predictable state management (Cubits) |
| **Dio** | HTTP client for REST API communication |
| **Hive/SharedPrefs** | Fast, lightweight local storage |
| **flutter_secure_storage** | Encrypted credential storage |

### AI & Intelligence
| Technology | Purpose |
|------------|---------|
| **Google Gemini AI** | LLM for goal discovery, chat, and app classification |
| **Cloudflare Vectorize** | Vector embeddings for semantic goal understanding |
| **Audio Transcription** | Voice input processing via Gemini multimodal |

### Backend (API Service)
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance Python web framework |
| **Uvicorn** | ASGI server |
| **google-genai** | Official Google AI Python SDK |
| **firebase-admin** | Server-side Firebase token verification |
| **Pydantic v2** | Data validation and serialization |
| **httpx** | Async HTTP client |

### Persistence & Edge Computing
| Technology | Purpose |
|------------|---------|
| **Cloudflare D1** | SQLite at the edge for global low-latency persistence |
| **Cloudflare Workers** | Edge compute for usage store API |
| **In-Memory Cache** | Write-through caching for performance |

### Infrastructure & DevOps
| Technology | Purpose |
|------------|---------|
| **Oracle Cloud Free Tier** | Backend hosting (Always Free VM) |
| **Docker** | Container runtime |
| **Caddy** | Automatic HTTPS reverse proxy |
| **sslip.io** | DNS resolution for dynamic IPs |

---

## 🔬 Technical Highlights

### 1. Cloudflare D1 Persistence Layer

All user data is persisted globally with minimal latency:

```sql
-- Key tables in D1
users           -- User profiles & onboarding status
goals           -- User goals with embeddings reference
app_selections  -- Categorized app list per user
usage_feedback  -- Historical app usage events
progress_scores -- Daily progress percentages & reasons
cooldowns       -- Notification rate limiting
app_use_cases   -- Cached AI app classifications
onboarding_preferences -- Quiz responses & habits
```

### 2. AI-Powered Goal Discovery Pipeline

Multi-turn conversation that builds a rich user profile:

```python
# GeminiService.goal_discovery_step()
1. User answers quiz questions (challenges, habits, focus)
2. AI analyzes responses and asks follow-up questions
3. Profile is incrementally built with each turn
4. Final profile includes notification preferences
5. Vectorize stores goal embeddings for semantic search
```

### 3. Real-Time App Alignment Analysis

```dart
// Usage monitoring flow
1. Background service detects foreground app change
2. API checks if app classification is cached in D1
3. If not cached: Gemini classifies app → Store in D1
4. Gemini analyzes: App + User Goals → Alignment status
5. If misaligned: Check cooldown → Send notification
6. Store usage feedback event in D1
```

### 4. Atomic Notification Cooldowns

The D1 Worker provides atomic cooldown checks:

```typescript
// Worker handles race conditions
POST /v1/cooldowns/check-and-set
- Atomically checks if cooldown has elapsed
- Sets new timestamp in same transaction
- Returns { should_notify: true/false }
```

### 5. State Restoration Service

Seamless app state restoration after crashes:

```dart
// RestorationService
- Saves last route and arguments
- Detects improper shutdown
- Restores user to exact location on relaunch
```

---

## 📱 App Screens

| Screen | Description |
|--------|-------------|
| **Onboarding Splash** | Beautiful Lottie animation welcome screen |
| **Onboarding Quiz** | Interactive quiz to understand user challenges |
| **Goal Discovery** | AI-powered conversational goal definition |
| **App Selection** | Categorize installed apps by goal alignment |
| **Cozy Dashboard** | Warm, encouraging daily overview |
| **Progress Chat** | Daily check-in conversation with AI coach |
| **Usage History** | Timeline of app usage and alignment |
| **Settings** | Notification preferences, theme, account management |

---

## 🚀 Deployment

| Component | Hosting |
|-----------|---------|
| **Mobile App** | Android (APK available) |
| **Backend API** | Oracle Cloud Free Tier (Docker + Caddy) |
| **Edge Worker** | Cloudflare Workers |
| **Database** | Cloudflare D1 (globally distributed) |

---

## 📊 Project Metrics

- **Version**: 1.0.0+1
- **Flutter SDK**: ^3.38.1
- **Dart SDK**: ^3.10.1
- **Dependencies**: 25+ packages
- **Backend Services**: 5 API routers, 4 core services
- **D1 Tables**: 8+ persistent tables
- **Codebase**: 100+ files across Dart, Python, and TypeScript

---

## 🗺️ Roadmap

- [ ] Voice-first progress check-ins (Gemini Live Audio)
- [ ] iOS App Store release
- [ ] Home screen widgets for streak and focus score
- [ ] Weekly/monthly progress reports
- [ ] Social accountability features
- [ ] Offline-first mode with sync
- [ ] Advanced analytics dashboard

---

## 👨‍💻 Developer

**Samuel Surfboard**

*Built with ❤️ for everyone fighting digital distraction.*

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.
