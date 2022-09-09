import "reflect-metadata";

import { Container } from "inversify";

import { IWarrior } from "../interfaces/IWarrior";
import { IWeapon } from "../interfaces/IWeapon";
import { IBattle } from "../interfaces/IBattle";

import { Ninja } from "../entities/warriors/Ninja";
import { Samurai } from "../entities/warriors/Samurai";
import { Shuriken } from "../entities/weapons/Shriken";
import { Katana } from "../entities/weapons/Katana";
import { EpicBattle } from "../entities/battles/EpicBattle";

import SERVICE_IDENTIFIER from "../constants/identifiers";
import TAG from "../constants/tags";

let container = new Container();

container.bind<IWarrior>(SERVICE_IDENTIFIER.WARRIOR).to(Ninja).whenTargetNamed(TAG.CHINESE);
container.bind<IWarrior>(SERVICE_IDENTIFIER.WARRIOR).to(Samurai).whenTargetNamed(TAG.JAPANESE);
container.bind<IWeapon>(SERVICE_IDENTIFIER.WEAPON).to(Shuriken).whenParentNamed(TAG.CHINESE);
container.bind<IWeapon>(SERVICE_IDENTIFIER.WEAPON).to(Katana).whenParentNamed(TAG.JAPANESE);
container.bind<IBattle>(SERVICE_IDENTIFIER.BATTLE).to(EpicBattle);

export default container;