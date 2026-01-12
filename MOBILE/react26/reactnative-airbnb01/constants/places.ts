import { Ionicons } from "@expo/vector-icons";

export type Category = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
};

export const CATEGORIES: Category[] = [
    { id: "views", label: "Amazing views", icon: "sparkles-outline" },
    { id: "icons", label: "Icons", icon: "diamond-outline" },
    { id: "pools", label: "Amazing pools", icon: "water-outline" },
    { id: "farms", label: "Farms", icon: "leaf-outline" },
    { id: "tiny", label: "Tiny homes", icon: "home-outline" },
];

export const FEATURED = {
    title: "Cinque Terre, Italia",
    subtitle: "Seaside villages · 2–4 guests",
    price: "$390 / night",
    rating: "4.92",
    reviews: "1,248",
    image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
};

export const POPULAR = [
    {
        id: "1",
        title: "Kyoto, Japan",
        price: "$210",
        image:
            "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "2",
        title: "Bali, Indonesia",
        price: "$180",
        image:
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "3",
        title: "Iceland",
        price: "$260",
        image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "4",
        title: "Lisbon, Portugal",
        price: "$150",
        image:
            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
    },
];
