import { Bell, User, HeadphonesIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        {/* Top section with logo and icons */}
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="border-2 border-foreground px-4 py-1.5 mb-4 ml-8">
              <div className="font-bold text-foreground">LOGO</div>
              <div className="text-[10px] text-foreground">B2B</div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/support" 
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <HeadphonesIcon size={20} />
                <span className="text-sm">Support</span>
              </Link>
              <button className="text-muted-foreground hover:text-primary transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="text-primary transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom section with navigation */}
        <div className="px-6 pb-3">
          <nav className="flex gap-8">
            <Link 
              to="/"
              className={`pb-1 text-sm ml-16 mt-4 ${isActive('/') ? 'text-foreground border-b-2 border-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/organizations"
              className={`pb-1 text-sm mt-4 ${isActive('/organizations') || location.pathname.includes('/organization') ? 'text-purple-600 border-b-2 border-purple-600 font-medium' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Manage B2B organizations
            </Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
};
