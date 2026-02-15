# 🥋 Hunter Fight Predictor

A web application that simulates battles between Hunters using rule-based combat analysis. Built for the Hunter Association to reduce uncertainty and improve battle preparation.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

The Hunter Fight Predictor System allows users to compare two fighters based on their abilities and determine who would most likely win, with clear explanations of the reasoning behind each result. The system is logical, transparent, and fair—behaving like a rule-based combat simulator, not a random game.

## ✨ Features

- **Interactive Fighter Cards** - Adjust all 7 stats using intuitive sliders (0-100 range)
- **Nen Type System** - 6 different Nen types with strategic advantages
- **Weighted Combat Score** - Fair calculation based on stat importance
- **Type Advantages** - Rock-paper-scissors style Nen matchups with 10% bonus/penalty
- **Visual Results Display** - Clear breakdown of scores and winner
- **Detailed Explanations** - Step-by-step calculation transparency
- **100% Deterministic** - Same inputs always produce the same results (no RNG)
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

## 📊 Combat System

### Stat Weights

The combat score is calculated using the following weighted formula:

| Stat | Weight | Description |
|------|--------|-------------|
| Strength | 20% | Physical power and attack damage |
| Speed | 20% | Reaction time and movement speed |
| Durability | 15% | Defense and damage resistance |
| Aura Capacity | 15% | Total aura reserves |
| Intelligence | 10% | Strategic thinking and adaptability |
| Aura Control | 10% | Precision in Nen usage |
| Experience | 10% | Combat knowledge and instinct |

### Nen Type Advantages

```
Enhancer → beats Transmuter
Transmuter → beats Conjurer
Conjurer → beats Manipulator
Manipulator → beats Emitter
Emitter → beats Enhancer
Specialist → no inherent advantage
```

- **Advantage**: +10% to final score (1.1x multiplier)
- **Disadvantage**: -10% to final score (0.9x multiplier)

## 🚀 Getting Started

### Prerequisites

- Node.js 14.0 or higher
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/hunter-fight-predictor.git
cd hunter-fight-predictor
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: JavaScript (ES6+)

## 📁 Project Structure

```
hunter-fight-predictor/
├── src/
│   └── app/
│       ├── layout.js          # Root layout with metadata
│       ├── page.js            # Main fight predictor component
│       └── globals.css        # Global styles with Tailwind
├── public/                    # Static assets
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # This file
```

## 💻 Usage

1. **Configure Fighter 1**
   - Enter the fighter's name
   - Select their Nen type
   - Adjust all 7 stats using the sliders

2. **Configure Fighter 2**
   - Repeat the same process for the second fighter

3. **Simulate the Fight**
   - Click the "Simulate Fight" button
   - View the detailed results

4. **Analyze Results**
   - Base scores for each fighter
   - Nen type multipliers applied
   - Final combat scores
   - Winner declaration with confidence level
   - Complete calculation breakdown

## 🎮 Example Fighters

### Gon Freecss
```javascript
{
  id: 1,
  name: "Gon",
  nenType: "Enhancer",
  baseStats: {
    strength: 85,
    speed: 90,
    durability: 80,
    intelligence: 65,
    auraCapacity: 88,
    auraControl: 70,
    experience: 75
  }
}
```

### Killua Zoldyck
```javascript
{
  id: 2,
  name: "Killua",
  nenType: "Transmuter",
  baseStats: {
    strength: 80,
    speed: 95,
    durability: 75,
    intelligence: 90,
    auraCapacity: 85,
    auraControl: 88,
    experience: 78
  }
}
```

## 🔧 Configuration

### Customizing Stat Weights

Edit the `calculateCombatScore` function in `src/app/page.js`:

```javascript
const weights = {
  strength: 0.20,
  speed: 0.20,
  durability: 0.15,
  intelligence: 0.10,
  auraCapacity: 0.15,
  auraControl: 0.10,
  experience: 0.10
};
```

### Modifying Nen Advantages

Edit the `getNenAdvantage` function in `src/app/page.js`:

```javascript
const advantages = {
  'Enhancer': ['Transmuter'],
  'Transmuter': ['Conjurer'],
  // Add or modify relationships here
};
```

## 📈 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```



## 📝 Data Format

Each fighter follows this exact structure:

```javascript
{
  id: number,              // Unique identifier
  name: string,            // Fighter name
  nenType: string,         // One of: Enhancer, Transmuter, Emitter, Conjurer, Manipulator, Specialist
  baseStats: {
    strength: number,      // 0-100
    speed: number,         // 0-100
    durability: number,    // 0-100
    intelligence: number,  // 0-100
    auraCapacity: number,  // 0-100
    auraControl: number,   // 0-100
    experience: number     // 0-100
  }
}
```

## 🎯 Challenge Compliance

This project fully complies with the Hunter Association Fight Predictor System requirements:

✅ Accepts full stats for two fighters  
✅ Calculates weighted combat scores  
✅ Applies Nen type advantages  
✅ Predicts the winner  
✅ Explains calculations step by step  
✅ Rule-based (no randomness)  
✅ Logical, transparent, and fair  

