import { Item } from "../Item/Item";

export function ItemList({ productos }) {
  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
        
      ))}
    </div>
  );
}
