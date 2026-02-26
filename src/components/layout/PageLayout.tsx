import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  /** Set to false to hide the grid overlay (e.g., for Index page with custom intro) */
  showGridOverlay?: boolean;
}

const PageLayout = ({ children, showGridOverlay = true }: PageLayoutProps) => {
  return (
    <>
      {showGridOverlay && <GridOverlay />}
      <TwoStepNavigation />
      <PageTransition>
        <div className="min-h-screen bg-background">
          {/* Shell for blur/scale effect when menu opens */}
          <div className="site-shell">
            <main>{children}</main>
            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default PageLayout;
