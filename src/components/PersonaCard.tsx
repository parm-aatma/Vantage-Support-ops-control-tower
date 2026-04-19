"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Briefcase, ChevronRight } from 'lucide-react';
import { Persona } from '@/lib/personas';

interface PersonaCardProps {
  persona: Persona;
  onSelect: (persona: Persona) => void;
}

export const PersonaCard = ({ persona, onSelect }: PersonaCardProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(persona)}
      className="p-card"
    >
      {/* Icon Area */}
      <div style={{ position: 'relative', marginBottom: '24px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--bg-primary)', 
          border: '1px solid var(--bg-border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.1)'
        }}>
          <User size={40} style={{ color: 'var(--text-gray)' }} />
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-4px', 
          right: '-4px', 
          padding: '6px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--accent-sentry)', 
          boxShadow: '0 0 10px rgba(106, 95, 193, 0.5)'
        }}>
          {persona.data.role === 'Manager' || persona.data.role === 'VP of Support' ? (
            <ShieldCheck size={12} color="white" />
          ) : (
            <Briefcase size={12} color="white" />
          )}
        </div>
      </div>

      {/* Text Context */}
      <div style={{ flex: 1 }}>
        <h3 className="lexend-font">{persona.name}</h3>
        <p>{persona.title}</p>
      </div>

      {/* Action Prompt */}
      <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-sentry)', fontWeight: 'bold', fontSize: '10px', letterSpacing: '0.25px', textTransform: 'uppercase' }}>
        <span>Select Persona</span>
        <ChevronRight size={12} />
      </div>
    </motion.button>
  );
};
