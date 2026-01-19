import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { GridExitTransition } from "@/components/animations/GridTransition";

interface NavigationContextType {
  navigateWithTransition: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useGridNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useGridNavigation must be used within NavigationProvider");
  }
  return context;
};

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);

  const navigateWithTransition = useCallback((to: string) => {
    setIsTransitioning(true);
    setPendingRoute(to);
  }, []);

  const handleTransitionComplete = useCallback(() => {
    if (pendingRoute) {
      navigate(pendingRoute);
      setIsTransitioning(false);
      setPendingRoute(null);
    }
  }, [navigate, pendingRoute]);

  return (
    <NavigationContext.Provider value={{ navigateWithTransition }}>
      {children}
      <GridExitTransition 
        isActive={isTransitioning} 
        onComplete={handleTransitionComplete} 
      />
    </NavigationContext.Provider>
  );
};
