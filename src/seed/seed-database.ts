import { initialData } from "./seed.js";

 
async function main() {
  try {
    console.log(initialData);
    console.log("✅ Seed executed successfully!");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  }
}


(() => {
    main();
})();