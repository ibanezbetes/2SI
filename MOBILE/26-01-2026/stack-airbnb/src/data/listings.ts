export type Listing = {
id: string;
title: string;
city: string;
price: number;
description: string;
};

export const LISTINGS: Listing[] = [
{
id: "1",
title: "Apartamento Centro",
city: "Zaragoza",
price: 75,
description: "Apartamento acogedor en pleno centro de la ciudad.",
},
{
id: "2",
title: "Ático con Terraza",
city: "Madrid",
price: 120,
description: "Ático luminoso con terraza y vistas panorámicas.",
},
{
id: "3",
title: "Casa Rural",
city: "Huesca",
price: 90,
description: "Casa rural tranquila, ideal para desconectar.",
},
{
id: "4",
title: "Estudio Moderno",
city: "Barcelona",
price: 110,
description: "Estudio moderno cerca de la playa.",
},
{
id: "5",
title: "Piso Familiar",
city: "Valencia",
price: 95,
description: "Piso amplio, perfecto para familias.",
},
];