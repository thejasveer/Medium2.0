import { atom } from "recoil";
import { SweetError } from "../interfaces";

export const errorAtom= atom<SweetError[]>({
    key:'errorAtom',
    default:[ ]
})