import type { Style } from "~/ts/type";

export default defineEventHandler(event => {

  // dummy data
  const styles: Style[] = [
    {
      id: "classic-clean",
      name: "Classic Clean",
      description: "Minimalist layout with clean lines, subtle shadows, and easy-to-read stats. Timeless and versatile.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747484741/movy/images/styles/classic-clean.jpg"
    },
    {
      id: "monochrome",
      name: "Monochrome",
      description: "High-contrast, black-and-white or single-tone design — great for a sleek, powerful feel.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747485023/movy/images/styles/dark-mode.jpg"
    },
    {
      id: "vibrant-energy",
      name: "Vibrant Energy",
      description: "Vibrant colors, big typography, and dynamic shapes — perfect for showing off intense workouts.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747484741/movy/images/styles/vibrant-energy.jpg"
    },
    {
      id: "retro-vibes",
      name: "Retro Vibes",
      description: "Inspired by 80s–90s design — bold blocks, pixel patterns, or retro typography.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747485019/movy/images/styles/retro-vibes.jpg"
    },
    {
      id: "photo-focus",
      name: "Photo Focus",
      description: "Puts user photos front and center with minimal overlays — perfect for scenic shots or selfies.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747485088/movy/images/styles/photo-overlay.jpg"
    },
    {
      id: "minimal-outline",
      name: "Minimal Outline",
      description: "A modern and elegant design style that emphasizes clarity and subtlety.",
      cover: "https://res.cloudinary.com/diundang-digital/image/upload/w_250/v1747571530/movy/images/styles/minimal-outline.jpg"
    },
  ];

  // return the data
  return styles;
})
