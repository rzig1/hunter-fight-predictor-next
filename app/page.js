'use client'
import React, { useState } from 'react';
import { Swords, Trophy, AlertCircle } from 'lucide-react';

const StatInput = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-sm">
      <label className="font-medium text-gray-700">{label}</label>
      <span className="text-gray-500">{value}</span>
    </div>
    <input
      type="range"
      min="0"
      max="100"
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
    />
  </div>
);

const FighterCard = ({ fighter, fighterNum, color, updateFighter }) => (
  <div className={`bg-white rounded-lg shadow-lg p-6 border-t-4 ${color}`}>
    <h2 className="text-2xl font-bold mb-4 text-gray-800">Fighter {fighterNum}</h2>
    
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={fighter.name}
          onChange={(e) => updateFighter(fighterNum, 'name', e.target.value)}
          className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nen Type</label>
        <select
          value={fighter.nenType}
          onChange={(e) => updateFighter(fighterNum, 'nenType', e.target.value)}
          className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['Enhancer', 'Transmuter', 'Emitter', 'Conjurer', 'Manipulator', 'Specialist'].map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="pt-2">
        <StatInput 
          label="Strength" 
          value={fighter.baseStats.strength}
          onChange={(e) => updateFighter(fighterNum, 'strength', e.target.value)}
        />
        <StatInput 
          label="Speed" 
          value={fighter.baseStats.speed}
          onChange={(e) => updateFighter(fighterNum, 'speed', e.target.value)}
        />
        <StatInput 
          label="Durability" 
          value={fighter.baseStats.durability}
          onChange={(e) => updateFighter(fighterNum, 'durability', e.target.value)}
        />
        <StatInput 
          label="Intelligence" 
          value={fighter.baseStats.intelligence}
          onChange={(e) => updateFighter(fighterNum, 'intelligence', e.target.value)}
        />
        <StatInput 
          label="Aura Capacity" 
          value={fighter.baseStats.auraCapacity}
          onChange={(e) => updateFighter(fighterNum, 'auraCapacity', e.target.value)}
        />
        <StatInput 
          label="Aura Control" 
          value={fighter.baseStats.auraControl}
          onChange={(e) => updateFighter(fighterNum, 'auraControl', e.target.value)}
        />
        <StatInput 
          label="Experience" 
          value={fighter.baseStats.experience}
          onChange={(e) => updateFighter(fighterNum, 'experience', e.target.value)}
        />
      </div>
    </div>
  </div>
);

const FightPredictor = () => {
  const [fighter1, setFighter1] = useState({
    id: 1,
    name: 'Gon',
    nenType: 'Enhancer',
    baseStats: {
      strength: 85,
      speed: 90,
      durability: 80,
      intelligence: 65,
      auraCapacity: 88,
      auraControl: 70,
      experience: 75
    }
  });

  const [fighter2, setFighter2] = useState({
    id: 2,
    name: 'Killua',
    nenType: 'Transmuter',
    baseStats: {
      strength: 80,
      speed: 95,
      durability: 75,
      intelligence: 90,
      auraCapacity: 85,
      auraControl: 88,
      experience: 78
    }
  });

  const [result, setResult] = useState(null);

  // Nen type advantage system (rock-paper-scissors style)
  const getNenAdvantage = (type1, type2) => {
    const advantages = {
      'Enhancer': ['Transmuter'],
      'Transmuter': ['Conjurer'],
      'Conjurer': ['Manipulator'],
      'Manipulator': ['Emitter'],
      'Emitter': ['Enhancer'],
      'Specialist': [] // Specialist has no inherent advantage
    };

    if (advantages[type1]?.includes(type2)) return 1.1; // 10% bonus
    if (advantages[type2]?.includes(type1)) return 0.9; // 10% penalty
    return 1.0; // No advantage
  };

  const calculateCombatScore = (fighter) => {
    // Weighted calculation based on combat importance
    const weights = {
      strength: 0.20,
      speed: 0.20,
      durability: 0.15,
      intelligence: 0.10,
      auraCapacity: 0.15,
      auraControl: 0.10,
      experience: 0.10
    };

    const stats = fighter.baseStats;

    const baseScore = 
      stats.strength * weights.strength +
      stats.speed * weights.speed +
      stats.durability * weights.durability +
      stats.intelligence * weights.intelligence +
      stats.auraCapacity * weights.auraCapacity +
      stats.auraControl * weights.auraControl +
      stats.experience * weights.experience;

    return baseScore;
  };

  const simulateFight = () => {
    // Step 1: Calculate base combat scores
    const score1 = calculateCombatScore(fighter1);
    const score2 = calculateCombatScore(fighter2);

    // Step 2: Apply Nen type advantages
    const nenMultiplier1 = getNenAdvantage(fighter1.nenType, fighter2.nenType);
    const nenMultiplier2 = getNenAdvantage(fighter2.nenType, fighter1.nenType);

    const finalScore1 = score1 * nenMultiplier1;
    const finalScore2 = score2 * nenMultiplier2;

    // Step 3: Determine winner
    const winner = finalScore1 > finalScore2 ? fighter1.name : 
                   finalScore2 > finalScore1 ? fighter2.name : 'Draw';

    const margin = Math.abs(finalScore1 - finalScore2);
    const confidence = margin > 10 ? 'High' : margin > 5 ? 'Medium' : 'Low';

    setResult({
      fighter1: {
        baseScore: score1.toFixed(2),
        nenMultiplier: nenMultiplier1,
        finalScore: finalScore1.toFixed(2)
      },
      fighter2: {
        baseScore: score2.toFixed(2),
        nenMultiplier: nenMultiplier2,
        finalScore: finalScore2.toFixed(2)
      },
      winner,
      confidence,
      margin: margin.toFixed(2)
    });
  };

  const updateFighter = (fighterNum, field, value) => {
    const setter = fighterNum === 1 ? setFighter1 : setFighter2;
    const fighter = fighterNum === 1 ? fighter1 : fighter2;
    
    // If updating a stat, update inside baseStats object
    const statFields = ['strength', 'speed', 'durability', 'intelligence', 'auraCapacity', 'auraControl', 'experience'];
    
    if (statFields.includes(field)) {
      setter({
        ...fighter,
        baseStats: {
          ...fighter.baseStats,
          [field]: Number(value)
        }
      });
    } else {
      // For name and nenType, update at root level
      setter({
        ...fighter,
        [field]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Swords className="w-10 h-10" />
            Hunter Fight Predictor
            <Swords className="w-10 h-10" />
          </h1>
          <p className="text-gray-600">Simulate battles with rule-based combat analysis</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <FighterCard fighter={fighter1} fighterNum={1} color="border-blue-500" updateFighter={updateFighter} />
          <FighterCard fighter={fighter2} fighterNum={2} color="border-red-500" updateFighter={updateFighter} />
        </div>

        <div className="text-center mb-8">
          <button
            onClick={simulateFight}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Simulate Fight
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-gray-800">Battle Results</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">{fighter1.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Nen Type:</span> {fighter1.nenType}</p>
                  <p><span className="font-semibold">Base Score:</span> {result.fighter1.baseScore}</p>
                  <p><span className="font-semibold">Nen Multiplier:</span> {result.fighter1.nenMultiplier}x</p>
                  <p className="text-lg font-bold text-blue-900">Final Score: {result.fighter1.finalScore}</p>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4">{fighter2.name}</h3>
                <div className="space-y-2 text-gray-700">
                  <p><span className="font-semibold">Nen Type:</span> {fighter2.nenType}</p>
                  <p><span className="font-semibold">Base Score:</span> {result.fighter2.baseScore}</p>
                  <p><span className="font-semibold">Nen Multiplier:</span> {result.fighter2.nenMultiplier}x</p>
                  <p className="text-lg font-bold text-red-900">Final Score: {result.fighter2.finalScore}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-6 border-2 border-yellow-300">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 mb-2">
                  Winner: <span className="text-yellow-600">{result.winner}</span>
                </p>
                <p className="text-gray-600">
                  Victory Margin: {result.margin} points | Confidence: {result.confidence}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold mb-2">Calculation Breakdown:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Base scores calculated using weighted stats (Strength 20%, Speed 20%, Durability 15%, Intelligence 10%, Aura Capacity 15%, Aura Control 10%, Experience 10%)</li>
                    <li>Nen type advantages applied (10% bonus/penalty based on type matchup)</li>
                    <li>Final scores compared to determine the winner</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Nen Type Advantages</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>• Enhancer → beats Transmuter</p>
            <p>• Transmuter → beats Conjurer</p>
            <p>• Conjurer → beats Manipulator</p>
            <p>• Manipulator → beats Emitter</p>
            <p>• Emitter → beats Enhancer</p>
            <p>• Specialist → no inherent advantage</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FightPredictor;