
import { setTenant } from "@/hooks/setTenant";
import { redirectTenant } from "@/hooks/redirectUrl";

export default function mapHook(selectedFunction: string) {
    switch (selectedFunction) {
        case 'setTenant':
            return setTenant;
        case 'redirectTenant':
            return redirectTenant;
        default:
            return () => {};
    }
}