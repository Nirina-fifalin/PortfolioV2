import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface ContactContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactContext = createContext<ContactContextValue | undefined>(undefined);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<ContactContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen],
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact(): ContactContextValue {
  const ctx = useContext(ContactContext);
  if (!ctx) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  return ctx;
}