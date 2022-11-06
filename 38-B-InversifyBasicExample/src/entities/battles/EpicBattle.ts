import { inject, injectable, named } from "inversify"

import SERVICE_IDENTIFIER from "../../constants/identifiers"
import TAG from "../../constants/tags"
import { IBattle } from "../../interfaces/IBattle"
import { IWarrior } from "../../interfaces/IWarrior"

@injectable()
export class EpicBattle implements IBattle {

  @inject(SERVICE_IDENTIFIER.WARRIOR) @named(TAG.CHINESE)
  public warrior1!: IWarrior
    
  @inject(SERVICE_IDENTIFIER.WARRIOR) @named(TAG.JAPANESE) 
  public warrior2!: IWarrior

  public fight() {
    let desc = `FIGHT!
        ${this.warrior1.name} (${this.warrior1.weapon.name})
        vs
        ${this.warrior2.name} (${this.warrior2.weapon.name})`
    return desc
  }

}