import { Link, useLocation } from 'react-router';
import { ChefHat, Plus, BookOpen, Heart, ShoppingCart, Tag } from 'lucide-react';
import { useShoppingList } from '../hooks/useShoppingList';

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { totalCount, checkedCount } = useShoppingList();
  const pendingCount = totalCount - checkedCount;

  const navItems = [
    { to: '/', label: 'Wszystkie', icon: BookOpen },
    { to: '/ulubione', label: 'Ulubione', icon: Heart },
    { to: '/lista-zakupow', label: 'Zakupy', icon: ShoppingCart, badge: pendingCount > 0 ? pendingCount : null },
    { to: '/kategorie', label: 'Kategorie', icon: Tag },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef7ee 0%, #fff8f0 100%)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b border-orange-100 shadow-sm"
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
            >
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="hidden md:block" style={{ color: '#1c0a00', fontWeight: 700, fontSize: '1.1rem' }}>
              Przepiśnik
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map(({ to, label, icon: Icon, badge }) => {
              const active = isActive(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className="relative flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-150 shrink-0"
                  style={{
                    background: active ? '#fff0e6' : 'transparent',
                    color: active ? '#ea580c' : '#6b5344',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">{label}</span>
                  {badge !== null && badge !== undefined && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: '#ea580c', color: '#fff', fontSize: '0.6rem', fontWeight: 700 }}
                    >
                      {badge > 9 ? '9+' : badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Add button */}
          <Link
            to="/dodaj"
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-white text-sm transition-all duration-150 hover:opacity-90 active:scale-95 shadow-sm shrink-0"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nowy przepis</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center" style={{ color: '#9e7b6b', fontSize: '0.8rem' }}>
        <div className="flex items-center justify-center gap-1.5">
          <ChefHat className="w-3.5 h-3.5" />
          <span>Przepiśnik — Twoje ulubione przepisy w jednym miejscu</span>
        </div>
      </footer>
    </div>
  );
}
