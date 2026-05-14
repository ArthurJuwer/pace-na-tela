import BottomMenu from "@/components/Account/BottomMenu";
import Header from "@/components/Account/Header";

export default function AccountLayout({ children }) {
  return (
    <div className="font-inter min-h-dvh flex flex-col">
      <Header />
      <main className="flex-1 pb-32 px-4">
        {children}
      </main>
      <BottomMenu />
    </div>
  );
}
