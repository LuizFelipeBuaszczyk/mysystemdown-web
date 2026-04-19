
import { setTenant } from "@/actions/setTenant";
import { redirectTenant } from "@/hooks/redirectUrl";
import { openModal } from "@/hooks/modal";
import { refreshPage } from "@/hooks/refreshPage";

export default function mapHook(selectedFunction: string) {
    switch (selectedFunction) {
        case 'openModal':
            return openModal;
        case 'setTenant':
            return setTenant;
        case 'redirectTenant':
            return redirectTenant;
        case 'refreshPage':
            return refreshPage;
        default:
            return () => {};
    }
}