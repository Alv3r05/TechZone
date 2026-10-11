export const categoryBrands: Record<string, string[]> = {
  "Video Games": ["Nintendo", "Sony", "Microsoft", "Valve"],

  Peripherals: [
    "Logitech",
    "Razer",
    "Redragon",
    "Corsair",
    "HyperX",
    "SteelSeries",
  ],

  Laptops: ["Lenovo", "ASUS", "HP", "Dell", "Acer", "MSI"],

  Phones: ["Apple", "Samsung", "Xiaomi", "Motorola", "Google", "OnePlus"],

  Monitors: ["Samsung", "LG", "ASUS", "AOC", "MSI", "Gigabyte"],

  Components: ["AMD", "Intel", "NVIDIA", "ASUS", "MSI", "Gigabyte", "ASRock"],

  Audio: ["Sony", "JBL", "HyperX", "Logitech", "Razer", "Corsair"],

  Accessories: ["Logitech", "Razer", "Redragon", "UGREEN", "Anker", "Baseus"],

  Others: ["Other"],
};

export const categoryIcons: Record<string, string> = {
  "Video Games": "🎮",
  Peripherals: "⌨️",
  Laptops: "💻",
  Phones: "📱",
  Monitors: "🖥️",
  Components: "🧩",
  Audio: "🎧",
  Accessories: "🔌",
  Others: "📦",
};

export const getCategoryIcon = (category: string | null): string => {
  if (!category) return "📦";
  return categoryIcons[category] ?? "📦";
};
