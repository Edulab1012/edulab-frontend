"use client";
import React from "react";

const colors = {
    Dark: [
        { name: "Rich Black", hex: "#121220" },
        { name: "Charcoal Indigo", hex: "#1C1C2E" },
        { name: "ClassHero Purple", hex: "#6B5AED" },
    ],
    Mid: [
        { name: "Sky Blue", hex: "#1DA1F2" },
        { name: "Amber", hex: "#FFA000" },
        { name: "Amethyst", hex: "#9C27B0" },
        { name: "Emerald", hex: "#4CAF50" },
        { name: "Lavender Gray", hex: "#A9A9B3" },
        { name: "Medium Gray", hex: "#999999" },
        { name: "Cool Gray", hex: "#D1D1D6" },
    ],
    Light: [
        { name: "Ghost White", hex: "#F5F6FA" },
        { name: "White", hex: "#FFFFFF" },
    ],
};

export default function Colors() {
    return (
        <div className="p-6 max-w-3xl mx-auto space-y-2 h-auto w-auto">
            <h1 className="text-3xl font-bold mb-4 text-center">🎨 ClassHero Color Palette</h1>

            {Object.entries(colors).map(([section, group]) => (
                <div key={section}>
                    <h2 className="text-xl font-semibold  text-gray-700 dark:text-gray-200">{section} Colors</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {group.map((color) => (
                            <div
                                key={color.hex}
                                className="rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                            >
                                <div
                                    className="h-24"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div className="p-2 text-sm text-center bg-white dark:bg-[#1C1C2E]">
                                    <p className="font-medium text-gray-800 dark:text-white">{color.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-300">{color.hex}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}