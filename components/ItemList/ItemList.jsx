import { Item } from "../Item/Item";

export function ItemList({ productos }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} />
        
      ))}
    </div>
  );
}
