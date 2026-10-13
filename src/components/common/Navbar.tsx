import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Logo } from './Logo';
import { InstitutionalHeaderStrip } from './InstitutionalLogos';
import { LogoManagerModal } from './LogoManagerModal';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Target,
  FileCheck2,
  Briefcase,
  BookmarkCheck,
  BarChart3,
  AlertTriangle,
  Compass,
  GraduationCap,
  Users2,
  Menu,
  X,
  Flame,
  Upload,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    errorBook,
    currentStreak,
    userRole,
    setUserRole,
    setSelectedTopicForLearn,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setLogoModalOpen(true);
    window.addEventListener('open_logo_manager', handleOpen);
    return () => window.removeEventListener('open_logo_manager', handleOpen);
  }, []);

  const unresolvedErrorCount = errorBook.filter((e) => !e.isResolved).length;

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId !== 'learn') {
      setSelectedTopicForLearn(null);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'mock-tests', label: 'Mock Tests', icon: FileCheck2 },
    { id: 'placement-prep', label: 'Placement Prep', icon: Briefcase },
    { id: 'formula-bank', label: 'Formula Bank', icon: BookmarkCheck },
    { id: 'progress', label: 'My Progress', icon: BarChart3 },
    {
      id: 'error-book',
      label: 'Error Book',
      icon: AlertTriangle,
      badge: unresolvedErrorCount > 0 ? unresolvedErrorCount : undefined,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#090a0f]/95 backdrop-blur-md border-b border-zinc-800/80 shadow-lg">
      {/* Official SIT, NAAC & IIC Institutional Accreditation Bar */}
      <InstitutionalHeaderStrip onOpenLogoManager={() => setLogoModalOpen(true)} />

      {/* Top micro bar for streak and role switch */}
      <div className="border-b border-zinc-800/40 bg-zinc-950/70 px-4 py-1 text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-amber-400 font-medium">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{currentStreak} Day Practice Streak</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="hidden sm:inline text-zinc-400">Engineering Placement Aptitude Coach</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-medium">View Mode:</span>
            <div className="flex items-center bg-zinc-900 border border-zinc-700/60 rounded-md p-0.5">
              <button
                onClick={() => setUserRole('student')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  userRole === 'student'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <GraduationCap className="w-3 h-3" />
                Student
              </button>
              <button
                onClick={() => {
                  setUserRole('teacher');
                  handleNavClick('teacher');
                }}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  userRole === 'teacher'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Users2 className="w-3 h-3" />
                Teacher / Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo click returns Home + Quick Logo Update Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left focus:outline-none"
            >
              <Logo size="md" showTagline={true} />
            </button>
            <button
              onClick={() => setLogoModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded-lg bg-zinc-900/80 hover:bg-amber-500/20 text-zinc-400 hover:text-amber-300 border border-zinc-800 hover:border-amber-500/40 transition-colors font-medium"
              title="Click to update or customize logo yourself"
            >
              <Upload className="w-3 h-3 text-amber-400" />
              <span>Update Logo</span>
            </button>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-amber-400 font-semibold'
                      : 'text-zinc-300 hover:text-amber-200'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="flex items-center justify-center min-w-5 h-4.5 px-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTabIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            {userRole === 'teacher' && (
              <button
                onClick={() => handleNavClick('teacher')}
                className={`relative px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'text-amber-400 font-semibold'
                    : 'text-zinc-300 hover:text-amber-200'
                }`}
              >
                <Users2 className="w-4 h-4 text-amber-400" />
                <span>Teacher Portal</span>
                {activeTab === 'teacher' && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Right Action: Diagnostic Test CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 shadow-sm ${
                activeTab === 'diagnostic'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 border-amber-400 shadow-amber-500/20'
                  : 'bg-zinc-900/90 text-amber-400 border-amber-500/40 hover:bg-amber-500/10 hover:border-amber-400'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Diagnostic Test</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="sm:hidden px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-medium"
            >
              Diagnostic
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-zinc-800 bg-[#0c0d14] px-4 pt-2 pb-6 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/20'
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4 text-zinc-400" />}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {userRole === 'teacher' && (
            <button
              onClick={() => handleNavClick('teacher')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'teacher'
                  ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/20'
                  : 'text-zinc-300 hover:bg-zinc-900'
              }`}
            >
              <Users2 className="w-4 h-4 text-amber-400" />
              <span>Teacher Dashboard</span>
            </button>
          )}

          <div className="pt-3 border-t border-zinc-800/80">
            <button
              onClick={() => handleNavClick('diagnostic')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold text-sm shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>Start Diagnostic Test</span>
            </button>
          </div>
        </div>
      )}

      {/* Self-service interactive Logo Manager Modal */}
      <LogoManagerModal isOpen={logoModalOpen} onClose={() => setLogoModalOpen(false)} />
    </header>
  );
};
