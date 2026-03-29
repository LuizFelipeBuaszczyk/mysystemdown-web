import Aside from '@/components/aside';



export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", height: "100%" , gap: "2rem"}}>
      <Aside />
      {children}
    </div>
  );
}
