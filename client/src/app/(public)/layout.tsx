import Navigation from "@/components/Navigation";
import BookDrawer from "@/components/book/BookDrawer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative bg-[#111] min-h-screen selection:bg-[#3f3f3f] selection:text-[#ededed]">
      <header className="absolute z-50 w-full flex justify-center items-center">
        <Navigation />
      </header>
      {children}
      <BookDrawer />
    </div>
  );
}
