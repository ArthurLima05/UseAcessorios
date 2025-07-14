import React from 'react';
import { GuidesSection } from '../components/GuidesSection';
import { Guide } from '../types';

interface GuidesPageProps {
  onPurchaseGuide: (guide: Guide) => void;
}

export const GuidesPage: React.FC<GuidesPageProps> = ({ onPurchaseGuide }) => {
  return <GuidesSection onPurchaseGuide={onPurchaseGuide} />;
};