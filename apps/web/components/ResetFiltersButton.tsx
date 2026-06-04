import React from 'react'
import { Button } from './ui/button';
import { RotateCcw } from 'lucide-react';

interface ResetFiltersButtonArgs {
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  setFilterSettlement: React.Dispatch<React.SetStateAction<string>>,
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  classNames: string
}

// This will reset all the active filters

const ResetFiltersButton = ({ setFilterType, setFilterSettlement,
  setFilterStatus, setSearch, classNames }: ResetFiltersButtonArgs) => {
  return (
    <Button size="sm" variant="outline" className={`h-9 text-sm gap-1.5 ${classNames}`}
    data-testid="ride-history-reset-button"
      onClick={() => {
        setFilterType("all");
        setFilterSettlement("all");
        setFilterStatus("all");
        setSearch("");
      }}>
      <RotateCcw className="w-3.5 h-3.5" />
      <span>Zurücksetzen</span>
    </Button>
  )
}

export default ResetFiltersButton
