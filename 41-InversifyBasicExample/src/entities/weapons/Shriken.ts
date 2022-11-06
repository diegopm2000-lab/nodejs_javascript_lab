
import { injectable } from "inversify"

import { IWeapon } from "../../interfaces/IWeapon"

@injectable()
export class Shuriken implements IWeapon {
    public name: string;
    
    public constructor() {
        this.name = "Shuriken"
    }
}