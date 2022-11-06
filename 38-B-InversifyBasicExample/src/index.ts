import container from "./config/IoC.config"

import SERVICE_IDENTIFIER from "./constants/identifiers"
import { IBattle } from "./interfaces/IBattle"

// Composition root
let epicBattle = container.get<IBattle>(SERVICE_IDENTIFIER.BATTLE)

console.log(epicBattle.fight())
