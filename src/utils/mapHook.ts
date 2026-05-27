
import { setTenant as setTenantAction, type TenantProp } from "@/actions/setTenant";
import { redirectTenant, openSystemDetails } from "@/hooks/redirectUrl";
import { openModal } from "@/hooks/modal";
import { refreshPage } from "@/hooks/refreshPage";

function handleSetTenant(tenantData: TenantProp) {
  setTenantAction(tenantData);
  localStorage.setItem("tenant", tenantData.name);
}

export default function mapHook(selectedFunction: string) {
    switch (selectedFunction) {
        case 'openModal':
            return openModal;
        case 'setTenant':
            return handleSetTenant;
        case 'redirectTenant':
            return redirectTenant;
        case 'openSystemDetails':
            return openSystemDetails;
        case 'refreshPage':
            return refreshPage;
        default:
            return () => {};
    }
}
