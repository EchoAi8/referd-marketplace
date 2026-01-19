import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { GridOverlay } from "@/components/animations/GridTransition";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

const NotFound = () => {
  const location = useLocation();
  const { navigateWithTransition } = useGridNavigation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <GridOverlay />
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-heading font-bold text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
          <button 
            onClick={() => navigateWithTransition("/")}
            className="btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
