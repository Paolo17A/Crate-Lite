"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import {
  countActiveFilters,
  emptyFilterSelection,
} from "@/lib/search";
import type { FilterSelection } from "@/types/search";

type Options = {
  applied: FilterSelection;
  onApply: (next: FilterSelection) => void;
  onClose?: () => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function useFilterDraft({
  applied,
  onApply,
  onClose,
  open,
  setOpen,
}: Options) {
  const [draft, setDraft] = useState<FilterSelection>(applied);

  const appliedCount = countActiveFilters(applied);
  const draftCount = countActiveFilters(draft);

  function openPanel() {
    if (!open) setDraft(applied);
    setOpen((value) => !value);
  }

  function handleApply() {
    onApply(draft);
    setOpen(false);
    onClose?.();
  }

  function handleCancel() {
    setDraft(applied);
    setOpen(false);
    onClose?.();
  }

  function handleClearDraft() {
    setDraft(emptyFilterSelection());
  }

  return {
    draft,
    setDraft,
    appliedCount,
    draftCount,
    openPanel,
    handleApply,
    handleCancel,
    handleClearDraft,
  };
}
