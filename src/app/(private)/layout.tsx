import Aside from '@/components/aside';
import Modal from '@/components/modal';
import PrivateHeader from '@/components/privateHeader/privateHeader';
import TenantsTable from '@/components/pages/tenants/table';
import Button from '@/components/button/button';

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ display: "flex", height: "100%" , gap: "2rem"}}>
      <Aside />
      <section style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2rem" }}>
        <PrivateHeader/>
      {children}  
    </section>

      <Modal id='select-tenant-modal' >
          <h1>Select Tenant</h1>
          <TenantsTable />
          <Button selectFunction='refreshPage'>Select</Button>
      </Modal>
    </div>
  );
}
