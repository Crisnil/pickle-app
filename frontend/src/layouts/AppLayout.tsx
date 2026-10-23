import { NavLink, Outlet } from 'react-router'

const AppLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-screen-sm items-center justify-between px-4 py-3 sm:max-w-screen-md">
          <span className="text-lg font-semibold text-slate-900">PickleMatch</span>
          <nav className="flex gap-4 text-sm font-medium">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-emerald-600' : 'text-slate-500'
              }
            >
              Find a Game
            </NavLink>
            <NavLink
              to="/dev/health"
              className={({ isActive }) =>
                isActive ? 'text-emerald-600' : 'text-slate-500'
              }
            >
              Dev Health
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-screen-sm flex-1 px-4 py-4 sm:max-w-screen-md">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout
