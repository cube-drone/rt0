# Joyeuse Division

This is the outermost ring, the "entrance" to Paradise Lua, and the place where players will spend their first few sessions.

## Graph

```mermaid
graph TD;
    SURFACE["The Surface of the Moon"];
    AIRLOCK["Docks, Airlock & EVA"];
    CUSTOMS["Executare PortSec"];
    COURT["Rikksverdet Court"];
    PRISON["Holding Cells"];
    CEMETARY[("Recycling Tanks")];
    HOSPITAL["Misericorde Hospital"];
    HUB(("The Seven-Branched Promenade"));
    DAYBREAK{"The Daybreak Institute"};
    HOTEL["Colada Hotel Pods"];
    INDUSTRIAL["Heavy Industrial Zone"];
    WAREHOUSE[("Warehouse Sector")];
    TRANSPORT>"Maglev Linkpoint"];
    STUDIO(("Rapier Broadcasting"));
    LABS["Masamune Engineering"]

    SURFACE-->AIRLOCK;
    AIRLOCK-->CUSTOMS;
    CUSTOMS-->HUB;
    CUSTOMS-->PRISON;
    CUSTOMS-->WAREHOUSE;
    PRISON-->CEMETARY;
    HUB-->COURT;
    COURT-->PRISON;
    HOSPITAL-->CEMETARY;
    HUB-->HOSPITAL;
    HUB-->HOTEL;
    HUB-->DAYBREAK;
    HUB-->WAREHOUSE;
    HUB-->TRANSPORT;
    TRANSPORT-->WAREHOUSE;
    HUB-->STUDIO;
    WAREHOUSE-->LABS;
    WAREHOUSE-->INDUSTRIAL;
    INDUSTRIAL-->LABS;
    LABS-->STUDIO;
```

### "If Joyeuse is a ring, why isn't the map donut shaped?"
This is a graph of how to get around Joyeuse Division, not an actual physical map.

(It's useful for determining _how things connect_,
and extremely easy to modify rapidly,
which is important to determine way before a finalized map is created:
which is why it's what we're using while RT:0 is still in a
 draft format.)

The Seven-Branched Promenade actually wraps around the whole station.

A proper map will be along eventually.

### Locations
* [Airlock & EVA](./joyeuse/airlock.md) - The Fool
* [Executare PortSec](./joyeuse/police.md)
* [The Docks](./joyeuse/docks.md)
* [The Seven-Branched Promenade](./joyeuse/promenade.md)
* [The Daybreak Institute](./joyeuse/daybreak.md) - Five of Swords
* [Colada Hotel Pods](./joyeuse/hotel.md) - Four of Swords
* [Warehouse Sector](./joyeuse/warehouse.md) - Seven of Swords
* [Rikksverdet Court](./joyeuse/court.md) - Two of Swords
* [Maglev Linkpoint](./joyeuse/maglev.md) - Six of Swords
* [Misericorde Hospital](./joyeuse/hospital.md) - Ten of Swords
* [Masamune Engineering](./joyeuse/engineering.md) - Ace, King of Swords
* [Heavy Industrial Zone](./joyeuse/industrial.md)
* [Holding Cells](./joyeuse/prison.md) - Eight of Swords
* [Recycling Tanks](./joyeuse/recycling.md) - Three of Swords
* [Rapier Broadcasting](./joyeuse/broadcast.md) - Page, Queen, Knight of Swords
* [The Surface of the Moon](./joyeuse/surface.md) - Nine of Swords


## Swords

Things in Joyeuse tend towards a "sword" theme.

Joyeuse Division contains the ports, the police, the military-industrial complex - and, of course, The Daybreak Institute.

This part of Paradise Lua tends toward utilitarian, gunmetal gray architecture with large, clear, easy-to-read black-and-yellow signage to
discourage workers from injuring themselves.
It exists in varying states of disrepair, some of it rusting and ill-maintained.

The Seven-Branched Promenade is a light commercial area - nowhere near as opulent as Florin Divison's Gigamall, but sufficient for various and sundry.

### Inspiration Board - Pipes, Tubes, Catwalks, Tanks, Containers, Extra-Large Industrial Equipment.
![inspiration board](/images/joyeuse-board.png)