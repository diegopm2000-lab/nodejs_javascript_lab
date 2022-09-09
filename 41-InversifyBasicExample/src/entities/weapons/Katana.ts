import { injectable } from "inversify"

import { IWeapon } from "../../interfaces/IWeapon"

@injectable()
export class Katana implements IWeapon {
    public name: string

    public constructor() {
        this.name = "Katana"
    }
}