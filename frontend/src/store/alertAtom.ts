import { atom } from "recoil";
import { Alert } from "../interfaces";

export const alertAtom= atom<Alert[]>({
    key:'alertAtom',
    default:[ ]
})