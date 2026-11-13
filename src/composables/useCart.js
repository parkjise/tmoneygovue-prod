import { ref, computed, watch } from 'vue';
export const products = [
  {
    id: 1,
    name: 'Studio Headphones',
    category: 'Audio',
    price: 89000,
    icon: '◉',
    color: '#e9e5fa'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard',
    category: 'Workspace',
    price: 129000,
    icon: '▦',
    color: '#e0f0ea'
  },
  {
    id: 3,
    name: 'Everyday Backpack',
    category: 'Lifestyle',
    price: 64000,
    icon: '▧',
    color: '#f8e9d8'
  },
  { id: 4, name: 'Desk Lamp', category: 'Workspace', price: 49000, icon: '☀', color: '#e3edfa' }
];
let saved;
try {
  saved = JSON.parse(localStorage.getItem('atelier-cart') || 'null');
} catch {
  saved = null;
}
const cart = ref(
  Array.isArray(saved)
    ? saved
        .filter(
          (r) =>
            products.some((p) => p.id === r.id) && Number.isInteger(r.quantity) && r.quantity > 0
        )
        .map((r) => ({ id: r.id, quantity: Math.min(99, r.quantity) }))
    : [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 1 }
      ]
);
watch(
  cart,
  (value) => {
    try {
      localStorage.setItem('atelier-cart', JSON.stringify(value));
    } catch {
      /* In-memory cart remains available. */
    }
  },
  { deep: true }
);
export function useCart() {
  const lines = computed(() =>
    cart.value.map((r) => ({ ...products.find((p) => p.id === r.id), quantity: r.quantity }))
  );
  const total = computed(() => lines.value.reduce((sum, r) => sum + r.price * r.quantity, 0));
  function add(id) {
    const row = cart.value.find((r) => r.id === id);
    if (row) row.quantity = Math.min(99, row.quantity + 1);
    else cart.value.push({ id, quantity: 1 });
  }
  function update(id, quantity) {
    const row = cart.value.find((r) => r.id === id);
    if (row) row.quantity = Math.max(1, Math.min(99, Math.trunc(Number(quantity) || 1)));
  }
  function remove(id) {
    cart.value = cart.value.filter((r) => r.id !== id);
  }
  return { cart, lines, total, add, update, remove };
}
