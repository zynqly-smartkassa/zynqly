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
    <Button size="lg" className={`text-sm lg:w-auto ${classNames}`}
      onClick={() => {
        setFilterType("all");
        setFilterSettlement("all");
        setFilterStatus("all");
        setSearch("");
      }}>
      <RotateCcw></RotateCcw>
      <span>
        Reset Filters
      </span>
    </Button>
  )
}

export default ResetFiltersButton
