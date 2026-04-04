
import { setTenant } from "@/hooks/setTenant";

export default function mapHook(selectedFunction: string) {
    switch (selectedFunction) {
        case 'setTenant':
            return setTenant;
        default:
            return () => {};
    }
}