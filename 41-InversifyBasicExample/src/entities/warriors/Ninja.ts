import { inject, injectable } from "inversify"

import SERVICE_IDENTIFIER from "../../constants/identifiers"
import { IWarrior } from "../../interfaces/IWarrior"
import { IWeapon } from "../../interfaces/IWeapon"

@injectable()
export class Ninja implements IWarrior {
    public name: string
    public weapon: IWeapon

    public constructor(
        @inject(SERVICE_IDENTIFIER.WEAPON) weapon: IWeapon
    ) {
        this.name = "Ninja"
        this.weapon = weapon
    }
}